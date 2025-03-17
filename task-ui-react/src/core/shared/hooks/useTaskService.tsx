import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { taskService } from '../../../infra/services/taskService';
import useGlobalContext from '../../hooks/useGlobalContext';
import { IGetTaskParams, Task, TaskPayload } from '../types/ITask';

const useTaskService = () => {
  const queryClient = useQueryClient();
  const { updateGlobalState, tasks } = useGlobalContext();

  const getTasks = useCallback(
    async ({
      queryKey,
    }: {
      queryKey: [string, IGetTaskParams];
    }): Promise<Task[]> => {
      const [, params] = queryKey;
      try {
        const { data } = await taskService.getTasks(params);

        return data;
      } catch (error) {
        console.log('🚀 ~ error:', error);
        return [];
      }
    },
    [],
  );

  const postTask = useCallback(
    async (payload: TaskPayload): Promise<void> => {
      try {
        const task = await taskService.postTask(payload);
        if (task?.id) {
          updateGlobalState('tasks', [task, ...(tasks.pending || [])]);
        }
        updateGlobalState('isCreateTaskModalOpen', false);
      } catch (error) {
        console.log('🚀 ~ error:', error);
      }
    },
    [tasks.pending, updateGlobalState],
  );

  const patchTask = useCallback(
    async (payload: Task): Promise<void> => {
      try {
        await taskService.patchTask(payload);
        updateGlobalState('isCreateTaskModalOpen', false);
      } catch (error) {
        console.log('🚀 ~ error:', error);
      }
    },
    [updateGlobalState],
  );

  return {
    useGetTasks: (params: IGetTaskParams) =>
      useQuery({
        queryFn: getTasks,
        queryKey: ['getTasks', params],
        staleTime: 1000 * 60 * 5,
      }),

    usePostTask: () =>
      useMutation({
        mutationFn: postTask,
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ['getTasks'],
          }),
      }),

    usePatchTask: () =>
      useMutation({
        mutationFn: patchTask,
      }),
  };
};

export default useTaskService;

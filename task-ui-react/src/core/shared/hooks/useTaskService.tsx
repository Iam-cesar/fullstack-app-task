import { useCallback, useState } from 'react';
import { taskService } from '../../../infra/services/taskService';
import { Task, TaskPayload } from '../types/ITask';

const useTaskService = () => {
  const [isLoading, setIsLoading] = useState({
    CREATING: false,
    FETCHING: false,
  });

  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      setIsLoading((prev) => ({ ...prev, FETCHING: true }));
      const { data } = await taskService.getTasks();
      return data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return [];
    } finally {
      setIsLoading((prev) => ({ ...prev, FETCHING: false }));
    }
  }, []);

  const postTask = useCallback(
    async (payload: TaskPayload): Promise<Task | null> => {
      try {
        setIsLoading((prev) => ({ ...prev, CREATING: true }));
        return await taskService.postTask(payload);
      } catch (error) {
        console.log('🚀 ~ error:', error);
        return null;
      } finally {
        setIsLoading((prev) => ({ ...prev, CREATING: false }));
      }
    },
    [],
  );

  return {
    isLoading,
    getTasks,
    postTask,
  };
};

export default useTaskService;

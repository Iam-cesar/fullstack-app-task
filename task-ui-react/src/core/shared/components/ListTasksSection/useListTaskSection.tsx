import { useCallback, useEffect, useRef } from 'react';
import useGlobalContext from '../../../../core/hooks/useGlobalContext';
import useTaskService from '../../../../core/shared/hooks/useTaskService';
import { IFilteredTaskPerStatus } from '../../../../core/shared/types/IGlobalTypes.tsx';

const initialTasksPerStatus: IFilteredTaskPerStatus = {
  completed: [],
  inProgress: [],
  pending: [],
};

const useListTaskSection = () => {
  const { tasks, updateGlobalState } = useGlobalContext();
  const { getTasks } = useTaskService();
  const hasFetchedInitialTasks = useRef(false);

  const getInitialTasks = useCallback(async () => {
    const tasks = await getTasks();
    const filteredTasks = tasks.reduce((acc, task) => {
      if (task.status === 'PENDING') acc.pending.push(task);
      if (task.status === 'COMPLETED') acc.completed.push(task);
      if (task.status === 'IN_PROGRESS') acc.inProgress.push(task);
      return acc;
    }, initialTasksPerStatus);

    updateGlobalState('tasks', filteredTasks);
  }, [getTasks, updateGlobalState]);

  useEffect(() => {
    if (!hasFetchedInitialTasks.current) {
      getInitialTasks();
      hasFetchedInitialTasks.current = true;
    }
  }, [getInitialTasks]);

  return {
    tasks,
    updateGlobalState,
  };
};

export default useListTaskSection;

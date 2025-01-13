import { useCallback, useEffect } from 'react';
import useGlobalContext from '../../../../core/hooks/useGlobalContext';
import useTaskService from '../../../../core/shared/hooks/useTaskService';
import TaskCard from '../TaskCard';

const ListTasksSection = () => {
  const { tasks, updateGlobalState } = useGlobalContext();
  const { getTasks } = useTaskService();

  const getInitialTasks = useCallback(async () => {
    const tasks = await getTasks();
    updateGlobalState('tasks', tasks);
  }, [getTasks, updateGlobalState]);

  useEffect(function handleGetInitialTasks() {
    getInitialTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ListTasksSection;

import { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useEffect, useRef } from 'react';
import useGlobalContext from '../../../../core/hooks/useGlobalContext';
import useTaskService from '../../../../core/shared/hooks/useTaskService';
import { TaskStatus } from '../../types/ITask.tsx';
import { functionGetFilteredTasks } from '../../utils/getFilteredTasks.ts';

const useListTaskSection = () => {
  const { tasks, updateGlobalState } = useGlobalContext();
  const { getTasks } = useTaskService();
  const hasFetchedInitialTasks = useRef(false);

  const getInitialTasks = useCallback(async () => {
    const tasks = await getTasks();
    const filteredTasks = functionGetFilteredTasks(tasks);
    updateGlobalState('tasks', filteredTasks);
  }, [getTasks, updateGlobalState]);

  useEffect(() => {
    if (!hasFetchedInitialTasks.current) {
      getInitialTasks();
      hasFetchedInitialTasks.current = true;
    }
  }, [getInitialTasks]);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const allTasks = [
          ...tasks.pending,
          ...tasks.inProgress,
          ...tasks.completed,
        ];

        const activeId = active.id.toString().replace('draggable-', '');

        const overId = over.id
          .toString()
          .replace('droppable-', '') as TaskStatus;

        const [selectedTask] = allTasks.filter(
          (task) => task.id === Number(activeId),
        );
        const updatedSelectedTask = { ...selectedTask, status: overId };

        const tasksWithoutSelected = allTasks.filter(
          (task) => task.id !== Number(activeId),
        );

        const updatedTasks = [...tasksWithoutSelected, updatedSelectedTask];

        const filteredTasks = functionGetFilteredTasks(updatedTasks);

        updateGlobalState('tasks', filteredTasks);
      }
    },
    [tasks.completed, tasks.inProgress, tasks.pending, updateGlobalState],
  );

  return {
    tasks,
    onDragEnd,
    updateGlobalState,
  };
};

export default useListTaskSection;

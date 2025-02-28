import { IFilteredTaskPerStatus } from '../types/IGlobalTypes';
import { Task } from '../types/ITask';

export function functionGetFilteredTasks(tasks: Task[] | undefined) {
  return tasks?.reduce<IFilteredTaskPerStatus>(
    (acc, task) => {
      if (task.status === 'PENDING') acc.pending.push(task);
      if (task.status === 'COMPLETED') acc.completed.push(task);
      if (task.status === 'IN_PROGRESS') acc.inProgress.push(task);
      return acc;
    },
    {
      completed: [],
      inProgress: [],
      pending: [],
    },
  );
}

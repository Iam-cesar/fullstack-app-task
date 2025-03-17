import { IFilteredTaskPerStatus } from '../types/IGlobalTypes';
import { Task } from '../types/ITask';

export function functionGetFilteredTasks(tasks: Task[] | undefined) {
  return tasks?.reduce<IFilteredTaskPerStatus>(
    (acc, task) => {
      if (task.status === 'pending') acc.pending.push(task);
      if (task.status === 'completed') acc.completed.push(task);
      if (task.status === 'inProgress') acc.inProgress.push(task);
      return acc;
    },
    {
      completed: [],
      inProgress: [],
      pending: [],
    },
  );
}

import { Task } from '../../../../core/shared/types/ITask';

interface ITaskCardProps {
  task: Task;
}
const TaskCard = ({ task }: ITaskCardProps) => {
  const taskCompleted = task.isCompleted ? 'Concluída' : 'Pendente';

  return (
    <article className="rounded-xl h-max relative *:rounded-md *:border-2 *:border-black *:text-black">
      <div className="relative rounded-[10px] bg-white p-4 sm:p-6 transition hover:-translate-x-1 hover:-translate-y-1 z-10 hover:cursor-pointer">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          {Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'medium',
          }).format(new Date(task.createdAt))}
        </time>

        <h3 className="mt-0.5 text-lg font-medium text-gray-900 line-clamp-3">
          {task.title}
        </h3>

        <p className="mt-0.5 text-sm font-normal text-gray-500 line-clamp-5">
          {task.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {taskCompleted}
          </span>
        </div>
      </div>

      <div className="inset-0 absolute top-0 left-0 z-0 border-dashed" />
    </article>
  );
};

export default TaskCard;

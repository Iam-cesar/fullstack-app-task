import { Task, TaskStatus } from '../../types/ITask';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import TaskCard from '../TaskCard';

interface TaskCardsColumnProps {
  tasks: Task[];
  sectionTitle: string;
}

const taskStatus = {
  pendentes: TaskStatus.PENDING,
  'em-progresso': TaskStatus.IN_PROGRESS,
  finalizadas: TaskStatus.COMPLETED,
};

const TaskCardsColumn = ({ tasks, sectionTitle }: TaskCardsColumnProps) => {
  const threatedSectionTitle = sectionTitle.replace(' ', '-').toLowerCase();
  const id = taskStatus[threatedSectionTitle as keyof typeof taskStatus];

  return (
    <div className="grid-cols-1 gap-4 flex flex-col">
      <p className="font-semibold text-xl text-black">{sectionTitle}</p>

      <Droppable id={id}>
        <>
          {tasks?.map((task) => (
            <Draggable key={task.id} id={task.id.toString()}>
              <TaskCard task={task} />
            </Draggable>
          ))}
        </>
      </Droppable>
    </div>
  );
};

export default TaskCardsColumn;

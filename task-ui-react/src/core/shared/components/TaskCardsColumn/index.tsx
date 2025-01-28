import { Task } from '../../types/ITask';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import TaskCard from '../TaskCard';

interface TaskCardsColumnProps {
  tasks: Task[];
  sectionTitle: string;
}

const TaskCardsColumn = ({ tasks, sectionTitle }: TaskCardsColumnProps) => {
  const id = sectionTitle.replace(' ', '-').toLowerCase();

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

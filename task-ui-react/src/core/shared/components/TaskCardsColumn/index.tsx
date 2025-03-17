import { useCallback, useEffect } from 'react';
import useGlobalContext from '../../../hooks/useGlobalContext';
import useTaskService from '../../hooks/useTaskService';
import { TaskStatus } from '../../types/ITask';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import TaskCard from '../TaskCard';

interface TaskCardsColumnProps {
  sectionTitle: string;
}

const taskStatus = {
  pendentes: TaskStatus.PENDING,
  'em-progresso': TaskStatus.IN_PROGRESS,
  finalizadas: TaskStatus.COMPLETED,
};

const TaskCardsColumn = ({ sectionTitle }: TaskCardsColumnProps) => {
  const threatedSectionTitle = sectionTitle.replace(' ', '-').toLowerCase();
  const id = taskStatus[threatedSectionTitle as keyof typeof taskStatus];

  const { setGlobalState, tasks } = useGlobalContext();
  const { useGetTasks } = useTaskService();
  const { data } = useGetTasks({ status: id });

  const handleUpdateGlobalState = useCallback(
    () =>
      setGlobalState((prev) => ({
        ...prev,
        tasks: { ...prev.tasks, [id]: data },
      })),
    [data, id, setGlobalState],
  );

  useEffect(
    function updateGlobalContextOnDataFetch() {
      if (data) handleUpdateGlobalState();
    },
    [data, handleUpdateGlobalState],
  );

  return (
    <Droppable id={id}>
      <div className="grid-cols-1 gap-4 flex flex-col">
        <p className="font-semibold text-xl text-black">{sectionTitle}</p>

        <>
          {tasks?.[id]?.map((task) => (
            <Draggable key={task.id} id={task.id.toString()}>
              <TaskCard task={task} />
            </Draggable>
          ))}
        </>
      </div>
    </Droppable>
  );
};

export default TaskCardsColumn;

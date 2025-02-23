import { DndContext, closestCorners } from '@dnd-kit/core';
import TaskCardsColumn from '../TaskCardsColumn/index.tsx';
import useListTaskSection from './useListTaskSection.tsx';

const ListTasksSection = () => {
  const { tasks, onDragEnd } = useListTaskSection();

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="mx-auto my-0 container p-4 grid gap-4 grid-cols-3">
        <TaskCardsColumn sectionTitle="Pendentes" tasks={tasks.pending} />

        <TaskCardsColumn sectionTitle="Em progresso" tasks={tasks.inProgress} />

        <TaskCardsColumn sectionTitle="Finalizadas" tasks={tasks.completed} />
      </div>
    </DndContext>
  );
};

export default ListTasksSection;

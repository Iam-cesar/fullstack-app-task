import { DndContext, closestCorners } from '@dnd-kit/core';
import TaskCardsColumn from '../TaskCardsColumn/index.tsx';
import useListTaskSection from './useListTaskSection.tsx';

const ListTasksSection = () => {
  const { onDragEnd } = useListTaskSection();

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="mx-auto my-0 container p-4 grid gap-4 grid-cols-3">
        <TaskCardsColumn sectionTitle="Pendentes" />

        <TaskCardsColumn sectionTitle="Em progresso" />

        <TaskCardsColumn sectionTitle="Finalizadas" />
      </div>
    </DndContext>
  );
};

export default ListTasksSection;

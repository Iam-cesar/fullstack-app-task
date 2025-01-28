import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import SortableItem from '../SortableItem/index.tsx';
import TaskCardsColumn from '../TaskCardsColumn/index.tsx';
import useListTaskSection from './useListTaskSection.tsx';

const ListTasksSection = () => {
  const { tasks } = useListTaskSection();
  const [items] = useState(['pending', 'inProgress', 'completed']);

  return (
    <DndContext collisionDetection={closestCorners}>
      <SortableContext items={items}>
        <div className="mx-auto my-0 container p-4 grid gap-4 grid-cols-3">
          <SortableItem id="pending">
            <TaskCardsColumn sectionTitle="Pendentes" tasks={tasks.pending} />
          </SortableItem>

          <SortableItem id="inProgress">
            <TaskCardsColumn
              sectionTitle="Em progresso"
              tasks={tasks.inProgress}
            />
          </SortableItem>
          <SortableItem id="completed">
            <TaskCardsColumn
              sectionTitle="Finalizadas"
              tasks={tasks.completed}
            />
          </SortableItem>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ListTasksSection;

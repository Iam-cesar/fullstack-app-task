import { type ReactElement } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface IDroppableProps {
  children: ReactElement;
  id: string;
}
const Droppable = (props: IDroppableProps) => {
  const { setNodeRef } = useDroppable({
    id: `droppable-${props?.id}`,
  });

  const style = {};

  return (
    <div className="flex gap-4 flex-col" ref={setNodeRef} style={style}>
      {props?.children}
    </div>
  );
};

export default Droppable;

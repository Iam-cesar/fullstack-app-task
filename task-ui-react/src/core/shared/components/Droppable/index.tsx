import { useDroppable } from '@dnd-kit/core';

interface IDroppableProps {
  children: JSX.Element;
  id: string;
}
const Droppable = ({ children, id }: IDroppableProps) => {
  const { setNodeRef } = useDroppable({ id: `droppable-${id}` });

  return (
    <div className="flex gap-4 flex-col" ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Droppable;

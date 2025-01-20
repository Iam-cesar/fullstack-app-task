import { useDraggable } from '@dnd-kit/core';

interface IDraggableProps {
  children: JSX.Element;
  id: string;
}
const Draggable = ({ children, id }: IDraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 30,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;

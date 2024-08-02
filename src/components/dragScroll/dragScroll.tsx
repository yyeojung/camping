import styled from "@emotion/styled";
import { type MouseEvent, useRef, useState, type ReactNode } from "react";

const Scroll = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default function DragScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      event.preventDefault();
      setIsDrag(true);
      setStart(event.pageX + scrollRef.current.scrollLeft);
    }
  };

  const onMouseUp = () => {
    setIsDrag(false);
  };

  const onDragMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isDrag && scrollRef.current) {
      scrollRef.current.scrollLeft = start - event.pageX;
    }
  };

  return (
    <Scroll
      onMouseDown={onMouseDown}
      onMouseMove={isDrag ? onDragMove : undefined}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      ref={scrollRef}
      className={className}
    >
      {children}
    </Scroll>
  );
}

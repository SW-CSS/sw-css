import { useState, useEffect, useRef } from 'react';

interface ComponentSize {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
}

function useDivSize(): [React.RefObject<HTMLDivElement>, ComponentSize] {
  const [size, setSize] = useState<ComponentSize>({ width: 0, height: 0, positionX: 0, positionY: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const { width, height, top, left } = componentRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      };
      const { scrollX, scrollY } = window;

      setSize({ width, height, positionX: left + scrollX, positionY: top + scrollY });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [componentRef, size];
}

export default useDivSize;

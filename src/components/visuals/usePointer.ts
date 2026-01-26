import { useEffect, useRef } from 'react';

// Tracks pointer position in normalized device coordinates (-1 to 1)
export function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return pointer;
}

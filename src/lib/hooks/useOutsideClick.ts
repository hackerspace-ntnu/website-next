import { useEffect } from 'react';

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>[],
  callback: (event: TouchEvent | MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.some((r) => r.current?.contains(event.target as Node))) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
}

export { useOutsideClick };

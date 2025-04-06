import { useEffect, useRef } from 'react';

function useUnmountCallback(func: () => void) {
  const funcRef = useRef(func);

  funcRef.current = func;

  useEffect(
    () => () => {
      funcRef.current();
    },
    [],
  );
}

export { useUnmountCallback };

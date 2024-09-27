import { useEffect, useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [T, (value: T) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : initialValue;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  function setValue(value: T | ((prevValue: T) => T)) {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    if (typeof window !== 'undefined') {
      if (
        valueToStore === undefined ||
        valueToStore === null ||
        valueToStore === ''
      ) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    }
    setStoredValue(valueToStore);
  }

  return [storedValue, setValue, loading];
}

export { useLocalStorage };

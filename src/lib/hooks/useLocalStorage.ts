import { useCallback, useEffect, useState } from 'react';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

function useLocalStorage<T>(
  key: string,
  initialValue?: T | (() => T),
): [T | undefined, (value: T | null | undefined) => void, boolean] {
  const [isLoading, setIsLoading] = useState(true);
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    let initValue: T | undefined;
    if (typeof initialValue === 'function') {
      initValue = (initialValue as () => T)();
    } else {
      initValue = initialValue;
    }

    if (typeof window === 'undefined') {
      return initValue;
    }

    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch {
        return initValue;
      }
    } else {
      return initValue;
    }
  });

  const setValue = useCallback(
    (value: T | null | undefined) => {
      if (typeof window === 'undefined') {
        return;
      }
      const newValue = value instanceof Function ? value(storedValue) : value;
      if (
        newValue === null ||
        newValue === undefined ||
        (Array.isArray(newValue) && newValue.length === 0)
      ) {
        localStorage.removeItem(key);
        let defaultValue: T | undefined;
        if (typeof initialValue === 'function') {
          defaultValue = (initialValue as () => T)();
        } else {
          defaultValue = initialValue;
        }
        setStoredValue(defaultValue);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
      }
      window.dispatchEvent(new StorageEvent('local-storage', { key }));
    },
    [key, storedValue, initialValue],
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return;
      }
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          setStoredValue(JSON.parse(raw) as T);
        } catch {
          let defaultValue: T | undefined;
          if (typeof initialValue === 'function') {
            defaultValue = (initialValue as () => T)();
          } else {
            defaultValue = initialValue;
          }
          setStoredValue(defaultValue);
        }
      } else {
        let defaultValue: T | undefined;
        if (typeof initialValue === 'function') {
          defaultValue = (initialValue as () => T)();
        } else {
          defaultValue = initialValue;
        }
        setStoredValue(defaultValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);
    setIsLoading(false);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, isLoading];
}

export { useLocalStorage };

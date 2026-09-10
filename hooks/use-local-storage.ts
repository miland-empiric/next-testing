import { useCallback, useSyncExternalStore } from "react";

function subscribe(key: string, callback: () => void) {
  function listener(event: StorageEvent) {
    if (event.key === key) callback();
  }
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback((): T => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const getServerSnapshot = useCallback((): T => initialValue, [initialValue]);

  const value = useSyncExternalStore(
    useCallback((callback) => subscribe(key, callback), [key]),
    getSnapshot,
    getServerSnapshot,
  );

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      try {
        const resolved = next instanceof Function ? next(getSnapshot()) : next;
        window.localStorage.setItem(key, JSON.stringify(resolved));
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch {
        // ignore write failures (storage full, disabled, etc.)
      }
    },
    [key, getSnapshot],
  );

  return [value, setStoredValue] as const;
}

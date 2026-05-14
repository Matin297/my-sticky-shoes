"use client";

import { useEffect, useRef, useState } from "react";
import { isServerSide } from "@/lib/utils";

function isFunction<T>(value: T | (() => T)): value is () => T {
  return typeof value === "function";
}

export function useLocalStorageState<T>(
  key: string,
  defaultValue?: (() => T) | T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) {
  const [state, setState] = useState(() => {
    if (isServerSide()) {
      return null;
    }

    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch {
        window.localStorage.removeItem(key);
      }
    }

    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

"use client";

import { useEffect, useState } from "react";

/**
 * @see https://medium.com/@sankalpa115/usedebounce-hook-in-react-2c71f02ff8d8
 */
const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };

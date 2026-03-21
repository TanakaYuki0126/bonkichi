"use client";

import { MutableRefObject, useEffect, useRef } from "react";

type Options = IntersectionObserverInit & {
  once?: boolean;
};

export function useIntersectionObserver(
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  options?: Options,
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callbackRef.current();
          if (options?.once) {
            observer.unobserve(element);
          }
        }
      },
      {
        threshold: options?.threshold,
      },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [options, ref]);
}

"use client";

import { useScroll } from "@/contexts/ScrollContext";
import { MutableRefObject, useEffect, useRef } from "react";

export function useParallax({
  containerRef,
  targetRef,
}: {
  containerRef: MutableRefObject<HTMLElement | null>;
  targetRef?: MutableRefObject<HTMLElement | null>;
}) {
  const { subscribe, smoothedScrollYRef } = useScroll();
  const widthRef = useRef<number>(0);
  const leftRef = useRef<number>(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      widthRef.current = el.offsetWidth;
      const rect = el.getBoundingClientRect();
      leftRef.current = rect.left + smoothedScrollYRef.current;
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    const unscribe = subscribe(({ smoothedScrollY }) => {
      const left = leftRef.current;
      const width = widthRef.current;
      const center = left - smoothedScrollY + width / 2;
      const p =
        (window.innerWidth + width / 2 - center) / (window.innerWidth + width);
      const progress = Math.min(Math.max(p, 0), 1);
      if (targetRef?.current) {
        const parallaxEl = targetRef.current;
        if (!parallaxEl) return;
        parallaxEl.style.setProperty("--p", progress.toString());
      } else {
        el.style.setProperty("--p", progress.toString());
      }
    });
    return () => {
      unscribe();
      ro.disconnect();
    };
  }, [subscribe]);
}

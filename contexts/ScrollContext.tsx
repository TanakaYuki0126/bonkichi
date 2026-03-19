"use client";

import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
  useMemo,
} from "react";

export type ScrollFrameState = {
  scrollY: number;
  progress: number;
  smoothedScrollY: number;
  smoothedProgress: number;
};

type ScrollContextType = {
  progress: number;
  progressRef: MutableRefObject<number>;
  scrollYRef: MutableRefObject<number>;
  smoothedProgress: number;
  smoothedProgressRef: MutableRefObject<number>;
  smoothedScrollYRef: MutableRefObject<number>;
  subscribe: (fn: (state: ScrollFrameState) => void) => () => void;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef(0);
  const scrollYRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const smoothedScrollYRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [smoothedProgress, setSmoothedProgress] = useState(0);

  const listenersRef = useRef(new Set<(s: ScrollFrameState) => void>());

  const subscribe = useMemo(() => {
    return (fn: (state: ScrollFrameState) => void) => {
      listenersRef.current.add(fn);
      return () => listenersRef.current.delete(fn);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? scroll / max : 0;
      scrollYRef.current = scroll;
      progressRef.current = p;
      setProgress(p);
    };
    const onWheel = (e: WheelEvent) => {
      //横スワイプを縦に変換
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        window.scrollBy({ top: e.deltaX });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);
  useEffect(() => {
    let raf: number;
    //0-1 小さいほどヌルい
    const damping = 0.1;
    const loop = () => {
      const targetP = progressRef.current;
      const currentP = smoothedProgressRef.current;
      const targetY = scrollYRef.current;
      const currentY = smoothedScrollYRef.current;

      const nextP = currentP + (targetP - currentP) * damping;
      const nextY = currentY + (targetY - currentY) * damping;
      smoothedProgressRef.current = nextP;
      smoothedScrollYRef.current = nextY;
      setSmoothedProgress(nextP);

      const frameState: ScrollFrameState = {
        scrollY: targetY,
        progress: targetP,
        smoothedScrollY: nextY,
        smoothedProgress: nextP,
      };

      listenersRef.current.forEach((fn) => fn(frameState));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <ScrollContext.Provider
      value={{
        progress,
        progressRef,
        scrollYRef,
        smoothedProgress,
        smoothedProgressRef,
        smoothedScrollYRef,
        subscribe,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScroll must be used within ScrollProvider");
  }
  return ctx;
}

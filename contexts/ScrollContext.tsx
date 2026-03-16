"use client";

import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";

type ScrollContextType = {
  progress: number;
  progressRef: MutableRefObject<number>;
  scrollYRef: MutableRefObject<number>;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef(0);
  const scrollYRef = useRef(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? scroll / max : 0;
      scrollYRef.current = scroll;
      progressRef.current = p;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <ScrollContext.Provider value={{ progress, progressRef, scrollYRef }}>
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

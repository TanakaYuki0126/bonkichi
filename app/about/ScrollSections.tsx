"use client";

import { FOOTER_HEIGHT } from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import BonkichiModel from "./BonkichiModel";
import ProgressBar from "./ProgressBar";
import { useScroll } from "@/contexts/ScrollContext";

export default function ScrollSections() {
  const { progress, progressRef, scrollYRef } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const calcHeight = () => {
      const scrollWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const horizontalScrollDistance = scrollWidth - viewportWidth;
      const totalHeight =
        horizontalScrollDistance + window.innerHeight - FOOTER_HEIGHT;
      setScrollHeight(totalHeight);
    };
    const observer = new ResizeObserver(calcHeight);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!isDesktop) return;
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);
  return (
    <div style={{ height: isDesktop ? scrollHeight : "" }}>
      <div className={isDesktop ? "sticky top-0 h-screen overflow-hidden" : ""}>
        <ProgressBar />
        {/* モデル */}
        <div className="fixed inset-0 pointer-events-none z-40">
          <BonkichiModel />
        </div>
        <div
          ref={containerRef}
          className={`flex h-full ${isDesktop ? "flex-row" : "flex-col"}`}
          style={{
            transform: isDesktop
              ? `translateX(-${scrollYRef.current}px)`
              : "none",
          }}
        >
          <section className="w-screen h-screen shrink-0 bg-slate-300">
            1
          </section>
          <section className="w-screen h-screen shrink-0 bg-blue-300">
            2
          </section>
          <section className="w-screen h-screen shrink-0 bg-green-300">
            3
          </section>
          <section className="w-screen h-screen shrink-0 bg-yellow-300">
            4
          </section>
          <section className="w-screen h-screen shrink-0 bg-slate-300">
            5
          </section>
          <section className="w-screen h-screen shrink-0 bg-lime-300">
            6
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar";
import { useScroll } from "@/contexts/ScrollContext";
import StickyTitle from "../text/StickyTitle";
import SectionDivider from "./SectionDivider";
import TopImageMobile from "../image/TopImageMobile";
import ParallaxImage from "../image/ParallaxImage";
import Section1 from "./Section1";
import Section from "./Section";

//スクロール位置から現在のセクションのインデックスを判別
//x: 今横にどれだけ進んでいるか
function findActiveIndex(offsets: number[], x: number) {
  //画面中央が全体座標のどこを指しているか
  const target = x + window.innerWidth * 0.3;

  let lo = 0;
  let hi = offsets.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid] <= target) lo = mid + 1;
    else hi = mid - 1;
  }
  //hiはoffsets[hi] <= targetを満たす最大のhi
  return Math.max(0, Math.min(offsets.length - 1, hi));
}

export default function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const offsetsRef = useRef<number[]>([]);
  const { subscribe } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const calcHeight = () => {
      const scrollWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const horizontalScrollDistance = scrollWidth - viewportWidth;
      const totalHeight = horizontalScrollDistance + window.innerHeight;
      setScrollHeight(totalHeight);
    };
    const observer = new ResizeObserver(calcHeight);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    return subscribe(({ smoothedScrollY }) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.setProperty("--p", smoothedScrollY.toString());
    });
  }, [isDesktop, subscribe]);

  useEffect(() => {
    if (!isDesktop) return;
    //各セクションの左端の位置(offsetLeft)を計測
    const measure = () => {
      offsetsRef.current = itemRefs.current
        .filter(Boolean)
        .map((el) => (el as HTMLElement).offsetLeft)
        .sort((a, b) => a - b);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    //前フレームと同じならstate更新しないためのガード
    let last = -1;
    return subscribe(({ smoothedScrollY }) => {
      const offsets = offsetsRef.current;
      if (offsets.length === 0) return;
      const idx = findActiveIndex(offsets, smoothedScrollY);
      if (idx !== last) {
        last = idx;
        setActiveIndex(idx);
      }
    });
  }, [isDesktop, subscribe]);

  return (
    <div style={{ height: isDesktop ? scrollHeight : "" }}>
      <div
        className={
          isDesktop
            ? "sticky top-0 h-dvh overflow-hidden bg-blob-paper bg-noise-overlay overscroll-none"
            : "bg-blob-paper bg-noise-overlay"
        }
      >
        {isDesktop && <ProgressBar />}
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* <BonkichiModel /> */}
        </div>
        {isDesktop && <StickyTitle activeIndex={activeIndex} />}
        <div
          ref={containerRef}
          className={`scroll-sections-container flex will-change-transform h-full ${
            isDesktop ? "flex-row" : "flex-col"
          }`}
        >
          {/* Concept */}
          <Section1
            ref={(el) => {
              itemRefs.current[0] = el;
            }}
            isDesktop={isDesktop}
          />
          {!isDesktop && <TopImageMobile />}
          {/* Design */}
          {isDesktop && <SectionDivider>DESIGN</SectionDivider>}
          <Section
            ref={(el) => {
              itemRefs.current[1] = el;
            }}
            isDesktop={isDesktop}
            contentIndex={1}
          />
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/sample_1.jpg"
            alt="photo_1"
          />
          {/* Living */}
          {isDesktop && <SectionDivider>LIVING</SectionDivider>}
          <Section
            ref={(el) => {
              itemRefs.current[2] = el;
            }}
            isDesktop={isDesktop}
            contentIndex={2}
          />
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/sample_2.jpg"
            alt="photo_2"
          />
          {/* Off-grid */}
          {isDesktop && <SectionDivider>POWER</SectionDivider>}
          <Section
            ref={(el) => {
              itemRefs.current[3] = el;
            }}
            isDesktop={isDesktop}
            contentIndex={3}
          />
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/sample_3.jpg"
            alt="photo_3"
          />
          {/* Confort */}
          {isDesktop && <SectionDivider>CONFORT</SectionDivider>}
          <Section
            ref={(el) => {
              itemRefs.current[4] = el;
            }}
            isDesktop={isDesktop}
            contentIndex={4}
          />
          <ParallaxImage
            isDesktop={isDesktop}
            src="/about/sample_4.jpg"
            alt="photo_4"
          />
          {/* Base & Mobility */}
          {isDesktop && <SectionDivider>BASE</SectionDivider>}
          <Section
            ref={(el) => {
              itemRefs.current[5] = el;
            }}
            isDesktop={isDesktop}
            contentIndex={5}
          />
        </div>
      </div>
    </div>
  );
}

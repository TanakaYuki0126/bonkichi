"use client";

import { FOOTER_HEIGHT } from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import BonkichiModel from "./BonkichiModel";
import ProgressBar from "./ProgressBar";
import { useScroll } from "@/contexts/ScrollContext";
import ParallaxImage from "./ParallaxImage";
import StickyTitle from "./StickyTitle";

//スクロール位置から現在のセクションのインデックスを判別
//x: 今横にどれだけ進んでいるか
function findActiveIndex(offsets: number[], x: number) {
  //画面中央が全体座標のどこを指しているか
  const target = x + window.innerWidth * 0.5;

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
    return subscribe(({ smoothedScrollY }) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.transform = `translate3d(-${smoothedScrollY}px, 0, 0)`;
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
      <div className={isDesktop ? "sticky top-0 h-screen overflow-hidden" : ""}>
        <ProgressBar />
        <div className="fixed inset-0 pointer-events-none z-40">
          <BonkichiModel />
        </div>
        <StickyTitle activeIndex={activeIndex} />
        <div
          ref={containerRef}
          className={`flex h-full ${isDesktop ? "flex-row" : "flex-col"}`}
        >
          <section
            ref={(el) => {
              itemRefs.current[0] = el;
            }}
            className="relative w-screen h-screen shrink-0 bg-slate-100"
          >
            <div className="absolute top-1/4 right-1/4 flex flex-col gap-2">
              <p>「ボンゴトラックと背中に乗せた秘密基地」</p>
              <p>ハンドメイドの旅する小屋です。</p>
            </div>
          </section>
          <ParallaxImage />
          <section
            ref={(el) => {
              itemRefs.current[1] = el;
            }}
            className="relative w-screen h-screen shrink-0  bg-slate-100"
          >
            <div className="absolute top-1/4 right-10 flex flex-col gap-2">
              <h1 className="mb-5 text-4xl font-bold text-gray-700">
                外装 / exterior
              </h1>
              <p>杉板の縦張り、押縁仕上げを選びました。</p>
              <p>雨を効率よく下に流し、立体的な表情を見せてくれます。</p>
              <p>
                自然な木の風合いを残し、経年変化を楽しむためウッドロングエコで塗装しました。
              </p>
            </div>
          </section>
          <section
            ref={(el) => {
              itemRefs.current[2] = el;
            }}
            className="relative w-screen h-screen shrink-0 bg-green-300"
          >
            <div className="absolute top-1/4 right-1/4">
              <h1 className="text-4xl font-bold text-gray-700">
                内装 / interior
              </h1>
            </div>
          </section>
          <section
            ref={(el) => {
              itemRefs.current[3] = el;
            }}
            className="relative w-screen h-screen shrink-0 bg-lime-300"
          >
            <div className="absolute top-1/4 right-1/4">
              <h1 className="text-4xl font-bold text-gray-700">
                機能 / function
              </h1>
            </div>
          </section>
          <section
            ref={(el) => {
              itemRefs.current[4] = el;
            }}
            className="relative w-screen h-screen shrink-0 bg-yellow-300"
          >
            <div className="absolute top-1/4 right-1/4">
              <h1 className="text-4xl font-bold text-gray-700">
                ベース車両 / base
              </h1>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useRef, useState } from "react";
import MobileTitle from "../text/MobileTitle";
import DescriptionContent from "../text/DescriptionContent";
import { contents as allContents } from "@/features/about/data/contents";
import SectionContainer from "./SectionContainer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Section({
  ref,
  isDesktop,
  contentIndex,
}: {
  ref: React.Ref<HTMLElement>;
  isDesktop: boolean;
  contentIndex: number;
}) {
  const contents = allContents[contentIndex].items ?? [];
  const observerTargetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const displayContents = isDesktop
    ? contents
    : contents.filter((_, i) => i === activeIndex);
  //要素が画面に現れたときにフェードインアニメーション
  useIntersectionObserver(
    observerTargetRef,
    () => observerTargetRef.current?.classList.add("animate-fadeIn"),
    { threshold: 0.3 }
  );
  return (
    <SectionContainer isDesktop={isDesktop} ref={ref}>
      {!isDesktop && (
        <div
          ref={observerTargetRef}
          className="flex gap-5 opacity-0"
          style={{ animationDelay: "500ms" }}
        >
          {contents.map(({ title }, i) => {
            const active = activeIndex === i;
            return (
              <button onClick={() => setActiveIndex(i)} key={title}>
                <h2
                  className={`text-xl font-bold transition-opacity ${
                    active ? "opacity-100" : "opacity-50 hover:opacity-80"
                  } `}
                >
                  {title}
                </h2>
              </button>
            );
          })}
        </div>
      )}
      {!isDesktop && <MobileTitle index={contentIndex} />}
      <div className="w-full h-full flex gap-10">
        {displayContents.map((content) => (
          <DescriptionContent
            key={content.title}
            title={content.title}
            isDesktop={isDesktop}
          >
            {content.description.map((description) => (
              <p key={description}>{description}</p>
            ))}
          </DescriptionContent>
        ))}
      </div>
    </SectionContainer>
  );
}

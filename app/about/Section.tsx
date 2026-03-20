import React, { useState } from "react";
import MobileTitle from "./MobileTitle";
import DescriptionContent from "./DescriptionContent";
import { contents as allContents } from "./contents";
import SectionContainer from "./SectionContainer";

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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const displayContents = isDesktop
    ? contents
    : contents.filter((_, i) => i === activeIndex);
  return (
    <SectionContainer ref={ref}>
      {!isDesktop && (
        <div className="flex gap-5">
          {contents.map(({ title }, i) => {
            const active = activeIndex === i;
            return (
              <button onClick={() => setActiveIndex(i)} key={title}>
                <h2
                  className={`text-xl font-bold text-gray-700 transition-opacity ${active ? "opacity-100" : "opacity-50 hover:opacity-80"} `}
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

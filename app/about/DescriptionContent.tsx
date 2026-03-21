"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function DescriptionContent({
  title,
  children,
  isDesktop = true,
}: {
  title: string;
  children: React.ReactNode;
  isDesktop?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   const el = ref.current;
  //   if (!el) return;
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setVisible(true);
  //       }
  //     },
  //     {
  //       root: null,
  //       threshold: 0.5, //要素の20%が見えたら
  //     },
  //   );
  //   observer.observe(el);
  //   return () => observer.disconnect();
  // }, []);
  useIntersectionObserver(ref, () =>
    ref.current?.classList.add("animate-fadeInTranslateY"),
  );
  return (
    <div
      ref={ref}
      className={`flex flex-col justify-between gap-2 w-full h-full ${isDesktop ? "pb-20" : "pb-40"}`}
    >
      <div>
        {isDesktop && (
          <h2 className={"mb-2 text-lg font-bold text-gray-700"}>{title}</h2>
        )}
        <div
          className={"duration-700 flex flex-col gap-2 h-full"}
          style={{ transitionDelay: "120ms" }}
        >
          {children}
        </div>
      </div>
      <Image
        src={"/about/insulation.jpg"}
        width={500}
        height={500}
        alt="insulation"
        className={`w-3/4 rounded-sm`}
        style={{ transitionDelay: "240ms" }}
      />
    </div>
  );
}

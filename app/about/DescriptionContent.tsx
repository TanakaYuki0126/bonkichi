"use client";

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
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.observe(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.5, //要素の20%が見えたら
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={
        "flex flex-col justify-between gap-2 w-full h-full pb-40 lg:pb-20"
      }
    >
      <div>
        {isDesktop && (
          <h2
            className={[
              "mb-2 text-lg font-bold text-gray-700 transition-all duration-500 ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            {title}
          </h2>
        )}
        <div
          className={[
            "transition-all duration-700 ease-out flex flex-col gap-2 h-full",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          {children}
        </div>
      </div>
      <Image
        src={"/about/insulation.jpg"}
        width={500}
        height={500}
        alt="insulation"
        className={`w-3/4 rounded-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        style={{ transitionDelay: visible ? "240ms" : "0ms" }}
      />
    </div>
  );
}

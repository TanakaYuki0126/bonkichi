"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

export default function DescriptionContent({
  title,
  children,
  isDesktop = true,
  images,
}: {
  title: string;
  children: React.ReactNode;
  isDesktop?: boolean;
  images: { count: number; name: string };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  useIntersectionObserver(
    ref,
    () => {
      ref.current?.classList.add("animate-fadeInTranslateY");
    },
    { threshold: 0.3 }
  );
  return (
    <div
      ref={ref}
      className={`flex flex-1 min-w-0 flex-col justify-between gap-2 w-full h-full opacity-0 ${
        isDesktop ? "pb-20" : "pb-40"
      }`}
    >
      <div>
        {isDesktop && <h2 className={"mb-2 text-lg font-bold "}>{title}</h2>}
        <div
          className={"duration-700 flex flex-col gap-2 h-full"}
          style={{ transitionDelay: "120ms" }}
        >
          {children}
        </div>
      </div>
      <div>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={2000}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
        >
          {Array.from({ length: images.count }).map((_, i) => {
            const index = i + 1;
            const distance = Math.min(
              Math.abs(i - active),
              images.count - Math.abs(i - active)
            );
            const isNear = distance <= 2;
            return (
              <SwiperSlide
                key={`${images?.name}_${("00" + index + 1).slice(-2)}`}
              >
                {isNear && (
                  <Image
                    src={`/about/${images.name}_${("00" + index).slice(
                      -2
                    )}.jpg`}
                    width={500}
                    height={500}
                    alt={`${images?.name}_${("00" + index).slice(-2)}`}
                    className={`w-3/4 rounded-lg`}
                    style={{ transitionDelay: "240ms" }}
                    priority={i === 0}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

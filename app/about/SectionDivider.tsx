"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionDivider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      key={visible ? `visible-${children}` : `hidden-${children}`}
      ref={ref}
      className={`writing-vertical text-9xl text-center text-gray-700 divider-appear`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}

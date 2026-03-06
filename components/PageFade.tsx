"use client";

export default function PageFade({ active }: { active: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    ></div>
  );
}

"use client";

import { usePathname } from "next/navigation";

export const FOOTER_HEIGHT = 32;

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return;
  return (
    <footer
      className={`text-sm w-full flex items-center justify-center text-gray-400`}
      style={{ height: FOOTER_HEIGHT + "px" }}
    >
      &copy; 2026 bonkichi
    </footer>
  );
}

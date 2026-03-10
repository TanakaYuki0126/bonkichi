"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return;
  return (
    <footer className="text-sm w-full text-center text-gray-400 my-4">
      &copy; 2026 bonkichi
    </footer>
  );
}

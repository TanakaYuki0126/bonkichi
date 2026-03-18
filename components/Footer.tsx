"use client";

export const FOOTER_HEIGHT = 32;

export default function Footer() {
  return (
    <footer
      className={`text-sm w-full flex items-center justify-end pr-2 text-gray-400 fixed bottom-0`}
      style={{ height: FOOTER_HEIGHT + "px" }}
    >
      &copy; 2026 bonkichi
    </footer>
  );
}

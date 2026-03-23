"use client";

import { useTheme } from "@/contexts/ThemeContext";

import { MdLightMode, MdDarkMode } from "react-icons/md";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="transition-transform duration-300 hover:rotate-12"
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}

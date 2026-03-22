"use client";

import { useTheme } from "@/contexts/ThemeContext";

import { MdLightMode, MdDarkMode } from "react-icons/md";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}

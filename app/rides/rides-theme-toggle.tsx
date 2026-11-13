"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function RidesThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = resolvedTheme === "light";
  return <button
    type="button"
    className="rides-theme-toggle"
    aria-label={mounted ? (isLight ? "Switch to dark theme" : "Switch to light theme") : "Toggle color theme"}
    title={mounted ? (isLight ? "Dark mode" : "Light mode") : "Toggle theme"}
    onClick={() => setTheme(isLight ? "dark" : "light")}
  >{mounted && isLight ? <Moon size={18}/> : <Sun size={18}/>}</button>;
}

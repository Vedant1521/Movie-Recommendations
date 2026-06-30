"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const currentTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme;
    
    setTheme(currentTheme);
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="size-10 rounded-full border border-violet-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70" />
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="size-10 rounded-full border-violet-200/60 bg-white/70 shadow-sm backdrop-blur transition-all hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="size-5 text-violet-700" />
      ) : (
        <Sun className="size-5 text-amber-400" />
      )}
    </Button>
  );
}

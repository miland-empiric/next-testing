"use client";

import { useEffect } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

const OPTIONS: { value: Theme; icon: typeof SunIcon; label: string }[] = [
  { value: "light", icon: SunIcon, label: "Light" },
  { value: "dark", icon: MoonIcon, label: "Dark" },
  { value: "system", icon: MonitorIcon, label: "System" },
];

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  useEffect(() => {
    applyTheme(theme);
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyTheme("system");
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [theme]);

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-xl border border-border/60 bg-muted/50 p-1 shadow-xs", className)}>
      {OPTIONS.map(({ value, icon: IconComponent, label }) => (
        <Button
          key={value}
          type="button"
          variant={theme === value ? "secondary" : "ghost"}
          size="icon-sm"
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
        >
          <IconComponent className="size-4" />
        </Button>
      ))}
    </div>
  );
}

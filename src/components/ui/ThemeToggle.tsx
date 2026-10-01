import { useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/** Dark is the brand default; the choice persists across visits. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0c0c0b" : "#eeede7");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this visit */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-strong)] transition-colors duration-500 hover:border-accent",
        className,
      )}
    >
      {/* Half-filled disc: rotates to show which side is "on". */}
      <span
        aria-hidden="true"
        className={cn(
          "h-3.5 w-3.5 rounded-full border border-fg transition-transform duration-700 ease-expo [background:linear-gradient(90deg,var(--fg)_50%,transparent_50%)]",
          theme === "light" && "rotate-180",
        )}
      />
    </button>
  );
}

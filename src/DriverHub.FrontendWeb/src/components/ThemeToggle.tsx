import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="inline-flex items-center rounded-md border border-border p-1 bg-secondary/40">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setTheme("light")}
        className={cn(
          "gap-2 transition-smooth",
          !isDark ? "bg-primary text-primary-foreground shadow-soft" : ""
        )}
        aria-pressed={!isDark}
        aria-label="Ativar tema claro"
      >
        <Sun className="h-4 w-4" />
        Claro
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setTheme("dark")}
        className={cn(
          "gap-2 transition-smooth",
          isDark ? "bg-primary text-primary-foreground shadow-soft" : ""
        )}
        aria-pressed={isDark}
        aria-label="Ativar tema escuro"
      >
        <Moon className="h-4 w-4" />
        Escuro
      </Button>
    </div>
  );
};

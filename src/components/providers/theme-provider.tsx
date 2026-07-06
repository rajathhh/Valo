"use client";

import { useEffect, useState } from "react";
import {
  resolveTheme,
  useThemeStore,
  type ThemeState,
} from "@/stores/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((state: ThemeState) => state.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const apply = () => {
      const resolved = resolveTheme(mode);
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.style.colorScheme = resolved;
    };
    apply();

    if (mode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [mode]);

  // Avoid hydration flash: render children immediately, theme attribute is
  // set synchronously before paint via the inline script in the layout head.
  if (!mounted) return <>{children}</>;
  return <>{children}</>;
}

/** Inline script injected in <head> to set data-theme before first paint (no FOUC). */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('valo-theme');
    var mode = stored ? JSON.parse(stored).state.mode : 'system';
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {}
})();
`;

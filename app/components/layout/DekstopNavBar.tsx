"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../lib/constants/nav";
import { cn } from "../../lib/utils";

import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function DesktopNavbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-sm hidden sm:block">
      <div className="container flex h-16 items-center justify-between mx-auto">

        {/* BRAND / LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--accent)] text-white font-bold">
            AT
          </div>
          <span className="hidden sm:inline-block font-semibold text-lg tracking-tight text-[var(--text)]">
            AcuTrader
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors pb-1",
                  isActive
                    ? "text-[var(--accent)] font-semibold border-b-2 border-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE: THEME BUTTON + PROFILE */}
        <div className="flex items-center space-x-3">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)]/20 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text)]" />
            )}
          </button>

          {/* PROFILE ICON / AVATAR */}
          <Link href="/profile">
            <span className="p-2 border border-[var(--border)] rounded-full bg-[var(--card)] hover:bg-[var(--accent)]/10 transition-colors flex items-center justify-center">
              {/* Placeholder Avatar Circle */}
              <div className="h-4 w-4 rounded-full bg-[var(--accent)] opacity-70" />
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}

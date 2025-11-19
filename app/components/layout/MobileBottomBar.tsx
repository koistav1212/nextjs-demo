"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../lib/constants/nav";
import { cn } from "../../lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-secondary)] border-t border-[var(--border)] shadow-lg sm:hidden">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 transition-colors duration-200",
                isActive
                  ? "text-[var(--accent)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
              )}
            >
              <Icon
                className="w-5 h-5 mb-0.5"
                stroke="currentColor"
                fill={isActive ? "currentColor" : "none"}
              />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}

      </div>
    </div>
  );
}

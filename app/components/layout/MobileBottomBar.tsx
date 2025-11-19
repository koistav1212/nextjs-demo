// components/layout/MobileBottomBar.tsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../../lib/constants/nav'
import { cn } from '../../lib/utils'; // Utility for conditional class joining (common in Next.js/Shadcn)

export function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg sm:hidden">
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
                 ? "text-green-600 font-semibold" 
                  : "text-gray-500 hover:text-green-600"
              )}
            >
              <Icon 
                className="w-5 h-5 mb-0.5" 
                fill={isActive? 'currentColor' : 'none'} // Icon fill for active state
              />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
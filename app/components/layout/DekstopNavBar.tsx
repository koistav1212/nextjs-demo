// components/layout/DesktopNavbar.tsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../../lib/constants/nav';
import { cn } from '../../lib/utils';
import { DollarSign } from 'lucide-react'; // Placeholder for App Logo/Icon

export function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-sm hidden sm:block">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Logo/Brand Section */}
        <Link href="/" className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
            FinSim
          </span>
        </Link>
        
        {/* Main Navigation Links */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-green-600",
                  isActive 
                   ? "text-green-600 font-bold border-b-2 border-green-600 py-1" 
                    : "text-gray-500"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Profile/Action Button (Optional - could be Sign Out/Balance) */}
        <div className="flex items-center space-x-4">
          <Link href="/profile">
            <span className="p-2 border rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
             
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
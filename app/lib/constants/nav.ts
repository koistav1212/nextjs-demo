import { LayoutDashboard, TrendingUp, Briefcase, User, LucideIcon } from 'lucide-react';

// Define the shape of a navigation item
// We use LucideIcon here for better type consistency with the imports
export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon; 
};

/**
 * Defines the main navigation items required for the finance simulator MVP.
 * These are used across the Desktop SideNav and Mobile FooterNav.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard, // Icon for the main overview
  },
  {
    name: 'Stocks',
    href: '/stocks',
    icon: TrendingUp, // Icon for browsing available stocks/market
  },
  {
    name: 'My Portfolio',
    href: '/portfolio',
    icon: Briefcase, // Icon for current holdings and investment performance
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User, // Icon for user settings and account details
  },
];
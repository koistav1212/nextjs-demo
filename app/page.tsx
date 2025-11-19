"use client";

import React, { useState } from "react";

import { NAV_ITEMS } from './lib/constants/nav';
import { cn } from './lib/utils';
import DashboardSection from "./dashboard/page";
import MarketSection from "./stocks/page";
import ProfileSection from "./profile/page";
import PortfolioSection from "./portfolio/page";

// --- Types ---
// Must match the href paths in NAV_ITEMS (excluding the leading slash)
type Tab = "dashboard" | "stocks" | "portfolio" | "profile";

// --- Extracted UI Components for local use ---

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onMenuToggle,
}) => {
  const navLinkBase =
    "cursor-pointer text-sm font-medium transition-colors px-4 py-2 rounded-full";
  const navLinkActive =
    "bg-white text-slate-900 shadow-sm";
  const navLinkInactive =
    "text-slate-100 hover:bg-slate-800/60 hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/90 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-indigo-500/40">
            <span className="text-lg font-bold text-slate-950">SM</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Market Sim</p>
            <p className="text-xs text-slate-400">
              Your Virtual Trading Floor
            </p>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 p-2 text-slate-100 hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
}) => {
  if (!isOpen) return null;

  const itemBase =
    "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors";
  const itemActive = "bg-slate-100 text-slate-900";
  const itemInactive = "text-slate-100 hover:bg-slate-800/60";

  const handleClick = (tab: Tab) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden">
      <div className="absolute inset-y-0 left-0 w-64 max-w-[80vw] bg-slate-900/95 shadow-2xl shadow-slate-950">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm font-semibold text-slate-100">
            Navigation
          </p>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-300 hover:bg-slate-800"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                d="M6 6l12 12M6 18L18 6"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-2 px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const tabName = item.href.substring(1) as Tab;
            return (
              <button
                key={item.href}
                className={cn(itemBase, activeTab === tabName ? itemActive : itemInactive)}
                onClick={() => handleClick(tabName)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 lg:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-[0.7rem] text-slate-500 lg:px-6">
        <p className="flex-1 text-center">MarketSim MVP</p>
      </div>
    </footer>
  );
};

// --- Main Page Component ---

export default function Home() {
  // NOTE: In the App Router, the root URL '/' corresponds to the 'dashboard' logic path.
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to get the current section title and description
  const getHeaderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return {
          title: "Portfolio Dashboard",
          description: "Monitor your overall performance, balance, and asset allocation.",
        };
      case "stocks":
        return {
          title: "Stock Market",
          description: "Browse available stocks and execute instant Buy/Sell orders.",
        };
      case "portfolio":
        return {
          title: "My Holdings",
          description: "Review your current investments, average cost, and profit/loss.",
        };
      case "profile":
        return {
          title: "User Profile",
          description: "Manage account settings and simulator options.",
        };
      default:
        return { title: "Error", description: "Page not found." };
    }
  };

  const { title, description } = getHeaderContent();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50 lg:pb-0 pb-16">
      {/* Mobile-specific header (hidden on desktop where SideNav takes over) */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onMenuToggle={() => setIsMenuOpen(true)}
      />
      <MobileMenu
        isOpen={isMenuOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-10 pt-6 lg:px-6 lg:pt-8 lg:mt-0 mt-16">
        {/* Tab Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              {title}
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          </div>
        </div>

        {/* Dynamic Content Sections */}
        {activeTab === "dashboard" && <DashboardSection />}
        {activeTab == "stocks" && <MarketSection />}
        { activeTab === "portfolio" && <PortfolioSection /> } 
        {activeTab === "profile" && <ProfileSection />}
      </main>

      {/* Mobile-specific footer (hidden on desktop, provides bottom padding/bar) */}
      <Footer />
    </div>
  );
}
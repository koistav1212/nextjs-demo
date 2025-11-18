"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type Tab = "home" | "transactions" | "about";

interface SpendingPoint {
  month: string;
  spending: number;
}

interface CategoryPoint {
  name: string;
  value: number;
}

interface Transaction {
  id: number;
  date: string;
  vendor: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
}

// ---------- Mock Data ----------

const spendingData: SpendingPoint[] = [
  { month: "Jun", spending: 1450 },
  { month: "Jul", spending: 1200 },
  { month: "Aug", spending: 1680 },
  { month: "Sep", spending: 1925 },
  { month: "Oct", spending: 1780 },
  { month: "Nov", spending: 1850 },
];

const categoryData: any[] = [
  { name: "Groceries", value: 24 },
  { name: "Shopping", value: 21 },
  { name: "Dining", value: 17 },
  { name: "Transportation", value: 15 },
  { name: "Utilities", value: 13 },
  { name: "Entertainment", value: 10 },
];

const transactions: Transaction[] = [
  {
    id: 1,
    date: "2025-11-10",
    vendor: "Amazon",
    category: "Shopping",
    amount: 129.99,
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-11-09",
    vendor: "Zomato",
    category: "Dining",
    amount: 32.5,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-11-08",
    vendor: "Uber",
    category: "Transportation",
    amount: 18.9,
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-11-07",
    vendor: "Starbucks",
    category: "Dining",
    amount: 7.2,
    status: "Pending",
  },
  {
    id: 5,
    date: "2025-11-06",
    vendor: "Reliance Fresh",
    category: "Groceries",
    amount: 64.0,
    status: "Completed",
  },
];

// Colors for charts
const CATEGORY_COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#6366f1",
  "#14b8a6",
  "#a855f7",
  "#f97316",
];

// ---------- Reusable Components ----------

const KPICard: React.FC<{
  title: string;
  subtitle?: string;
  value: string;
  accent?: string;
  icon?: React.ReactNode;
}> = ({ title, subtitle, value, accent = "from-indigo-500 to-sky-500", icon }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-[1px] shadow-xl">
      <div className="flex h-full flex-col justify-between rounded-2xl bg-slate-950/80 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {title}
            </p>
            {subtitle && (
              <p className="mt-1 text-[0.7rem] text-slate-500">{subtitle}</p>
            )}
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent}`}
          >
            {icon ?? (
              <span className="text-lg text-white/90">
                $
              </span>
            )}
          </div>
        </div>
        <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

// ---------- Navbar & Mobile Menu ----------

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
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 shadow-lg shadow-emerald-500/40">
            <span className="text-lg font-bold text-slate-950">AF</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Apex Finance</p>
            <p className="text-xs text-slate-400">
              Smart Credit Insights
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => onTabChange("home")}
            className={`${navLinkBase} ${
              activeTab === "home" ? navLinkActive : navLinkInactive
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onTabChange("transactions")}
            className={`${navLinkBase} ${
              activeTab === "transactions" ? navLinkActive : navLinkInactive
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => onTabChange("about")}
            className={`${navLinkBase} ${
              activeTab === "about" ? navLinkActive : navLinkInactive
            }`}
          >
            About Us
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 p-2 text-slate-100 hover:bg-slate-800 lg:hidden"
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
          <button
            className={`${itemBase} ${
              activeTab === "home" ? itemActive : itemInactive
            }`}
            onClick={() => handleClick("home")}
          >
            Home
          </button>
          <button
            className={`${itemBase} ${
              activeTab === "transactions" ? itemActive : itemInactive
            }`}
            onClick={() => handleClick("transactions")}
          >
            Transactions
          </button>
          <button
            className={`${itemBase} ${
              activeTab === "about" ? itemActive : itemInactive
            }`}
            onClick={() => handleClick("about")}
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Sections ----------

const DashboardSection: React.FC = () => {
  return (
    <section className="space-y-6">
      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Available Credit"
          subtitle="of $10,000 limit"
          value="$8,500"
          accent="from-emerald-400 to-teal-500"
        />
        <KPICard
          title="Current Spending"
          subtitle="this month"
          value="$1,850"
          accent="from-indigo-400 to-sky-500"
        />
        <KPICard
          title="Payment Due Date"
          subtitle="Minimum payment: $55"
          value="Nov 30"
          accent="from-sky-400 to-purple-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Spending Trend */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Spending Trend
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Last 6 months
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[0.7rem] font-medium text-slate-300">
              Credit Card • 8742
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderColor: "#1f2937",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="spending"
                  stroke="#6366f1"
                  strokeWidth={2.4}
                  dot={{ r: 4, fill: "#6366f1" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Category Breakdown
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Share of this month&apos;s spend
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderColor: "#1f2937",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: 12, color: "#e5e7eb" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const TransactionsSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Recent Activity
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Last 5 card transactions
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={
                    idx % 2 === 0
                      ? "bg-slate-950"
                      : "bg-slate-950/70"
                  }
                >
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-300">
                    {tx.date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs font-medium text-slate-100">
                    {tx.vendor}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-300">
                    {tx.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-slate-100">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-xs">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold ${
                        tx.status === "Completed"
                          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
                          : "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          About Apex Finance
        </p>
        <p className="mt-1 text-xs text-slate-500">
          A fictional smart credit insights platform.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200 shadow-xl">
        <p className="mb-3">
          Apex Finance helps you understand how, where, and when you
          spend. Our intelligent risk engine surfaces unusual
          transactions, predicts bill impact, and gives you a
          crystal-clear view of your credit health.
        </p>
        <p className="mb-3">
          This dashboard is a demo interface designed for modern web
          experiences &mdash; fast, responsive, and powered by real-time
          analytics.
        </p>
        <p className="text-slate-400">
          Built with Next.js, TypeScript, Tailwind CSS, and Recharts.
          Plug in your own data or models to turn this into a live
          credit-card analytics console.
        </p>
      </div>
    </section>
  );
};

// ---------- Footer ----------

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-[0.7rem] text-slate-500 lg:px-6">
        <p>© {new Date().getFullYear()} Apex Finance. All rights reserved.</p>
        <p className="hidden text-slate-500 sm:block">
          Dashboard demo • Built for credit insights.
        </p>
      </div>
    </footer>
  );
};

// ---------- Main Page ----------

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
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

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-10 pt-6 lg:px-6 lg:pt-8">
        {/* Tab Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              {activeTab === "home" && "Credit Overview"}
              {activeTab === "transactions" && "Transactions"}
              {activeTab === "about" && "About Apex Finance"}
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              {activeTab === "home" &&
                "Monitor your credit usage, upcoming payments, and spending insights."}
              {activeTab === "transactions" &&
                "Review your most recent activity and keep an eye on every swipe."}
              {activeTab === "about" &&
                "Learn more about the Apex Finance demo dashboard."}
            </p>
          </div>
        </div>

        {activeTab === "home" && <DashboardSection />}
        {activeTab === "transactions" && <TransactionsSection />}
        {activeTab === "about" && <AboutSection />}
      </main>

      <Footer />
    </div>
  );
}

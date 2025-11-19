"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Briefcase,
  DollarSign,
  LineChart as ChartIcon,
} from "lucide-react";

import { KPICard } from "../components/shared/KpiCard";
import {
  portfolioValueData,
  sectorData,
  CHART_COLORS,
  STARTING_BALANCE,
} from "../lib/data/sim-data";

export default function DashboardSection() {
  const totalValue =
    portfolioValueData[portfolioValueData.length - 1].value;
  const initialBalance = STARTING_BALANCE;
  const dailyChangeAbsolute = 165.2;
  const dailyChangePercent = 1.58;
  const dailyChangeSign = dailyChangePercent >= 0 ? "+" : "-";

  return (
    <section className="space-y-6">

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Total Portfolio Value"
          subtitle="All assets combined"
          value={`$${totalValue.toFixed(2)}`}
          icon={Briefcase}
          accent="from-[var(--accent)] to-[var(--accent-hover)]"
          change="+4.80% lifetime"
        />

        <KPICard
          title="Available Cash"
          subtitle="Ready for trading"
          value={`$${(initialBalance - 3380).toFixed(2)}`}
          icon={DollarSign}
          accent="from-[var(--accent)] to-[var(--accent-hover)]"
        />

        <KPICard
          title="Daily P&L"
          subtitle="Today's performance"
          value={`${dailyChangeSign}$${dailyChangeAbsolute.toFixed(2)}`}
          icon={ChartIcon}
          change={`${dailyChangeSign}${dailyChangePercent.toFixed(2)}%`}
        />
      </div>

      {/* CHARTS */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">

        {/* PORTFOLIO TREND */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-xl transition-colors">
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              Portfolio Value Trend
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Last 6 Trading Days
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioValueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--chart-grid)"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `$${(value / 1000).toFixed(1)}k`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-line)"
                  strokeWidth={2.4}
                  dot={{ r: 4, fill: "var(--chart-line)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTOR ALLOCATION (Disabled for now) */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-xl transition-colors">
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              Sector Allocation
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Portfolio by Sector (%)
            </p>
          </div>

          {/* You can enable the Pie Chart later */}
          <div className="h-64 flex items-center justify-center text-[var(--text-secondary)]">
            <p className="text-sm opacity-70">
              Pie chart coming soon…
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

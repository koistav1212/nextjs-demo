"use client";

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Briefcase, DollarSign, LineChart as ChartIcon } from "lucide-react";
import { KPICard } from '../components/shared/KpiCard';
import { portfolioValueData, sectorData, CHART_COLORS, STARTING_BALANCE } from '../lib/data/sim-data';

/**
 * Dashboard Section: Shows KPIs, Portfolio Value Trend chart, and Sector Allocation chart.
 */
export default function DashboardSection ()  {
  // Mock calculations based on mock data
  const totalValue = portfolioValueData[portfolioValueData.length - 1].value;
  const initialBalance = STARTING_BALANCE;
  const dailyChangeAbsolute = 165.20; // Mocked
  const dailyChangePercent = 1.58; // Mocked
  const dailyChangeSign = dailyChangePercent >= 0 ? '+' : '-';

  return (
    <section className="space-y-6">
      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Total Portfolio Value"
          subtitle="All assets combined"
          value={`$${totalValue.toFixed(2)}`}
          icon={Briefcase}
          accent="from-indigo-400 to-sky-500"
          change="+4.80% lifetime"
        />
        <KPICard
          title="Available Cash"
          subtitle="Ready for trading"
          value={`$${(initialBalance - 3380.00).toFixed(2)}`} // Mocked cash remaining
          icon={DollarSign}
          accent="from-sky-400 to-purple-500"
        />
        <KPICard
          title="Daily P&L"
          subtitle="Today's performance"
          value={`${dailyChangeSign}$${dailyChangeAbsolute.toFixed(2)}`}
          icon={ChartIcon}
          change={`${dailyChangeSign}${dailyChangePercent.toFixed(2)}%`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Portfolio Value Trend */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-xl">
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Portfolio Value Trend
            </p>
            <p className="mt-1 text-xs text-slate-500">Last 6 Trading Days</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioValueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                {/* <Tooltip
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#1f2937", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                /> */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2.4}
                  dot={{ r: 4, fill: CHART_COLORS[0] }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-xl">
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Sector Allocation
            </p>
            <p className="mt-1 text-xs text-slate-500">Portfolio by Sector (%)</p>
          </div>
          {/* <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {sectorData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#1f2937", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: 12, color: "#e5e7eb" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div> */}
        </div>
      </div>
    </section>
  );
};
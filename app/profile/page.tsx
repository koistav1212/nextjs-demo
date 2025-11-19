"use client";

import { holdings } from "../lib/data/sim-data";
import { cn } from "../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProfileSection() {
  const totalValue = holdings.reduce(
    (sum, h) => sum + h.quantity * h.marketPrice,
    0
  );

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          Your Current Holdings
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Real-time snapshot of your stocks and P&L.
        </p>
      </div>

      {/* Holdings Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-[var(--text)]">

            {/* Table Header */}
            <thead className="bg-[var(--bg-secondary)] text-xs uppercase tracking-wide text-[var(--text-secondary)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-right">Quantity</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">
                  Avg. Cost
                </th>
                <th className="px-4 py-3 text-right">Market Price</th>
                <th className="px-4 py-3 text-right">Daily Change</th>
                <th className="px-4 py-3 text-right">Market Value</th>
              </tr>
            </thead>

            <tbody>
              {holdings.map((h, idx) => {
                const isPositive = h.dailyChange >= 0;
                const marketValue = h.quantity * h.marketPrice;

                return (
                  <tr
                    key={h.symbol}
                    className={cn(
                      idx % 2 === 0
                        ? "bg-[var(--bg)]"
                        : "bg-[var(--bg-secondary)]/50",
                      "transition-colors hover:bg-[var(--accent)]/10"
                    )}
                  >
                    {/* Symbol */}
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-[var(--accent)]">
                      {h.symbol}
                    </td>

                    {/* Quantity */}
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-[var(--text-secondary)]">
                      {h.quantity}
                    </td>

                    {/* Avg Cost */}
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-[var(--text-secondary)] hidden sm:table-cell">
                      ${h.avgCost.toFixed(2)}
                    </td>

                    {/* Market Price */}
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-[var(--text)]">
                      ${h.marketPrice.toFixed(2)}
                    </td>

                    {/* Daily Change */}
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem] font-semibold ring-1",
                          isPositive
                            ? "bg-[var(--profit)]/15 text-[var(--profit)] ring-[var(--profit)]/40"
                            : "bg-[var(--loss)]/15 text-[var(--loss)] ring-[var(--loss)]/40"
                        )}
                      >
                        {isPositive ? (
                          <ChevronUp className="w-3 h-3 mr-1" />
                        ) : (
                          <ChevronDown className="w-3 h-3 mr-1" />
                        )}
                        {h.dailyChange.toFixed(2)}%
                      </span>
                    </td>

                    {/* Market Value */}
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-bold text-[var(--text)]">
                      ${marketValue.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Market Value Box */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-right text-sm font-semibold text-[var(--text)] shadow-xl">
        Total Portfolio Market Value:
        <span className="text-lg text-[var(--profit)] ml-1">
          ${totalValue.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

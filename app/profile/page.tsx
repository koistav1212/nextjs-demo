"use client";
import { holdings } from '../lib/data/sim-data';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Holdings Section: Displays the user's current portfolio holdings.
 */
export default function ProfileSection()  {
  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.marketPrice, 0);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Your Current Holdings
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Real-time snapshot of your stocks and P&L.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-right">Quantity</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">Avg. Cost</th>
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
                    className={cn(idx % 2 === 0 ? "bg-slate-950" : "bg-slate-950/70", "transition-colors hover:bg-slate-800/80")}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-sky-400">
                      {h.symbol}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-slate-300">
                      {h.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-slate-300 hidden sm:table-cell">
                      ${h.avgCost.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-slate-100">
                      ${h.marketPrice.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem] font-semibold ring-1",
                          isPositive
                            ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
                            : "bg-red-500/15 text-red-300 ring-red-500/40"
                        )}
                      >
                        {isPositive ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}
                        {h.dailyChange.toFixed(2)}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-bold text-slate-100">
                      ${marketValue.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-right text-sm font-semibold text-slate-200 shadow-xl">
          Total Portfolio Market Value: <span className="text-lg text-emerald-400">${totalValue.toFixed(2)}</span>
      </div>
    </section>
  );
};
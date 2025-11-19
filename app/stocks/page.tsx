"use client";
import { tradeableStocks } from '../lib/data/sim-data';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Market Section: Displays a list of tradeable stocks with Buy/Sell buttons.
 */
export default function MarketSection() {
  const handleTrade = (symbol: string, action: 'Buy' | 'Sell') => {
    // In the real app, this would call your Next.js /api/trade route
    console.log(`${action} button clicked for ${symbol}`);
    alert(`[Simulated Action]: You are attempting to ${action} 1 share of ${symbol}.`);
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Live Market Data
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Select a stock to buy or sell (Simulated Real-Time).
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Company</th>
                <th className="px-4 py-3 text-right">Price (USD)</th>
                <th className="px-4 py-3 text-right">Change (%)</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {tradeableStocks.map((stock, idx) => {
                const isPositive = stock.change >= 0;
                return (
                  <tr
                    key={stock.symbol}
                    className={cn(idx % 2 === 0 ? "bg-slate-950" : "bg-slate-950/70", "transition-colors hover:bg-slate-800/80")}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-sky-400">
                      {stock.symbol}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-300 hidden sm:table-cell">
                      {stock.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-slate-100">
                      ${stock.price.toFixed(2)}
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
                        {stock.change.toFixed(2)}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleTrade(stock.symbol, 'Buy')}
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-emerald-500 transition-colors"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => handleTrade(stock.symbol, 'Sell')}
                        className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-red-500 transition-colors"
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
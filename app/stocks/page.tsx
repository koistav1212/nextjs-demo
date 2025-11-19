"use client";

import { tradeableStocks } from "../lib/data/sim-data";
import { cn } from "../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function MarketSection() {
  const handleTrade = (symbol: string, action: "Buy" | "Sell") => {
    alert(`[Simulated Trade] ${action} 1 share of ${symbol}`);
  };

  return (
    <section className="space-y-4">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          Live Market Data
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Select a stock to buy or sell (Simulated Real-Time).
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-[var(--text)]">

            {/* Table Header */}
            <thead className="bg-[var(--bg-secondary)] text-xs uppercase tracking-wide text-[var(--text-secondary)] border-b border-[var(--border)]">
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
                    className={cn(
                      idx % 2 === 0
                        ? "bg-[var(--bg)]"
                        : "bg-[var(--bg-secondary)]/50",
                      "transition-colors hover:bg-[var(--accent)]/10"
                    )}
                  >
                    {/* SYMBOL */}
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-[var(--accent)]">
                      {stock.symbol}
                    </td>

                    {/* COMPANY */}
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-[var(--text-secondary)] hidden sm:table-cell">
                      {stock.name}
                    </td>

                    {/* PRICE */}
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs text-[var(--text)]">
                      ${stock.price.toFixed(2)}
                    </td>

                    {/* CHANGE (%) */}
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
                        {stock.change.toFixed(2)}%
                      </span>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="whitespace-nowrap px-4 py-3 text-right space-x-2">

                      {/* BUY BUTTON */}
                      <button
                        onClick={() => handleTrade(stock.symbol, "Buy")}
                        className="rounded-lg bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-[var(--accent-hover)] transition"
                      >
                        Buy
                      </button>

                      {/* SELL BUTTON */}
                      <button
                        onClick={() => handleTrade(stock.symbol, "Sell")}
                        className="rounded-lg bg-[var(--loss)] px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-red-500/80 transition"
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
}

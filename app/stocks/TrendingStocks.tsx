"use client";

import { useEffect, useState } from "react";

export default function TrendingStocks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/market/trending");
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
        🔥 Trending Today
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.map((stock: any) => (
          <div
            key={stock.symbol}
            className="p-3 rounded-xl bg-[var(--card)] shadow-md border border-[var(--border)]"
          >
            <p className="font-bold text-[var(--accent)]">{stock.symbol}</p>
            <p className="text-xs text-[var(--text-secondary)]">{stock.name}</p>

            <p className="mt-2 text-xs text-[var(--text)]">
              ${stock.price}  
              <span
                className={
                  stock.change >= 0
                    ? "text-[var(--profit)] ml-1"
                    : "text-[var(--loss)] ml-1"
                }
              >
                {stock.change >= 0 ? "▲" : "▼"} {stock.change}%
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

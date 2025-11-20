"use client";

import { useState, useEffect } from "react";
import TrendingStocks from "./TrendingStocks";
import Filters from "./Filters";
import { cn } from "../lib/utils";

const TABS = ["Stocks", "ETF", "Intraday"];

export default function MarketScreener() {
  const [activeTab, setActiveTab] = useState("Stocks");

  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    country: "",
    exchange: "",
    type: "",
    currency: ""
  });

  //
  // 🔍 LOAD DATA BASED ON TAB
  //
  useEffect(() => {
    setData([]);
    setFilters({ country: "", exchange: "", type: "", currency: "" });
    if (activeTab === "ETF") loadETFs();
    if (activeTab === "Intraday") loadIntraday();
  }, [activeTab]);

  //
  // 🔍 SEARCH STOCKS
  //
  useEffect(() => {
    if (activeTab !== "Stocks") return;
    if (!query) {
      setData([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/market/search?q=${query}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, activeTab]);

  //
  // 📌 Load ETF screener
  //
  async function loadETFs() {
    setLoading(true);
    const res = await fetch(`/api/market/etf`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  //
  // 📌 Load Intraday most traded
  //
  async function loadIntraday() {
    setLoading(true);
    const res = await fetch(`/api/market/intraday`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  //
  // 📌 FILTERING (Stocks only)
  //
  const filtered =
    activeTab === "Stocks"
      ? data.filter((s: any) => {
          return (
            (filters.country ? s.country === filters.country : true) &&
            (filters.exchange ? s.exchange.includes(filters.exchange) : true) &&
            (filters.type ? s.instrument_type === filters.type : true) &&
            (filters.currency ? s.currency === filters.currency : true)
          );
        })
      : data;

  //
  // 📌 COLUMN SETS BASED ON TAB
  //
  const columns :any= {
    Stocks: ["Symbol", "Company", "Exchange", "Country", "Currency"],
    ETF: ["Symbol", "ETF Name", "Price", "1D Change", "Volume"],
    Intraday: ["Symbol", "Name", "Price", "Volume", "Change %"]
  };

  return (
    <section className="space-y-8">

      {/* 🌟 TAB SELECTION */}
      <div className="flex justify-center gap-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold border transition",
              activeTab === t
                ? "bg-[var(--accent)] text-white shadow"
                : "bg-[var(--card)] text-[var(--text-secondary)] border-[var(--border)]"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 🔍 SEARCH BAR (Stocks only) */}
      {activeTab === "Stocks" && (
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Search for stocks..."
            className="w-full sm:w-2/3 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {/* ⭐ TRENDING — only for stocks */}
      {activeTab === "Stocks" && <TrendingStocks />}

      <div className="flex flex-col sm:flex-row gap-6">

        {/* FILTERS (Stocks only) */}
        {activeTab === "Stocks" && (
          <Filters filters={filters} setFilters={setFilters} />
        )}

        {/* TABLE RESULT */}
        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
            {filtered.length} {activeTab} Found
          </h3>

          <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-xl">
            <table className="w-full text-sm">
              <thead className="bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)] uppercase tracking-wide">
                <tr>
                  {columns[activeTab].map((col:any) => (
                    <th key={col} className="px-4 py-3 text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filtered.map((item: any, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0
                          ? "bg-[var(--bg)]"
                          : "bg-[var(--bg-secondary)]/40"
                      }
                    >
                      {activeTab === "Stocks" && (
                        <>
                          <td className="px-4 py-3 text-[var(--accent)] font-semibold">
                            {item.symbol}
                          </td>
                          <td className="px-4 py-3">{item.instrument_name}</td>
                          <td className="px-4 py-3">{item.exchange}</td>
                          <td className="px-4 py-3">{item.country}</td>
                          <td className="px-4 py-3">{item.currency}</td>
                        </>
                      )}

                      {activeTab === "ETF" && (
                        <>
                          <td className="px-4 py-3 text-[var(--accent)] font-semibold">
                            {item.symbol}
                          </td>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3">₹{item.market_price}</td>
                          <td
                            className={cn(
                              "px-4 py-3 font-semibold",
                              item.change_percent >= 0
                                ? "text-[var(--profit)]"
                                : "text-[var(--loss)]"
                            )}
                          >
                            {item.change_percent}%
                          </td>
                          <td className="px-4 py-3">{item.volume}</td>
                        </>
                      )}

                      {activeTab === "Intraday" && (
                        <>
                          <td className="px-4 py-3 text-[var(--accent)] font-semibold">
                            {item.symbol}
                          </td>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3">{item.price}</td>
                          <td className="px-4 py-3">{item.volume}</td>
                          <td
                            className={cn(
                              "px-4 py-3 font-semibold",
                              item.change_percent >= 0
                                ? "text-[var(--profit)]"
                                : "text-[var(--loss)]"
                            )}
                          >
                            {item.change_percent}%
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

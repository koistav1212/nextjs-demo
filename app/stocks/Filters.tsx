"use client";

export default function Filters({ filters, setFilters }: any) {
  return (
    <div className="space-y-5 w-full sm:w-1/4 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">

      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
        Filters
      </h3>

      {/* Country Filter */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">
          Country
        </p>
        <select
          value={filters.country}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, country: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]"
        >
          <option value="">All</option>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
          <option value="Argentina">Argentina</option>
          <option value="Mexico">Mexico</option>
          <option value="Brazil">Brazil</option>
          <option value="Poland">Poland</option>
          <option value="Thailand">Thailand</option>
          <option value="Chile">Chile</option>
          <option value="Austria">Austria</option>
        </select>
      </div>

      {/* Exchange Filter */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">
          Exchange
        </p>
        <input
          placeholder="e.g. NASDAQ, NYSE"
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, exchange: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]"
        />
      </div>

      {/* Instrument Type */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">
          Type
        </p>
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, type: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]"
        >
          <option value="">All</option>
          <option value="Common Stock">Common Stock</option>
          <option value="Depositary Receipt">Depositary Receipt</option>
          <option value="Mutual Fund">Mutual Fund</option>
        </select>
      </div>

      {/* Currency */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">
          Currency
        </p>
        <select
          value={filters.currency}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, currency: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]"
        >
          <option value="">All</option>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="CAD">CAD</option>
          <option value="ARS">ARS</option>
          <option value="MXN">MXN</option>
          <option value="EUR">EUR</option>
          <option value="PEN">PEN</option>
          <option value="COP">COP</option>
          <option value="PLN">PLN</option>
        </select>
      </div>
    </div>
  );
}

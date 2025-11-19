import React from "react";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  subtitle?: string;
  value: string;
  accent?: string;
  icon: LucideIcon; 
  change?: string;
}

/**
 * Reusable card component for displaying Key Performance Indicators (KPIs) in the dashboard.
 */
export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  subtitle, 
  value, 
  accent = "from-indigo-500 to-sky-500", 
  icon: Icon, 
  change 
}) => {
  const isPositive = change?.startsWith('+');
  // Determine accent color based on KPI type and change direction
  const accentColor = title.includes('Daily P&L') ? (isPositive ? "from-emerald-500 to-teal-500" : "from-red-500 to-pink-500") : accent;

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
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accentColor}`}
          >
            <Icon className="w-5 h-5 text-white/90" />
          </div>
        </div>
        <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
        
        {change && (
            <div className={`mt-2 flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositive ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                {change} Today
            </div>
        )}
      </div>
    </div>
  );
};
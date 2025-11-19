// --- Types ---
export interface PortfolioValuePoint {
  date: string;
  value: number;
}

export interface SectorPoint {
  name: string;
  value: number; // Percentage share of portfolio
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgCost: number;
  marketPrice: number;
  dailyChange: number; // Percentage
}

// --- Mock Data ---

export const portfolioValueData: PortfolioValuePoint[] = [
  { date: "Mon", value: 10000 },
  { date: "Tue", value: 10250 },
  { date: "Wed", value: 10100 },
  { date: "Thu", value: 10450 },
  { date: "Fri", value: 10510 },
  { date: "Sat", value: 10480 },
];

export const sectorData: SectorPoint[] = [
  { name: "Technology", value: 45 },
  { name: "Finance", value: 25 },
  { name: "Energy", value: 15 },
  { name: "Healthcare", value: 10 },
  { name: "Other", value: 5 },
];

export const holdings: Holding[] = [
  {
    symbol: "AAPL",
    quantity: 10,
    avgCost: 150.00,
    marketPrice: 157.50,
    dailyChange: 0.85,
  },
  {
    symbol: "GOOGL",
    quantity: 5,
    avgCost: 1200.00,
    marketPrice: 1180.50,
    dailyChange: -1.25,
  },
  {
    symbol: "TSLA",
    quantity: 2,
    avgCost: 900.00,
    marketPrice: 915.20,
    dailyChange: 1.69,
  },
  {
    symbol: "MSFT",
    quantity: 15,
    avgCost: 280.00,
    marketPrice: 281.40,
    dailyChange: 0.15,
  },
];

export const tradeableStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 157.50, change: 0.85 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 1180.50, change: -1.25 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 915.20, change: 1.69 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3400.00, change: -0.50 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 475.20, change: 2.10 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 170.80, change: 0.05 },
];

export const CHART_COLORS = [
  "#22c55e", // Green
  "#0ea5e9", // Sky Blue
  "#f97316", // Orange
  "#6366f1", // Indigo
  "#a855f7", // Purple
];

// --- Other Constants ---
export const STARTING_BALANCE = 10000.00;
export const USER_ID = "user-1a2b-3c4d-5e6f";
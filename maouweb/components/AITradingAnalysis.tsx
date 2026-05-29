"use client";

interface AITradingAnalysisProps {
  selectedPair: string;
  selectedTimeframe: string;
  isPremium: boolean;
}

export default function AITradingAnalysis({ selectedPair, selectedTimeframe, isPremium }: AITradingAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">🧠 Trading AI Assistant</h2>
            <p className="text-sm text-zinc-300 mt-2">
              {isPremium
                ? "Premium AI analysis of market structure, risk, and high-confluence setups."
                : "Upgrade for professional AI trading analysis with dynamic TP/SL and structure bias."}
            </p>
          </div>
          <span className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-blue-200">
            {selectedPair} • {selectedTimeframe}
          </span>
        </div>
      </div>

      {isPremium ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Market Bias", value: "Bullish on structure confluence", highlight: true },
            { label: "Entry Zone", value: "Price confirms HH/HL on 1H after 15M liquidity sweep" },
            { label: "SL Zone", value: "Below the last swing low" },
            { label: "TP Strategy", value: "TP1 conservative / TP2 moderate / TP3 aggressive" },
          ].map((item) => (
            <div key={item.label} className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
              <p className="text-sm text-zinc-400">{item.label}</p>
              <p className={`mt-3 text-white ${item.highlight ? "font-bold text-yellow-400" : ""}`}>{item.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 text-zinc-300">
          <p className="mb-4">Premium-only analytics unlock:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Real-time structure alignment across 1M / 5M / 15M / 30M / 1H</li>
            <li>Dynamic TP/SL matrix calibrated to current volatility</li>
            <li>Market bias, probability scoring, and trade gating</li>
          </ul>
          <a href="/pricing" className="inline-flex mt-6 items-center rounded-2xl bg-yellow-500 px-4 py-3 text-sm font-bold text-black hover:bg-yellow-400 transition">
            Upgrade for Premium AI
          </a>
        </div>
      )}
    </div>
  );
}

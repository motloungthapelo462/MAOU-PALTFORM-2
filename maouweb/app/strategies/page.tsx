export default function StrategiesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold text-yellow-400">MAOU Strategy Vault</h1>
        <p className="text-zinc-400 text-lg">
          Browse strategy templates, choose trade plans by skill level, and save your own premium strategy ideas for later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Beginner Clean Trend", badge: "Free", desc: "Simple trend-following with clear entries and managed risk." },
            { title: "Intermediate Liquidity", badge: "Premium", desc: "Liquidity zone confirmation with BOS and TP targeting." },
            { title: "Advanced Institutional", badge: "Pro", desc: "Confluence strategy using multi-timeframe structure and pressure analysis." },
            { title: "Community Favorites", badge: "Pro", desc: "Top strategies shared by active traders in the MAOU room." },
          ].map((strategy) => (
            <div key={strategy.title} className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{strategy.title}</h2>
                <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-black">{strategy.badge}</span>
              </div>
              <p className="text-zinc-300 text-sm">{strategy.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

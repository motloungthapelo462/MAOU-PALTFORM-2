export default function LearnPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold text-yellow-400">MAOU Learning Hub</h1>
        <p className="text-zinc-400 text-lg">
          Learn trading structure, liquidity, BOS, risk management, and safe digital security practices — including VPN awareness and royalty-free focus music.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { title: "Trading Fundamentals", desc: "Market structure, supply/demand, BOS, and liquidity concepts for new traders." },
            { title: "Strategy Lessons", desc: "Step-by-step strategy breakdowns: trend, liquidity, and institutional flow." },
            { title: "Security & VPN", desc: "Safe VPN use, public WiFi protection, account hygiene, and phishing prevention." },
          ].map((card) => (
            <div key={card.title} className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <h2 className="text-xl font-bold text-white mb-3">{card.title}</h2>
              <p className="text-zinc-300 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Recommended Royalty-Free Music</h2>
          <p className="text-zinc-300 mb-4">MAOU recommends using safe, royalty-free focus music for trading sessions. This is the right path instead of copyrighted music integration.</p>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li>• YouTube Audio Library</li>
            <li>• Pixabay Music</li>
            <li>• Free Music Archive</li>
            <li>• Ambient trading playlists for focus and calm</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

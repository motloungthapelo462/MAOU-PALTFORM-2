export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold text-yellow-400">MAOU Premium</h1>
        <p className="text-zinc-400 text-lg">
          Unlock full AI trading power, live rooms, strategy building, social automation, and premium community features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Free", price: "$0", features: ["Basic signals", "Live chart access", "AI chat preview"] },
            { name: "Basic", price: "$29/mo", features: ["Advanced signals", "Strategy templates", "Social auto-posting"] },
            { name: "Pro", price: "$99/mo", features: ["Full live rooms", "Community chat", "Custom indicators"] },
          ].map((plan) => (
            <div key={plan.name} className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">{plan.name}</h2>
              <p className="text-4xl font-bold text-yellow-400 mb-6">{plan.price}</p>
              <ul className="space-y-3 text-zinc-300 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-2xl bg-yellow-500 px-4 py-3 font-semibold text-black hover:bg-yellow-400 transition">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

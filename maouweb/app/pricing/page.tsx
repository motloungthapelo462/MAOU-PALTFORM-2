export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      duration: "Forever",
      notes: "Live chart + public signals + basic analysis.",
      features: ["Live chart access", "Basic signals", "Limited indicators", "Public chat"],
      accent: "from-zinc-900 to-zinc-800",
    },
    {
      name: "Monthly",
      price: "$10",
      duration: "/month",
      notes: "Premium AI signals, TP/SL, and live rooms.",
      features: ["Premium dashboard", "AI signals", "Fundamentals", "TP1 / TP2 / TP3", "Live speech room", "Premium lessons", "Advanced indicators"],
      accent: "from-blue-900 to-blue-800",
    },
    {
      name: "3-Month",
      price: "$15",
      duration: "every 3 months",
      notes: "Best value for longer retention and strategy access.",
      features: ["Everything in Monthly", "Strategy vault access", "Priority signals", "Referral rewards", "Advanced AI analysis"],
      accent: "from-purple-900 to-zinc-900",
    },
    {
      name: "Yearly",
      price: "$25",
      duration: "/year",
      notes: "Full premium system access with AI coaching.",
      features: ["All premium systems", "Premium AI tools", "Indicator vault", "Pine Script releases", "Live market rooms", "VIP education", "Future upgrades"],
      accent: "from-yellow-900 to-orange-900",
    },
    {
      name: "Lifetime",
      price: "$35",
      duration: "one-time",
      notes: "Lifetime access to every MAOU premium system.",
      features: ["All current premium tools", "Lifetime indicator access", "Future MAOU upgrades", "Founder badge", "Early supporter role"],
      accent: "from-green-900 to-zinc-900",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
          <h1 className="text-5xl font-bold text-yellow-400 mb-3">MAOU Pricing</h1>
          <p className="text-zinc-400 text-lg">
            Choose the subscription that fits your trading goals. Public live charts are free for everyone. Premium users get advanced AI, strategy tools, and live rooms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`bg-gradient-to-br ${plan.accent} rounded-3xl border border-zinc-800 p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                  <p className="text-zinc-300 text-sm">{plan.notes}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">{plan.duration}</span>
              </div>

              <p className="text-5xl font-bold text-yellow-400 mb-4">{plan.price}</p>

              <ul className="space-y-3 text-sm text-zinc-200 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 text-green-400">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full rounded-2xl bg-white text-black font-bold py-3 hover:bg-yellow-200 transition">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Subscription Guidance</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-3">Free users</h3>
              <p className="text-zinc-300 text-sm">Can access the live TradingView chart, public signals, basic analysis, and community chat. Advanced analytics and premium features are locked.</p>
            </div>
            <div className="bg-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-3">Premium users</h3>
              <p className="text-zinc-300 text-sm">Get AI-powered structure analysis, TP/SL planning, Pine Script generation, live trading rooms, strategy vaults, and referral rewards.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 mt-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Aviator Flight Analytics</h2>
          <p className="text-zinc-400 mb-4">Statistical flight analytics for advanced probability zones and volatility tracking.</p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-700">
              <h3 className="font-bold text-white mb-2">Lifetime & Admin Access</h3>
              <p className="text-sm text-zinc-300">Full Aviator features are available to <span className="font-semibold text-white">Lifetime members</span> and verified <span className="font-semibold text-white">Real Admin</span> accounts.</p>
              <p className="text-sm text-zinc-300 mt-3">Includes advanced volatility tracking, multiplier history, and probability zone overlays.</p>
            </div>

            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-700">
              <h3 className="font-bold text-white mb-2">Subscribed Users & Aviator Add-on</h3>
              <p className="text-sm text-zinc-300">Non-lifetime premium subscribers can purchase the Aviator add-on for <span className="font-semibold text-white">$30</span>. Subscribed add-on users receive <span className="font-semibold text-white">two flight analyses per day</span>.</p>
              <p className="text-xs text-zinc-400 mt-3">Note: Aviator provides statistical analytics — not guaranteed predictions. Use responsibly and within local regulations.</p>
              <a href="/pricing" className="inline-flex mt-4 items-center rounded-2xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400 transition">Buy Aviator Add-on</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

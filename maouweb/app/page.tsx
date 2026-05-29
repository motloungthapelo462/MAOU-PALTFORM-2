export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-yellow-900 via-black to-black">
        <div className="max-w-4xl text-center">
          <h1 className="text-7xl font-black text-yellow-400 mb-4 drop-shadow-lg">
            MAOU
          </h1>
          <p className="text-3xl text-zinc-300 mb-4">
            Institutional AI Trading Intelligence
          </p>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Real-time multi-pair analysis • AI-powered strategies • Automated social posting • Referral monetization
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/dashboard"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition text-lg"
            >
              🚀 Launch Dashboard
            </a>
            <a
              href="/live"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-lg transition text-lg"
            >
              📺 Live Market Room
            </a>
            <a
              href="/learn"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-lg transition text-lg"
            >
              📖 Learn Hub
            </a>
            <a
              href="/pricing"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-lg transition text-lg"
            >
              💎 Pricing
            </a>
            <a
              href="/login"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-lg transition text-lg"
            >
              🔐 Login
            </a>
            <a
              href="/register"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-lg transition text-lg"
            >
              ✍️ Register
            </a>
          </div>

          {/* Trial Badge */}
          <div className="mt-12 inline-block bg-gradient-to-r from-blue-900 to-purple-900 px-6 py-3 rounded-full border border-blue-500">
            <p className="text-blue-200">
              ✨ <span className="font-bold">5-Day Free Trial Active</span> • Full premium access
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-yellow-400 text-center mb-16">
            Complete Trading Intelligence Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Multi-Pair Analysis",
                desc: "Real-time analysis on 100+ forex pairs with AI-powered signals",
              },
              {
                icon: "🎯",
                title: "Advanced Strategies",
                desc: "Create custom trading strategies with AI-powered backtesting",
              },
              {
                icon: "📱",
                title: "Auto-Posting",
                desc: "Automatically post signals to Twitter, TikTok, Instagram & more",
              },
              {
                icon: "💰",
                title: "Monetization",
                desc: "Earn 5% referral commission on premium subscriptions and grow MAOU with your network",
              },
              {
                icon: "🤖",
                title: "AI Learning",
                desc: "Master AI teaches you trading strategies and risk management",
              },
              {
                icon: "🔔",
                title: "Live Alerts",
                desc: "Instant signals to your phone, email & social media accounts",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-700 hover:border-yellow-500 transition"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monetization Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-yellow-400 text-center mb-16">
            💰 Multiple Revenue Streams
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Web Visits", value: "2,450+", earning: "AdSense Revenue" },
              { label: "AI Credits", value: "15,240", earning: "$3,048/mo" },
              { label: "Subscriptions", value: "47 Users", earning: "$4,206/mo" },
              { label: "Referrals", value: "12 Clients", earning: "$4,750/mo" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-yellow-900 to-zinc-900 p-6 rounded-xl border border-yellow-700"
              >
                <p className="text-zinc-400 text-sm">{item.label}</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{item.value}</p>
                <p className="text-sm text-green-400 mt-2">💰 {item.earning}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-yellow-900 to-orange-900 p-8 rounded-2xl border border-yellow-600">
            <h3 className="text-2xl font-bold text-white mb-4">How You Make Money:</h3>
            <ul className="space-y-3 text-white">
              <li>✅ <span className="font-bold">Free Users (5-day trial):</span> See basic analysis + live charts</li>
              <li>✅ <span className="font-bold">Refer 2 Clients:</span> Get free premium strategy + extended access</li>
              <li>✅ <span className="font-bold">Premium Subscribers:</span> $10/mo Monthly, $15 every 3 months, $25/year, $35 lifetime</li>
              <li>✅ <span className="font-bold">Referral Commission:</span> 5% of MAOU profit on each premium client</li>
              <li>✅ <span className="font-bold">AI Credits:</span> Users buy credits for AI analysis & strategy generation</li>
              <li>✅ <span className="font-bold">Website Visits:</span> AdSense revenue from platform traffic</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of traders using MAOU's AI intelligence to generate consistent profits and build passive income through referrals.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-4 rounded-lg transition text-lg"
          >
            🚀 Get Started Free Today
          </a>
        </div>
      </div>
    </main>
  );
}
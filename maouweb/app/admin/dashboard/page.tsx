"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState("overview");

  useEffect(() => {
    // Check if admin session exists
    const checkAuth = async () => {
      const res = await fetch("/api/admin/check");
      if (!res.ok) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) return <div className="text-white">Checking authentication...</div>;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold text-yellow-400 mb-2">MAOU Admin Panel</h1>
          <p className="text-zinc-400">Full Platform Control • Strategy Management • User Control</p>
        </div>
        <button
          onClick={() => {
            document.cookie = "admin_session=; max-age=0";
            router.push("/admin/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* ADMIN TABS */}
      <div className="flex gap-2 mb-8 border-b border-zinc-800 overflow-x-auto">
        {[
          { id: "overview", label: "📊 Overview" },
          { id: "strategies", label: "🧠 Strategies" },
          { id: "users", label: "👥 Users" },
          { id: "monetization", label: "💰 Monetization" },
          { id: "social", label: "📱 Social Media" },
          { id: "settings", label: "⚙️ Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id)}
            className={`px-4 py-3 font-semibold transition whitespace-nowrap ${
              adminTab === tab.id
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {adminTab === "overview" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Platform Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Site Visits (30d)", value: "2,450", color: "bg-blue-900" },
              { label: "Active Users", value: "47", color: "bg-green-900" },
              { label: "Premium Subscriptions", value: "12", color: "bg-purple-900" },
              { label: "Monthly Revenue", value: "$4,206", color: "bg-yellow-900" },
              { label: "AI Credits Used", value: "15,240", color: "bg-orange-900" },
              { label: "Referral Earnings", value: "$24,320", color: "bg-pink-900" },
              { label: "Strategies Published", value: "8", color: "bg-cyan-900" },
              { label: "Avg Signal Accuracy", value: "87%", color: "bg-lime-900" },
            ].map((metric, i) => (
              <div key={i} className={`${metric.color} p-4 rounded-lg border border-zinc-700`}>
                <p className="text-zinc-300 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STRATEGIES TAB */}
      {adminTab === "strategies" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">AI Strategy Manager</h2>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg transition">
              + Create Strategy
            </button>
          </div>

          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="p-4 text-left">Strategy Name</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Accuracy</th>
                  <th className="p-4 text-center">Users</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "BOS Breakout Pro", status: "Active", accuracy: "89%", users: 23 },
                  { name: "Liquidity Sweep", status: "Active", accuracy: "85%", users: 18 },
                  { name: "ALMA Pressure", status: "Active", accuracy: "87%", users: 15 },
                  { name: "Multi-Timeframe Confluence", status: "Beta", accuracy: "92%", users: 8 },
                ].map((strategy, i) => (
                  <tr key={i} className="border-t border-zinc-700 hover:bg-zinc-800">
                    <td className="p-4 font-semibold">{strategy.name}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${
                        strategy.status === "Active" ? "bg-green-900 text-green-200" : "bg-yellow-900 text-yellow-200"
                      }`}>
                        {strategy.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-green-400">{strategy.accuracy}</td>
                    <td className="p-4 text-center">{strategy.users}</td>
                    <td className="p-4 text-center">
                      <button className="text-yellow-400 hover:text-yellow-300 font-semibold">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {adminTab === "users" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>

          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-center">Plan</th>
                  <th className="p-4 text-center">Joined</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { email: "user1@example.com", plan: "Premium", joined: "Jan 15, 2024" },
                  { email: "user2@example.com", plan: "Free", joined: "Jan 18, 2024" },
                  { email: "user3@example.com", plan: "Pro", joined: "Jan 20, 2024" },
                ].map((user, i) => (
                  <tr key={i} className="border-t border-zinc-700 hover:bg-zinc-800">
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 text-center font-semibold">{user.plan}</td>
                    <td className="p-4 text-center text-zinc-400">{user.joined}</td>
                    <td className="p-4 text-center">
                      <button className="text-red-400 hover:text-red-300 font-semibold">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MONETIZATION TAB */}
      {adminTab === "monetization" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Monetization Control</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-bold text-yellow-400 mb-4">Subscription Plans</h3>
              <ul className="space-y-3 text-sm">
                <li>✅ <span className="text-white">Free Plan:</span> Limited access</li>
                <li>✅ <span className="text-white">5-Day Trial:</span> Full premium access</li>
                <li>✅ <span className="text-white">Premium ($9/mo):</span> All signals + AI</li>
                <li>✅ <span className="text-white">Pro ($29/mo):</span> + Custom strategies</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-bold text-green-400 mb-4">Revenue Streams</h3>
              <ul className="space-y-3 text-sm">
                <li>📊 <span className="text-white">Subscriptions:</span> $3,200/mo</li>
                <li>🎯 <span className="text-white">Referrals:</span> $1,200/mo</li>
                <li>🤖 <span className="text-white">AI Credits:</span> $500/mo</li>
                <li>📢 <span className="text-white">Ads/Sponsorships:</span> $306/mo</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SOCIAL MEDIA TAB */}
      {adminTab === "social" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Social Media Automation</h2>

          <div className="space-y-4">
            {[
              { platform: "Twitter/X", connected: true, posts: "45", reach: "12.5K" },
              { platform: "Instagram", connected: true, posts: "23", reach: "8.3K" },
              { platform: "TikTok", connected: false, posts: "0", reach: "0" },
              { platform: "Telegram", connected: true, posts: "120", reach: "3.2K" },
            ].map((social, i) => (
              <div key={i} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 flex justify-between items-center">
                <div>
                  <p className="font-bold">{social.platform}</p>
                  <p className="text-sm text-zinc-400">
                    {social.connected ? `✅ Connected • ${social.posts} posts • ${social.reach} reach` : "❌ Not connected"}
                  </p>
                </div>
                <button className={`px-4 py-2 rounded font-bold transition ${
                  social.connected
                    ? "bg-red-900 hover:bg-red-800 text-red-200"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
                }`}>
                  {social.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-yellow-900 border border-yellow-700 p-6 rounded-lg">
            <h4 className="font-bold text-yellow-200 mb-3">Auto-Posting Configuration</h4>
            <p className="text-sm text-yellow-100">
              Enable automatic posting of daily signals, trades, and educational content to your connected social media accounts. MAOU's AI will generate optimized content for each platform.
            </p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded transition">
              Setup Auto-Posting
            </button>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {adminTab === "settings" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Platform Settings</h2>

          <div className="space-y-4">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-bold mb-4">API Configuration</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-zinc-400">OpenAI API Key</p>
                  <p className="text-green-400">✅ Connected</p>
                </div>
                <div>
                  <p className="text-zinc-400">TradingView Username</p>
                  <p className="text-green-400">✅ Configured</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-bold mb-4">Feature Toggles</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Enable New User Sign-ups</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Enable 5-Day Trial</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Enable Referral System</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Enable AI Auto-Learning</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

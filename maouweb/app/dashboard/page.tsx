"use client";

import { useEffect, useMemo, useState } from "react";
import AIChat from "@/components/AIChat";
import AITradingAnalysis from "@/components/AITradingAnalysis";
import AIPineScriptGenerator from "@/components/AIPineScriptGenerator";
import SocialMediaIntegration from "@/components/SocialMediaIntegration";
import StrategyBuilder from "@/components/StrategyBuilder";
import PremiumPaywall from "@/components/PremiumPaywall";
import AdvancedPairSelector from "@/components/AdvancedPairSelector";
import { structureAI, getPairsStrength, getFundamentalNews } from "@/lib/ai/advancedAI";

export type SubscriptionPlan = "free" | "monthly" | "quarterly" | "yearly" | "lifetime";

export default function DashboardPage() {
  const [selectedPair, setSelectedPair] = useState("XAUUSD");
  const [activeTab, setActiveTab] = useState("pairs");
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>("free");
  const [isRealAdmin, setIsRealAdmin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [referralCount, setReferralCount] = useState(1);
  const [siteVisits] = useState(2450);
  const [aiCreditsUsed] = useState(15240);
  const [monthlyRevenue] = useState(4206);
  const [referralEarnings] = useState({
    monthly: 4750,
    total: 24320,
    activeClients: 12,
    pendingClients: 3,
  });

  useEffect(() => {
    const cookieMap = document.cookie.split("; ").reduce<Record<string, string>>((acc, pair) => {
      const [key, value] = pair.split("=");
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    if (cookieMap.maou_plan) {
      setSubscriptionPlan(cookieMap.maou_plan as SubscriptionPlan);
    }

    if (cookieMap.admin_session === "true" && cookieMap.admin_role === "real") {
      setIsRealAdmin(true);
    }
  }, []);

  const activePlan = isRealAdmin && isAdminMode ? "lifetime" : subscriptionPlan;
  const freeStrategyUnlocked = referralCount >= 2;
  const isPremium = activePlan !== "free" || freeStrategyUnlocked;
  const subscriptionLabel = isRealAdmin && isAdminMode
    ? "Real Admin"
    : activePlan === "free"
    ? "Free"
    : activePlan === "monthly"
    ? "Monthly"
    : activePlan === "quarterly"
    ? "3-Month"
    : activePlan === "yearly"
    ? "Yearly"
    : "Lifetime";

  const timeframes = ["1M", "5M", "15M", "30M", "1H", "4H", "D", "W"];
  const pairsStrength = getPairsStrength();
  const fundamentalNews = getFundamentalNews();

  const currentAnalysis = useMemo(() => structureAI(selectedPair, "1H"), [selectedPair]);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mb-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-yellow-400 mb-2">MAOU Dashboard</h1>
            <p className="text-zinc-400">Advanced Multi-Timeframe Analysis • Live Signals • AI Learning</p>
          </div>
          {isRealAdmin && (
            <div className="flex flex-wrap gap-3 items-center">
              <span className="rounded-full bg-yellow-500 px-3 py-1 text-black text-xs font-semibold">Real Admin</span>
              <button
                onClick={() => setIsAdminMode(false)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !isAdminMode ? "bg-white text-black" : "bg-zinc-800 text-zinc-200"
                }`}
              >
                Membership View
              </button>
              <button
                onClick={() => setIsAdminMode(true)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isAdminMode ? "bg-white text-black" : "bg-zinc-800 text-zinc-200"
                }`}
              >
                Admin Mode
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400 text-sm uppercase tracking-[0.2em]">Subscription</p>
          <p className="text-3xl font-bold text-white mt-2">{subscriptionLabel}</p>
          <p className="text-sm text-zinc-400 mt-2">
            {isAdminMode ? "Admin view: full access to platform tools" : freeStrategyUnlocked ? "Free strategy unlocked by referrals" : "Public live chart + basic analysis"}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400 text-sm uppercase tracking-[0.2em]">Referral Count</p>
          <p className="text-3xl font-bold text-white mt-2">{referralCount}</p>
          <p className="text-sm text-zinc-400 mt-2">Refer 2 clients to unlock a free premium strategy</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400 text-sm uppercase tracking-[0.2em]">Live Signal</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{currentAnalysis.bias === "bullish" ? "BUY" : currentAnalysis.bias === "bearish" ? "SELL" : "WAIT"}</p>
          <p className="text-sm text-zinc-400 mt-2">{currentAnalysis.trend} • Confidence {currentAnalysis.confidence}%</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">Main Pair</h2>
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {[
              "XAUUSD",
              "EURUSD",
              "GBPUSD",
              "USDJPY",
              "USDCAD",
              "AUDUSD",
              "NZDUSD",
              "EURGBP",
              "GBPJPY",
              "AUDJPY",
            ].map((pair) => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
            <p className="text-zinc-400 text-sm uppercase tracking-[0.2em]">Traffic</p>
            <p className="text-3xl font-bold text-white mt-2">{siteVisits.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">Live web visits estimated</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
            <p className="text-zinc-400 text-sm uppercase tracking-[0.2em]">AI Usage</p>
            <p className="text-3xl font-bold text-white mt-2">{aiCreditsUsed.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">AI credit usage / month</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto border-b border-zinc-800 pb-4">
        {[
          { id: "pairs", label: "🎯 Advanced Pairs" },
          { id: "analysis", label: "📊 Multi-TF Analysis" },
          { id: "trading_ai", label: "🧠 Trading AI" },
          { id: "pine_ai", label: "🛠 PineScript AI" },
          { id: "strategies", label: "🎯 Strategies" },
          { id: "social", label: "📱 Auto-Posting" },
          { id: "premium", label: "💎 Premium" },
          { id: "news", label: "📰 Fundamentals" },
          { id: "chat", label: "🤖 AI Chat" },
          { id: "referrals", label: "💰 Earnings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-semibold transition text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "pairs" && <AdvancedPairSelector />}

      {!isAdminMode && activePlan === "free" && (
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">FREE WEEKLY SIGNAL</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-zinc-950 p-5 rounded-3xl border border-zinc-700">
              <p className="text-sm text-zinc-400 uppercase tracking-[0.2em]">Weekly Precision Signal</p>
              <p className="text-4xl font-bold text-white mt-4">XAUUSD BUY</p>
              <p className="text-sm text-zinc-400 mt-4">Entry: <span className="text-white font-semibold">4251</span></p>
              <p className="text-sm text-zinc-400">SL: <span className="text-white font-semibold">4242</span></p>
              <p className="text-sm text-zinc-400">TP1: <span className="text-white font-semibold">4264</span></p>
            </div>
            <div className="bg-zinc-950 p-5 rounded-3xl border border-zinc-700">
              <p className="text-sm text-zinc-400 uppercase tracking-[0.2em]">Market Explanation</p>
              <p className="text-sm text-zinc-300 mt-4">
                This weekly free signal is precision trimmed for community access. Upgrade for the full MAOU system, live indicators, and advanced risk management.
              </p>
              <a href="/pricing" className="inline-flex mt-6 items-center rounded-2xl bg-yellow-500 px-4 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition">
                Upgrade for full system
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analysis" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeframes.map((tf) => {
              const analysis = structureAI(selectedPair, tf);
              return (
                <div key={tf} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  <h3 className="font-bold text-yellow-400 mb-3">{tf} Timeframe</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-zinc-400">Trend: <span className="font-bold text-white">{analysis.trend}</span></p>
                    <p className="text-zinc-400">Confidence: <span className="font-bold text-green-400">{analysis.confidence}%</span></p>
                    <div className="pt-2 border-t border-zinc-700">
                      <p className="text-xs">Entry: <span className="font-bold">{analysis.entry}</span></p>
                      <p className="text-xs text-green-400">TP1: {analysis.tp1}</p>
                      <p className="text-xs text-blue-400">TP2: {analysis.tp2}</p>
                      <p className="text-xs text-purple-400">TP3: {analysis.tp3}</p>
                    </div>
                    <p className="text-xs text-zinc-400">BOS: {analysis.bos ? "confirmed" : "not confirmed"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "strategies" && <StrategyBuilder />}

      {activeTab === "trading_ai" && (
        <AITradingAnalysis selectedPair={selectedPair} selectedTimeframe="1H" isPremium={isPremium} />
      )}

      {activeTab === "pine_ai" && <AIPineScriptGenerator />}

      {activeTab === "social" && (
        <SocialMediaIntegration userTier={subscriptionPlan} referralCount={referralCount} />
      )}

      {activeTab === "premium" && <PremiumPaywall subscriptionPlan={subscriptionPlan} referralCount={referralCount} />}

      {activeTab === "news" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">📊 Fundamental News</h2>
          {fundamentalNews.map((news, i) => (
            <div key={i} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-white">{news.event}</p>
                  <p className="text-sm text-zinc-400">{news.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  news.impact === "Very High" ? "bg-red-900 text-red-200" :
                  news.impact === "High" ? "bg-orange-900 text-orange-200" :
                  "bg-yellow-900 text-yellow-200"
                }`}>
                  {news.impact} Impact
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-zinc-400">Forecast</p>
                  <p className="font-bold text-white">{news.forecast}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Previous</p>
                  <p className="font-bold text-white">{news.previous}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Pair</p>
                  <p className="font-bold text-yellow-400">{news.pair}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "chat" && <AIChat />}

      {activeTab === "referrals" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-900 to-zinc-900 p-6 rounded-2xl border border-green-800">
              <p className="text-zinc-400 text-sm">This Month</p>
              <p className="text-4xl font-bold text-green-400 mt-2">${referralEarnings.monthly}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-900 to-zinc-900 p-6 rounded-2xl border border-yellow-800">
              <p className="text-zinc-400 text-sm">Total Earned</p>
              <p className="text-4xl font-bold text-yellow-400 mt-2">${referralEarnings.total}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-zinc-900 p-6 rounded-2xl border border-blue-800">
              <p className="text-zinc-400 text-sm">Active Clients</p>
              <p className="text-4xl font-bold text-blue-400 mt-2">{referralEarnings.activeClients}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-zinc-900 p-6 rounded-2xl border border-purple-800">
              <p className="text-zinc-400 text-sm">Pending</p>
              <p className="text-4xl font-bold text-purple-400 mt-2">{referralEarnings.pendingClients}</p>
            </div>
          </div>
          <PremiumPaywall subscriptionPlan={subscriptionPlan} referralCount={referralCount} />
        </div>
      )}
    </main>
  );
}

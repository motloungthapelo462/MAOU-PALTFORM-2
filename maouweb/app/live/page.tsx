"use client";

import { useEffect, useMemo, useState } from "react";

const timeframes = ["1M", "5M", "15M", "1H", "4H", "D"];
const strategies = ["Beginner Trend", "Liquidity Confirmation", "BOS Reversal", "Institutional Confluence"];
const indicators = ["MAOU Trend", "Liquidity Zones", "BOS/CHOCH", "ALMA Pressure", "Session Overlay", "Volume Pressure", "Event Zones"];
const pairs = ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "USOIL", "US30"];
const candleDurations: Record<string, number> = {
  "1M": 60,
  "5M": 300,
  "15M": 900,
  "1H": 3600,
  "4H": 14400,
  D: 86400,
};
const playlist = [
  { title: "MAOU Focus Beat", artist: "Tradewave" },
  { title: "Liquidity Flow", artist: "Zen Charts" },
  { title: "Candle Pulse", artist: "Alpha Rhythm" },
];

export default function LiveRoomPage() {
  const [selectedPair, setSelectedPair] = useState("EURUSD");
  const [selectedTimeframe, setSelectedTimeframe] = useState("5M");
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [activeIndicators, setActiveIndicators] = useState<string[]>(["MAOU Trend", "Liquidity Zones"]);
  const [subscriptionPlan, setSubscriptionPlan] = useState<"free" | "monthly" | "quarterly" | "yearly" | "lifetime">("free");
  const [isRealAdmin, setIsRealAdmin] = useState(false);
  const [chatText, setChatText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { author: "AI", content: "5M bullish BOS confirmed after a sell-side sweep. Watch for a break above the resistance cluster.", time: "Now" },
    { author: "Trader", content: "Looking at TP1 at 1.1070. Does momentum support a move to 1.1100?", time: "1m ago" },
    { author: "AI", content: "Momentum is accelerating; confidence is 78%. Keep SL below the nearest liquidity pocket.", time: "Now" },
  ]);
  const candleDuration = candleDurations[selectedTimeframe] ?? 300;
  const [countdown, setCountdown] = useState(candleDuration);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);

  const chatLabel = useMemo(() => {
    if (selectedTimeframe === "1M") return "Scalp Room";
    if (selectedTimeframe === "15M" || selectedTimeframe === "1H") return "Swing Room";
    return "Live Market Room";
  }, [selectedTimeframe]);

  const isPremium = subscriptionPlan !== "free";

  const addMessage = () => {
    if (!chatText.trim()) return;
    setChatMessages([...chatMessages, { author: "You", content: chatText.trim(), time: "Now" }]);
    setChatText("");
  };

  const tvSymbol = (() => {
    if (selectedPair === "XAUUSD") return "OANDA:XAUUSD";
    if (selectedPair === "USOIL") return "TVC:USOIL";
    if (selectedPair === "US30") return "INDEX:US30";
    if (selectedPair === "USINDEX") return "TVC:USDX";
    return `OANDA:${selectedPair}`;
  })();

  useEffect(() => {
    const cookieMap = document.cookie.split("; ").reduce<Record<string, string>>((acc, pair) => {
      const [key, value] = pair.split("=");
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    if (cookieMap.maou_plan) {
      setSubscriptionPlan(cookieMap.maou_plan as "free" | "monthly" | "quarterly" | "yearly" | "lifetime");
    }
    if (cookieMap.admin_session === "true" && cookieMap.admin_role === "real") {
      setIsRealAdmin(true);
    }
  }, []);

  useEffect(() => {
    setCountdown(candleDuration);
    const timer = setInterval(() => {
      setCountdown((value) => (value > 0 ? value - 1 : candleDuration));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedTimeframe, candleDuration]);

  const activePlan = isRealAdmin ? "lifetime" : subscriptionPlan;
  const isAviatorUnlocked = activePlan === "lifetime" || isRealAdmin;
  const aviatorMessage = isAviatorUnlocked
    ? "Full Aviator flight analytics available for lifetime and real admin users."
    : subscriptionPlan !== "free"
    ? "Subscribed users can use Aviator Flight Analytics twice per day with the $30 add-on. Upgrade to Lifetime or Admin for unlimited access."
    : "Aviator Flight Analytics is locked for free users. Lifetime access or real admin is required.";

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mb-8 flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
        <div>
          <h1 className="text-5xl font-bold text-yellow-400 mb-2">MAOU Live Market Room</h1>
          <p className="text-zinc-400 max-w-2xl">
            Choose pair, timeframe, indicators, and strategy. Join a live TradingView-style room with AI commentary and community chat.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/dashboard" className="bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-2xl text-sm hover:border-yellow-400 transition">Dashboard</a>
          <a href="/learn" className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-2xl text-sm transition">Learn</a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm text-zinc-400">Pair</label>
                <select
                  value={selectedPair}
                  onChange={(e) => setSelectedPair(e.target.value)}
                  className="w-full mt-2 bg-zinc-800 text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {pairs.map((pair) => (
                    <option key={pair} value={pair}>{pair}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Timeframe</label>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full mt-2 bg-zinc-800 text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {timeframes.map((tf) => (
                    <option key={tf} value={tf}>{tf}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Strategy</label>
                <select
                  value={selectedStrategy}
                  onChange={(e) => setSelectedStrategy(e.target.value)}
                  className="w-full mt-2 bg-zinc-800 text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {strategies.map((strategy) => (
                    <option key={strategy} value={strategy}>{strategy}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Active Indicators</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {indicators.map((indicator) => (
                    <button
                      key={indicator}
                      type="button"
                      onClick={() => {
                        setActiveIndicators((current) =>
                          current.includes(indicator)
                            ? current.filter((item) => item !== indicator)
                            : [...current, indicator]
                        );
                      }}
                      className={`rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                        activeIndicators.includes(indicator)
                          ? "bg-yellow-500 text-black"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {indicator}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-[0.24em]">{chatLabel}</p>
                <h2 className="text-2xl font-bold text-white">Live AI Commentary</h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-900 px-4 py-2 text-xs font-semibold text-green-200">
                {selectedTimeframe} • {selectedStrategy}
              </span>
            </div>

            {isPremium ? (
              <>
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`rounded-3xl p-4 ${message.author === "AI" ? "bg-zinc-800" : "bg-yellow-950"}`}>
                      <div className="flex items-center justify-between gap-3 mb-2 text-xs text-zinc-400">
                        <span className="font-bold text-white">{message.author}</span>
                        <span>{message.time}</span>
                      </div>
                      <p className="text-sm text-zinc-200">{message.content}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
                  <textarea
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    rows={3}
                    placeholder="Ask about the market, entries, or the strategy..."
                    className="w-full resize-none rounded-2xl bg-black px-4 py-3 text-sm text-white outline-none ring-1 ring-zinc-700 focus:ring-yellow-500"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={addMessage}
                      className="rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-300">
                <p className="text-white font-semibold mb-3">Premium Chat AI is locked.</p>
                <p className="text-sm mb-4">Upgrade to access real-time trading commentary, structure-based advice, and premium live room interaction.</p>
                <a
                  href="/pricing"
                  className="inline-flex items-center rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition"
                >
                  View Premium Plans
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
            <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Live Chart</p>
                <h2 className="text-xl font-bold text-white">{selectedPair} • {selectedTimeframe}</h2>
              </div>
              <div className="rounded-full bg-green-900 px-4 py-2 text-xs font-semibold text-green-200">Streaming</div>
            </div>
            <iframe
              title="TradingView Live Widget"
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_01&symbol=${encodeURIComponent(tvSymbol)}&interval=${selectedTimeframe}&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=MACD%40tv-basicstudies&theme=dark&style=1`}
              className="w-full h-[540px] border-0"
              allowFullScreen
            />
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Strategy Summary</h3>
            {isPremium ? (
              <ul className="space-y-3 text-sm text-zinc-300">
                <li>• <span className="font-semibold text-white">Pair:</span> {selectedPair}</li>
                <li>• <span className="font-semibold text-white">Timeframe:</span> {selectedTimeframe}</li>
                <li>• <span className="font-semibold text-white">Strategy:</span> {selectedStrategy}</li>
                <li>• <span className="font-semibold text-white">Indicators:</span> {activeIndicators.join(", ")}</li>
                <li>• <span className="font-semibold text-white">Goal:</span> Live entry confirmation, momentum validation, and TP flow.</li>
              </ul>
            ) : (
              <div className="text-sm text-zinc-300 space-y-4">
                <p>Premium users unlock advanced strategy planning, TP/SL matrices, and live room guidance.</p>
                <a
                  href="/pricing"
                  className="inline-flex items-center rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition"
                >
                  Upgrade for Premium Strategy Details
                </a>
              </div>
            )}
          </div>
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-[0.24em]">Market Pulse</p>
                <h2 className="text-2xl font-bold text-white">Live Market Status</h2>
              </div>
              <div className="rounded-3xl bg-zinc-950 p-4 border border-zinc-800">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Candle Timer</p>
                <p className="text-3xl font-bold text-white mt-2">{String(Math.floor(countdown / 60)).padStart(2, "0")}:{String(countdown % 60).padStart(2, "0")}</p>
                <p className="text-sm text-zinc-400 mt-1">{selectedTimeframe} • {selectedTimeframe === "1M" || selectedTimeframe === "5M" ? "London / NY" : "Global Trend"}</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">MAOU Focus Playlist</h3>
            <div className="space-y-4">
              <div className="rounded-3xl bg-zinc-950 p-4 border border-zinc-800">
                <p className="text-sm text-zinc-400">Now Playing</p>
                <p className="text-lg font-bold text-white mt-2">{playlist[currentTrack].title}</p>
                <p className="text-sm text-zinc-400">{playlist[currentTrack].artist}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="rounded-2xl bg-yellow-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  onClick={() => setCurrentTrack((index) => (index + 1) % playlist.length)}
                  className="rounded-2xl bg-zinc-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
                >
                  Next Track
                </button>
              </div>
              <p className="text-xs text-zinc-400">Music is a focus feature for live trading sessions. It helps keep the room calm and the analysis sharp.</p>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-yellow-400">Premium Overlay</h3>
              <span className="rounded-full bg-blue-900 px-3 py-1 text-xs uppercase tracking-[0.18em] text-blue-200">{isPremium ? "Unlocked" : "Locked"}</span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li>• Advanced TP Zone overlays</li>
              <li>• Live speech room commentary</li>
              <li>• Strategy vault access</li>
              <li>• Probability analytics and event zones</li>
              <li>• Pine Script release access for lifetime users</li>
            </ul>
            {!isPremium && (
              <a
                href="/pricing"
                className="mt-5 inline-flex items-center rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition"
              >
                Upgrade to Premium
              </a>
            )}
          </div>
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Aviator Flight Analytics</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Statistical flight probability</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                isAviatorUnlocked ? "bg-green-900 text-green-200" : "bg-zinc-800 text-zinc-300"
              }`}>
                {isAviatorUnlocked ? "Lifetime/Admin" : "Locked"}
              </span>
            </div>
            <p className="text-sm text-zinc-300 mb-4">{aviatorMessage}</p>
            {!isAviatorUnlocked && subscriptionPlan !== "free" ? (
              <a
                href="/pricing"
                className="inline-flex items-center rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition"
              >
                Learn about $30 Aviator access
              </a>
            ) : null}
            {!isAviatorUnlocked && subscriptionPlan === "free" ? (
              <a
                href="/pricing"
                className="inline-flex items-center rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition"
              >
                Upgrade to view Aviator
              </a>
            ) : null}
            {isAviatorUnlocked && (
              <div className="mt-4 rounded-3xl bg-zinc-950 p-4 border border-zinc-800">
                <p className="text-sm text-zinc-400">Admin and Lifetime users receive advanced flight probability zones, volatility tracking, and statistical multiplier signals.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

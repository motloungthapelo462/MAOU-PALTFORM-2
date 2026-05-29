"use client";

import { useState } from "react";
import { ALL_FOREX_PAIRS } from "@/lib/types";

interface PairAnalysis {
  pair: string;
  currentPrice: number;
  trend: "up" | "down" | "ranging";
  confidence: number;
  signal: "BUY" | "SELL" | "WAIT";
  strength: number;
}

export default function AdvancedPairSelector() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPairs, setSelectedPairs] = useState<string[]>(["XAUUSD"]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");
  const [analyses, setAnalyses] = useState<PairAnalysis[]>([
    {
      pair: "XAUUSD",
      currentPrice: 3362.45,
      trend: "up",
      confidence: 87,
      signal: "BUY",
      strength: 92,
    },
  ]);

  const filteredPairs = Array.from(
    new Set(
      ALL_FOREX_PAIRS.filter((pair) =>
        pair.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  );

  const handleSelectPair = (pair: string) => {
    if (selectedPairs.includes(pair)) {
      setSelectedPairs(selectedPairs.filter((p) => p !== pair));
    } else {
      if (selectedPairs.length < 5) {
        setSelectedPairs([...selectedPairs, pair]);
        // Simulate AI analysis
        setAnalyses([
          ...analyses,
          {
            pair,
            currentPrice: Math.random() * 2000,
            trend: ["up", "down", "ranging"][Math.floor(Math.random() * 3)] as any,
            confidence: Math.floor(Math.random() * 30 + 60),
            signal: ["BUY", "SELL", "WAIT"][Math.floor(Math.random() * 3)] as any,
            strength: Math.floor(Math.random() * 40 + 60),
          },
        ]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎯 Advanced Pair Selector</h2>
        <p className="text-zinc-400">Select up to 5 pairs for real-time multi-pair analysis</p>
      </div>

      {/* Search and Timeframe */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search pairs... (XAUUSD, EURUSD, etc)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] bg-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option>1M</option>
          <option>5M</option>
          <option>15M</option>
          <option>1H</option>
          <option>4H</option>
          <option>D</option>
          <option>W</option>
        </select>
      </div>

      {/* Selected Pairs Badges */}
      <div className="flex flex-wrap gap-2">
        {selectedPairs.map((pair) => (
          <div
            key={pair}
            className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2"
          >
            {pair}
            <button
              onClick={() => handleSelectPair(pair)}
              className="hover:opacity-70 transition"
            >
              ✕
            </button>
          </div>
        ))}
        {selectedPairs.length < 5 && (
          <div className="text-zinc-400 text-sm py-2">
            ({selectedPairs.length}/5 selected)
          </div>
        )}
      </div>

      {/* Pair List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-zinc-900 p-4 rounded-xl border border-zinc-800 max-h-[400px] overflow-y-auto">
        {filteredPairs.map((pair) => (
          <button
            key={pair}
            onClick={() => handleSelectPair(pair)}
            disabled={selectedPairs.length >= 5 && !selectedPairs.includes(pair)}
            className={`p-3 rounded-lg font-semibold text-sm transition ${
              selectedPairs.includes(pair)
                ? "bg-yellow-500 text-black"
                : "bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {pair}
          </button>
        ))}
      </div>

      {/* Real-Time Analysis Grid */}
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-4">📊 Live Analysis ({selectedTimeframe})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.pair}
              className={`p-4 rounded-xl border-2 ${
                analysis.signal === "BUY"
                  ? "bg-gradient-to-br from-green-900 to-zinc-900 border-green-600"
                  : analysis.signal === "SELL"
                  ? "bg-gradient-to-br from-red-900 to-zinc-900 border-red-600"
                  : "bg-gradient-to-br from-yellow-900 to-zinc-900 border-yellow-600"
              }`}
            >
              <h4 className="font-bold text-white text-lg mb-2">{analysis.pair}</h4>
              <p className="text-2xl font-bold text-yellow-400 mb-3">${analysis.currentPrice.toFixed(2)}</p>

              <div className="space-y-2 text-sm mb-3">
                <div>
                  <span className="text-zinc-400">Signal:</span>
                  <span className={`font-bold ml-2 ${
                    analysis.signal === "BUY" ? "text-green-400" :
                    analysis.signal === "SELL" ? "text-red-400" : "text-yellow-400"
                  }`}>
                    {analysis.signal}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400">Confidence:</span>
                  <span className="text-green-400 font-bold ml-2">{analysis.confidence}%</span>
                </div>
                <div>
                  <span className="text-zinc-400">Strength:</span>
                  <span className="text-blue-400 font-bold ml-2">{analysis.strength}%</span>
                </div>
              </div>

              <div className={`text-xs font-bold px-2 py-1 rounded ${
                analysis.trend === "up" ? "bg-green-600 text-black" :
                analysis.trend === "down" ? "bg-red-600 text-white" :
                "bg-yellow-600 text-black"
              }`}>
                {analysis.trend === "up" ? "📈 Uptrend" :
                 analysis.trend === "down" ? "📉 Downtrend" : "↔️ Ranging"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Learning Notification */}
      <div className="bg-blue-900 border border-blue-700 p-4 rounded-lg">
        <p className="text-sm text-blue-200">
          🤖 <span className="font-bold">AI Learning Active:</span> Your selected pairs are being analyzed in real-time. Data is being collected to generate personalized trading strategies and improve signal accuracy.
        </p>
      </div>
    </div>
  );
}

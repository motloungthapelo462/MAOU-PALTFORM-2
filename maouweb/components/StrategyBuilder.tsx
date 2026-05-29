"use client";

import { useState } from "react";
import { Strategy } from "@/lib/types";

export default function StrategyBuilder() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: "1",
      name: "BOS Breakout",
      pair: "XAUUSD",
      timeframe: "1H",
      entryLogic: "Buy above BOS line with liquidity sweep confirmation",
      exitLogic: "TP1 at 1:1, TP2 at 1:2, TP3 at 1:3 RR",
      riskReward: "1:3",
      winRate: 72,
      profitFactor: 2.1,
      isPremium: true,
      createdBy: "System",
      createdAt: new Date(),
    },
  ]);

  const [showBuilder, setShowBuilder] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    pair: "XAUUSD",
    timeframe: "1H",
    entryLogic: "",
    exitLogic: "",
    riskReward: "1:2",
  });

  const handleCreateStrategy = () => {
    if (formData.name && formData.entryLogic && formData.exitLogic) {
      const newStrategy: Strategy = {
        id: Date.now().toString(),
        ...formData,
        winRate: 65,
        profitFactor: 1.8,
        isPremium: true,
        createdBy: "You",
        createdAt: new Date(),
      };
      setStrategies([...strategies, newStrategy]);
      setFormData({
        name: "",
        pair: "XAUUSD",
        timeframe: "1H",
        entryLogic: "",
        exitLogic: "",
        riskReward: "1:2",
      });
      setShowBuilder(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-400">🎯 Premium Strategy Builder</h2>
        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg transition"
        >
          + Create Strategy
        </button>
      </div>

      {/* Strategy Builder Form */}
      {showBuilder && (
        <div className="bg-zinc-900 p-8 rounded-2xl border border-yellow-500 border-opacity-50">
          <h3 className="font-bold text-yellow-400 mb-6">Build Your Custom Strategy</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Strategy Name</label>
              <input
                type="text"
                placeholder="My Profitable Strategy"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Pair</label>
                <select
                  value={formData.pair}
                  onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option>XAUUSD</option>
                  <option>EURUSD</option>
                  <option>GBPUSD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Timeframe</label>
                <select
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option>5M</option>
                  <option>15M</option>
                  <option>1H</option>
                  <option>4H</option>
                  <option>D</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Risk:Reward</label>
                <input
                  type="text"
                  placeholder="1:3"
                  value={formData.riskReward}
                  onChange={(e) => setFormData({ ...formData, riskReward: e.target.value })}
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Entry Logic</label>
              <textarea
                placeholder="Describe when to enter (e.g., BOS confirmation + liquidity sweep + pressure alignment)"
                value={formData.entryLogic}
                onChange={(e) => setFormData({ ...formData, entryLogic: e.target.value })}
                rows={3}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Exit Logic</label>
              <textarea
                placeholder="Describe exit rules (e.g., TP1 at 50%, TP2 at 100%, TP3 at 150%)"
                value={formData.exitLogic}
                onChange={(e) => setFormData({ ...formData, exitLogic: e.target.value })}
                rows={3}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreateStrategy}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition"
              >
                Save Strategy
              </button>
              <button
                onClick={() => setShowBuilder(false)}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Strategies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="bg-gradient-to-br from-yellow-900 to-zinc-900 p-6 rounded-2xl border border-yellow-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-yellow-400 text-lg">{strategy.name}</h3>
                <p className="text-sm text-zinc-400">
                  {strategy.pair} • {strategy.timeframe}
                </p>
              </div>
              <span className="bg-green-600 text-black px-3 py-1 rounded-full text-xs font-bold">
                {strategy.winRate}% Win
              </span>
            </div>

            <div className="space-y-3 text-sm mb-4">
              <div>
                <p className="text-zinc-400">Entry:</p>
                <p className="text-white">{strategy.entryLogic}</p>
              </div>
              <div>
                <p className="text-zinc-400">Exit:</p>
                <p className="text-white">{strategy.exitLogic}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">R:R Ratio: <span className="text-yellow-400 font-bold">{strategy.riskReward}</span></span>
                <span className="text-zinc-400">Profit Factor: <span className="text-green-400 font-bold">{strategy.profitFactor}</span></span>
              </div>
            </div>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg transition">
              Use This Strategy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

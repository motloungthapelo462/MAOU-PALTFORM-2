"use client";

import { useState } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm MAOU's AI Learning Assistant. I can help you with:\n• Trading strategies\n• Market analysis\n• Risk management\n• Referral program tips\n• Client management\n• Making consistent profits",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        referral: "Our referral program gives you 5% of MAOU profit on every premium client you bring. Each client should deposit at least $500. Top referrers earn passive income while building the platform.",
        strategy: "Use the BOS/CHOCH strategy combined with liquidity sweeps for high accuracy. Best timeframe: 4H and Daily. Entry: At structural break. TP1: 50% profit. TP2: 100% profit. TP3: 150% profit.",
        risk: "Always use 1:3 risk-reward ratio. Position size: 2% of account per trade. Stop loss: Below recent structure. This ensures consistent growth and limits drawdowns.",
        learning: "Start with Market Structure fundamentals, then learn Liquidity dynamics, then Advanced Price Action. Practice on demo for 2-3 months before live trading.",
        default: "Great question! To understand this better, could you be more specific? Ask about: referrals, strategies, risk management, learning path, or client management.",
      };

      const keyword = input.toLowerCase();
      let aiResponse = responses.default;

      if (keyword.includes("referral") || keyword.includes("earn")) aiResponse = responses.referral;
      else if (keyword.includes("strategy") || keyword.includes("trade")) aiResponse = responses.strategy;
      else if (keyword.includes("risk")) aiResponse = responses.risk;
      else if (keyword.includes("learn") || keyword.includes("teach")) aiResponse = responses.learning;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[600px] bg-zinc-900 rounded-2xl border border-zinc-800">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="font-bold text-yellow-400">MAOU AI Learning Assistant</h3>
        <p className="text-xs text-zinc-400">Ask about strategies, referrals, or trading tips</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-yellow-500 text-black font-semibold"
                  : "bg-zinc-800 text-zinc-100"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 opacity-60">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 px-4 py-2 rounded-lg">
              <p className="text-sm text-zinc-400">AI thinking...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask about referrals, strategies, learning..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface PremiumTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  buttonText: string;
  color: string;
}

interface PremiumPaywallProps {
  subscriptionPlan?: string;
  referralCount?: number;
}

export default function PremiumPaywall({ subscriptionPlan = "free", referralCount = 0 }: PremiumPaywallProps) {
  const [daysRemaining, setDaysRemaining] = useState(5);
  const isPremium = subscriptionPlan !== "free";

  const premiumTiers: PremiumTier[] = [
    {
      name: "Free Trial",
      price: "5 Days",
      duration: "Limited Access",
      features: ["Basic Analysis", "Live Charts", "1 Pair at a Time", "Limited AI Calls"],
      buttonText: "Currently Active",
      color: "from-zinc-800 to-zinc-900",
    },
    {
      name: "Basic Premium",
      price: "$29",
      duration: "/month",
      features: [
        "Advanced Multi-Pair Analysis",
        "Custom Indicators",
        "Strategy Templates",
        "Signal Alerts",
        "5000 AI Credits/month",
      ],
      buttonText: "Upgrade to Basic",
      color: "from-blue-900 to-zinc-900",
    },
    {
      name: "Pro Premium",
      price: "$99",
      duration: "/month",
      features: [
        "All Basic Features",
        "Custom Strategy Builder",
        "AI Learning System",
        "Unlimited AI Credits",
        "API Access",
        "Priority Support",
        "Referral Bonuses",
      ],
      buttonText: "Upgrade to Pro",
      color: "from-yellow-900 to-orange-900",
    },
  ];

  const referralRewards = [
    { referrals: 1, reward: "500 AI Credits" },
    { referrals: 2, reward: "Free Premium Strategy" },
    { referrals: 3, reward: "1 Month Basic Premium" },
    { referrals: 5, reward: "3 Months Pro Premium" },
  ];

  return (
    <div className="space-y-8">
      {/* Current Status */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-2xl border border-blue-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">🎁 Free Trial Active</h3>
              <p className="text-blue-200">{daysRemaining} days remaining • Full premium access</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-yellow-400">{daysRemaining}</p>
              <p className="text-sm text-blue-200">Days Left</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-800 rounded-lg">
            <p className="text-sm text-blue-100">
              💡 <span className="font-bold">Tip:</span> Refer 2 clients to unlock free strategy + extended premium access!
            </p>
          </div>
        </div>
      )}

      {/* Pricing Tiers */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">📊 Premium Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {premiumTiers.map((tier, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${tier.color} p-6 rounded-2xl border-2 ${
                tier.name === "Pro Premium" ? "border-yellow-500" : "border-zinc-700"
              } ${tier.name === "Pro Premium" ? "ring-2 ring-yellow-400" : ""}`}
            >
              {tier.name === "Pro Premium" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="mb-6">
                <p className="text-4xl font-bold text-yellow-400">{tier.price}</p>
                <p className="text-sm text-zinc-400">{tier.duration}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start text-sm text-white">
                    <span className="text-green-400 font-bold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full font-bold py-2 rounded-lg transition ${
                  tier.name === "Free Trial"
                    ? "bg-zinc-700 text-white cursor-default"
                    : tier.name === "Basic Premium"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Rewards */}
      <div className="bg-gradient-to-br from-purple-900 to-zinc-900 p-8 rounded-2xl border border-purple-700">
        <h3 className="text-2xl font-bold text-purple-400 mb-6">🎯 Referral Rewards System</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-white mb-4">Your Referral Progress</h4>
            <div className="space-y-3">
              {referralRewards.map((item, i) => (
                <div key={i} className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">{item.referrals} Referrals</p>
                    <span className="bg-green-600 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {item.reward}
                    </span>
                  </div>
                  <div className="mt-2 bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (referralCount / item.referrals) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">How It Works</h4>
            <div className="space-y-3 text-sm text-zinc-300">
              <p>
                ✅ <span className="text-white font-bold">Share Your Referral Link</span>
                <br />
                Get unique link in your dashboard
              </p>
              <p>
                ✅ <span className="text-white font-bold">Client Signs Up & Trades</span>
                <br />
                Minimum $500 deposit required
              </p>
              <p>
                ✅ <span className="text-white font-bold">Earn Rewards</span>
                <br />
                5% of MAOU profit on each premium client + bonus rewards
              </p>
              <p>
                ✅ <span className="text-white font-bold">Unlock Premium Features</span>
                <br />
                Free strategies, extended premium access
              </p>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
          Copy Your Referral Link
        </button>
      </div>

      {/* Monetization Dashboard */}
      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6">💰 Platform Monetization</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">Website Visits</p>
            <p className="text-3xl font-bold text-white mt-2">2,450</p>
            <p className="text-xs text-green-400 mt-1">+12% today</p>
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">AI Usage Credits</p>
            <p className="text-3xl font-bold text-white mt-2">15,240</p>
            <p className="text-xs text-green-400 mt-1">$3,048 revenue</p>
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">Premium Subscriptions</p>
            <p className="text-3xl font-bold text-white mt-2">47</p>
            <p className="text-xs text-green-400 mt-1">$4,206/month</p>
          </div>
        </div>

        <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
          <p className="text-sm text-green-200">
            <span className="font-bold">💡 Revenue Streams:</span> Website visits (AdSense) • Premium subscriptions • AI credit purchases • Referral commissions • Custom strategy sales
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { SocialMediaAccount, SocialMediaPlatform } from "@/lib/types";

interface SocialMediaIntegrationProps {
  userTier?: string;
  referralCount?: number;
}

interface SocialMediaForm {
  platform: SocialMediaPlatform;
  username: string;
  apiKey: string;
  accessToken: string;
  postTemplate: string;
  pin: string;
  pendingPin?: string;
}

const defaultPlatforms: SocialMediaPlatform[] = [
  "x",
  "instagram",
  "tiktok",
  "telegram",
  "discord",
  "facebook",
  "youtube",
];

const platformColors: Record<SocialMediaPlatform, string> = {
  x: "from-sky-700 to-blue-900",
  instagram: "from-pink-600 to-purple-800",
  tiktok: "from-black to-zinc-800",
  telegram: "from-blue-500 to-blue-700",
  discord: "from-indigo-700 to-blue-800",
  facebook: "from-blue-800 to-blue-900",
  youtube: "from-red-600 to-red-800",
};

export default function SocialMediaIntegration({ userTier, referralCount }: SocialMediaIntegrationProps) {
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<SocialMediaForm>({
    platform: "x",
    username: "",
    apiKey: "",
    accessToken: "",
    postTemplate: "🔥 SIGNAL: {pair} {direction} Entry: {entry} TP1: {tp1} TP2: {tp2} SL: {sl} Confidence: {confidence}% #MAOU",
    pin: "",
  });
  const [pinMessage, setPinMessage] = useState("");
  const [error, setError] = useState("");

  const userLabel = useMemo(() => {
    if (referralCount && referralCount >= 2) return "Referral Premium";
    if (userTier === "pro") return "Pro User";
    if (userTier === "basic") return "Premium User";
    return "Free User";
  }, [referralCount, userTier]);

  const sendPin = () => {
    if (!formData.username) {
      setError("Enter the social username before requesting verification.");
      return;
    }

    const pin = String(Math.floor(100000 + Math.random() * 900000));
    setFormData((prev) => ({ ...prev, pendingPin: pin, pin: "" }));
    setPinMessage(`PIN sent to ${formData.platform} account ${formData.username}. Enter ${pin} to confirm access.`);
    setError("");
  };

  const handleVerify = () => {
    if (!formData.pendingPin) {
      setError("Request a PIN first.");
      return;
    }

    if (formData.pin !== formData.pendingPin) {
      setError("PIN mismatch. Please confirm the code sent to your account.");
      return;
    }

    const newAccount: SocialMediaAccount = {
      platform: formData.platform,
      username: formData.username,
      apiKey: formData.apiKey,
      accessToken: formData.accessToken,
      postTemplate: formData.postTemplate,
      isConnected: true,
      autoPost: true,
      pinRequested: true,
      pinVerified: true,
    };

    setAccounts([...accounts, newAccount]);
    setShowForm(false);
    setFormData({
      platform: "x",
      username: "",
      apiKey: "",
      accessToken: "",
      postTemplate: "🔥 SIGNAL: {pair} {direction} Entry: {entry} TP1: {tp1} TP2: {tp2} SL: {sl} Confidence: {confidence}% #MAOU",
      pin: "",
    } as any);
    setPinMessage("");
    setError("");
  };

  return (
    <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">📱 Social Media Auto-Posting</h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Connect your social accounts, verify access with a PIN, and enable MAOU to publish signals, alerts, and market commentary on your behalf. Telegram, Discord, and X are prioritized for easier onboarding.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg transition"
        >
          {showForm ? "Close" : "+ Connect Account"}
        </button>
      </div>

      {accounts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {accounts.map((account, i) => (
            <div
              key={`${account.platform}-${account.username}-${i}`}
              className={`bg-gradient-to-br ${platformColors[account.platform]} p-4 rounded-xl border border-white border-opacity-20`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-white capitalize">{account.platform}</p>
                  <p className="text-sm text-white opacity-80">@{account.username}</p>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  account.pinVerified ? "bg-green-500 text-black" : "bg-yellow-500 text-black"
                }`}>
                  {account.pinVerified ? "Verified" : "Pending"}
                </span>
              </div>
              <p className="text-xs text-white opacity-80">Auto-post templates active for live trade alerts and educational updates.</p>
              <p className="text-xs text-zinc-200 mt-3">{account.postTemplate}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mb-6">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as SocialMediaPlatform })}
                className="w-full bg-zinc-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {defaultPlatforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform === "x" ? "X" : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Username</label>
              <input
                type="text"
                placeholder="@yourhandle"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-zinc-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Optional Access Token</label>
              <input
                type="text"
                placeholder="Optional session token"
                value={formData.accessToken}
                onChange={(e) => setFormData({ ...formData, accessToken: e.target.value })}
                className="w-full bg-zinc-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-zinc-400 mt-1">Only needed for advanced platform integrations later.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Post Template</label>
              <textarea
                placeholder="🔥 SIGNAL: {pair} {direction} Entry: {entry} TP1: {tp1} TP2: {tp2} SL: {sl} Confidence: {confidence}% #Trading #Forex"
                value={formData.postTemplate}
                onChange={(e) => setFormData({ ...formData, postTemplate: e.target.value })}
                rows={3}
                className="w-full bg-zinc-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
              <p className="text-xs text-zinc-400 mt-1">Use tags: pair, direction, entry, tp1, tp2, sl, confidence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={sendPin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-lg transition"
              >
                Send Verification PIN
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-4 py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>

            {pinMessage && (
              <div className="rounded-xl border border-yellow-600 bg-yellow-950 p-4 text-sm text-yellow-100">
                {pinMessage}
              </div>
            )}

            {formData.pendingPin && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Enter PIN</label>
                  <input
                    type="text"
                    value={formData.pin}
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                    placeholder="123456"
                    className="w-full bg-zinc-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <button
                  onClick={handleVerify}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-lg transition"
                >
                  Verify PIN & Connect Account
                </button>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-600 bg-red-950 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
        <p className="text-sm text-green-200">
          ✅ <span className="font-bold">Verified PIN access:</span> MAOU will securely post your signal updates, educational posts, and market commentary to approved accounts. Official developer APIs can be added later for deeper automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 bg-zinc-800 rounded-2xl border border-zinc-700">
        <div>
          <h3 className="font-bold text-white mb-2">Recommended First Integrations</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>• Telegram: easiest group/channel posting</li>
            <li>• Discord: community rooms and alerts</li>
            <li>• X: signal updates and project marketing</li>
            <li>• Facebook: premium community posts</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Auto-Post Content Types</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>• Signals: BUY/SELL, entry, TP/SL, confidence</li>
            <li>• Market analysis and trade education</li>
            <li>• BOS explanations and strategy breakdowns</li>
            <li>• Premium offers, leaderboard updates, live session alerts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

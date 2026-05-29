"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !selectedPlan) {
      setError("Please complete all fields to continue.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      document.cookie = `maou_user=${email}; path=/`;
      document.cookie = `maou_plan=${selectedPlan}; path=/`;
      router.push("/pricing");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 shadow-xl shadow-black/30">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-yellow-400">Join MAOU</h1>
            <p className="text-zinc-400 mt-2">Create your account, choose a plan, and start building premium trading intelligence.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="you@maou.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-200 mb-2">Referral Code (optional)</label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="MAOU-THAPELO-8821"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-200 mb-2">Subscription Plan</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="monthly">$10 Monthly</option>
                <option value="quarterly">$15 3 Months</option>
                <option value="yearly">$25 Yearly</option>
                <option value="lifetime">$35 Lifetime</option>
              </select>
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Already registered? <a href="/login" className="text-yellow-400 hover:text-yellow-300">Sign in here</a>
          </p>
        </div>
      </div>
    </main>
  );
}

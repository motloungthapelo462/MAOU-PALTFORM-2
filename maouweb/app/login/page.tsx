"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    // Simulated auth flow
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@maou.com" && password === "admin123") {
        document.cookie = "maou_user=admin; path=/";
        router.push("/dashboard");
      } else {
        document.cookie = "maou_user=member; path=/";
        router.push("/dashboard");
      }
    }, 800);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 shadow-xl shadow-black/30">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-yellow-400">MAOU Login</h1>
            <p className="text-zinc-400 mt-2">Access your trading dashboard, subscription history, and referral tools.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {error && <div className="text-sm text-red-400">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            New to MAOU? <a href="/register" className="text-yellow-400 hover:text-yellow-300">Create an account</a>
          </p>
        </div>
      </div>
    </main>
  );
}

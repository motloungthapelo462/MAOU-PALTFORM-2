"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [debugCode, setDebugCode] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp: otpRequired ? otp : undefined }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Invalid admin credentials");
        return;
      }

      if (result.otpRequired) {
        setOtpRequired(true);
        setSentMessage(result.message || "Enter the code sent to your email.");
        setDebugCode(result.debugCode);
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">MAOU</h1>
          <p className="text-zinc-400 mb-8">Admin Panel Login</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-200 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@maou.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-200 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {otpRequired && (
              <div>
                <p className="text-sm text-green-300 mb-2">{sentMessage}</p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP code"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {debugCode && (
                  <p className="text-xs text-zinc-400 mt-2">Debug OTP: {debugCode}</p>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (otpRequired ? "Verifying OTP..." : "Logging in...") : otpRequired ? "Verify OTP" : "Login as Admin"}
            </button>
          </form>

          <p className="text-center text-zinc-400 text-xs mt-6">
            🔒 This is a secure admin-only area
          </p>
        </div>
      </div>
    </main>
  );
}

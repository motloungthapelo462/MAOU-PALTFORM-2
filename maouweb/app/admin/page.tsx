import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const adminSession = cookies().get("admin_session")?.value;

  if (adminSession !== "true") {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-5xl font-bold text-yellow-400 mb-2">MAOU Admin Portal</h1>
          <p className="text-zinc-400 max-w-2xl">
            Welcome to the secure admin console. Manage strategies, users, monetization, social posting and platform settings from one place.
          </p>
        </div>
        <a
          href="/admin/dashboard"
          className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-black font-semibold transition hover:bg-yellow-400"
        >
          Open Admin Dashboard
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Secure Access",
            description: "Protected admin pages with cookie-based session validation and role-based guard checks.",
            accent: "bg-blue-900",
          },
          {
            title: "User Control",
            description: "Review platform users, manage plans, and handle account actions from the admin console.",
            accent: "bg-green-900",
          },
          {
            title: "Monetization",
            description: "Adjust subscription tiers, monitor revenue streams, and update referral reward structures.",
            accent: "bg-purple-900",
          },
          {
            title: "AI Strategy Management",
            description: "Approve, edit, or disable AI-driven strategy models and signal generation workflows.",
            accent: "bg-orange-900",
          },
          {
            title: "Social Automation",
            description: "Control auto-posting, connected social channels, and promotional campaign automation.",
            accent: "bg-pink-900",
          },
          {
            title: "Settings & Roles",
            description: "Configure admin roles, security settings, and platform-wide system controls.",
            accent: "bg-cyan-900",
          },
        ].map((card) => (
          <div key={card.title} className={`${card.accent} rounded-3xl border border-zinc-800 p-6`}>
            <h2 className="text-2xl font-bold text-white mb-3">{card.title}</h2>
            <p className="text-zinc-300 text-sm leading-7">{card.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

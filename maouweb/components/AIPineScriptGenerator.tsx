"use client";

import { useState } from "react";
import { MAOU_PINE_SCRIPT_TEMPLATE } from "@/lib/pineScriptTemplates";

export default function AIPineScriptGenerator() {
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);

  const generateScript = () => {
    setScript(MAOU_PINE_SCRIPT_TEMPLATE);
    setCopied(false);
  };

  const copyScript = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">🛠 Pine Script AI</h2>
          <p className="text-sm text-zinc-300 mt-2">
            Generate TradingView Pine Script templates for structure-based HH/HL and LH/LL setups with TP/SL zones. Use this as a starter bridge between live chart signals and indicator creation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={generateScript}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-5 py-3 rounded-2xl transition"
          >
            Generate Starter Script
          </button>
          <button
            onClick={copyScript}
            disabled={!script}
            className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-2xl transition"
          >
            {copied ? "Copied" : "Copy Script"}
          </button>
        </div>
      </div>

      {script ? (
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-xs text-zinc-200 leading-6">{script}</pre>
        </div>
      ) : (
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 text-zinc-300">
          <p>Click "Generate Starter Script" to create a Pine Script template. This can be used in TradingView for structure-based entry and TP/SL overlays.</p>
        </div>
      )}
    </div>
  );
}

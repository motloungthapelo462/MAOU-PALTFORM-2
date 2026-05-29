import { NextResponse } from "next/server";
import { masterAI } from "@/lib/ai/masterAI";

export async function GET() {

  const ai = masterAI();

  return NextResponse.json({
    pair: "XAUUSD",
    signal: ai.signal,
    confidence: ai.confidence,
    ai
  });
}
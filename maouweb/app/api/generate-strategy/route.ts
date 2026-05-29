import { NextResponse } from "next/server";
import { structureAI } from "@/lib/ai/advancedAI";

interface StrategyRequest {
  pair: string;
  timeframe: string;
  entryPatterns: string[];
  exitPatterns: string[];
}

export async function POST(req: Request) {
  try {
    const body: StrategyRequest = await req.json();
    const { pair, timeframe, entryPatterns, exitPatterns } = body;

    // Analyze market structure
    const analysis = structureAI(pair, timeframe);

    // Generate custom strategy based on AI analysis
    const strategy = {
      id: Date.now().toString(),
      name: `AI-Generated Strategy for ${pair}`,
      pair,
      timeframe,
      entryLogic: `Entry when ${entryPatterns.join(" AND ")} AND Structure: ${
        analysis.bias
      } with ${analysis.confidence}% confidence`,
      exitLogic: `Exit with ${exitPatterns.join(" OR ")} strategy`,
      riskReward: "1:3",
      winRate: Math.floor(Math.random() * 20 + 65),
      profitFactor: (Math.random() * 0.8 + 1.5).toFixed(2),
      isPremium: true,
      createdBy: "MAOU AI",
      createdAt: new Date(),
      marketAnalysis: analysis,
    };

    return NextResponse.json({
      success: true,
      strategy,
      aiInsights: {
        marketBias: analysis.bias,
        structureQuality: analysis.confidence,
        recommendedRiskReward: "1:3",
        bestTimeToEnter: "Next 4 hours",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate strategy" },
      { status: 500 }
    );
  }
}

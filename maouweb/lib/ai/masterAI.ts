import { structureAI } from "./structureAI";
import { liquidityAI } from "./liquidityAI";
import { pressureAI } from "./pressureAI";

export function masterAI() {
  const structure = structureAI();
  const liquidity = liquidityAI();
  const pressure = pressureAI();

  const confidence =
    (structure.confidence + liquidity.confidence + pressure.confidence) / 3;

  const signal =
    structure.bias === "bullish" &&
    liquidity.sweep &&
    pressure.almaAligned
      ? "BUY"
      : "SELL";

  return {
    signal,
    confidence: Math.round(confidence),
    structure,
    liquidity,
    pressure
  };
}

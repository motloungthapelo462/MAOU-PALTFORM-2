export function structureAI(pair: string, timeframe: string) {
  const timeframes = ["1M", "5M", "15M", "1H", "4H", "D", "W"];
  
  const analysis: any = {
    "XAUUSD": {
      "1M": { bias: "bullish", bos: true, confidence: 88, trend: "Up", entry: 3362.10, tp1: 3368.50, tp2: 3375.20, tp3: 3382.00 },
      "5M": { bias: "bullish", bos: true, confidence: 85, trend: "Up", entry: 3361.80, tp1: 3367.50, tp2: 3373.80, tp3: 3380.00 },
      "15M": { bias: "bullish", bos: true, confidence: 84, trend: "Up", entry: 3360.50, tp1: 3366.20, tp2: 3372.00, tp3: 3378.50 },
      "1H": { bias: "bullish", bos: true, confidence: 82, trend: "Uptrend", entry: 3359.00, tp1: 3365.00, tp2: 3371.50, tp3: 3377.00 },
      "4H": { bias: "bullish", bos: false, confidence: 80, trend: "Consolidating", entry: 3355.00, tp1: 3362.00, tp2: 3370.00, tp3: 3375.00 },
      "D": { bias: "bullish", bos: true, confidence: 79, trend: "Uptrend", entry: 3350.00, tp1: 3360.00, tp2: 3370.00, tp3: 3380.00 },
      "W": { bias: "bullish", bos: true, confidence: 77, trend: "Long-term Up", entry: 3340.00, tp1: 3355.00, tp2: 3370.00, tp3: 3385.00 },
    },
    "EURUSD": {
      "1M": { bias: "bearish", bos: false, confidence: 78, trend: "Down", entry: 1.0895, tp1: 1.0880, tp2: 1.0865, tp3: 1.0850 },
      "5M": { bias: "bearish", bos: false, confidence: 75, trend: "Down", entry: 1.0893, tp1: 1.0878, tp2: 1.0863, tp3: 1.0848 },
      "15M": { bias: "neutral", bos: false, confidence: 65, trend: "Consolidating", entry: 1.0890, tp1: 1.0900, tp2: 1.0910, tp3: 1.0920 },
      "1H": { bias: "bearish", bos: true, confidence: 72, trend: "Downtrend", entry: 1.0888, tp1: 1.0870, tp2: 1.0850, tp3: 1.0830 },
      "4H": { bias: "bearish", bos: true, confidence: 70, trend: "Downtrend", entry: 1.0885, tp1: 1.0860, tp2: 1.0835, tp3: 1.0810 },
      "D": { bias: "neutral", bos: false, confidence: 60, trend: "Ranging", entry: 1.0880, tp1: 1.0900, tp2: 1.0920, tp3: 1.0940 },
      "W": { bias: "bearish", bos: true, confidence: 68, trend: "Long-term Down", entry: 1.0870, tp1: 1.0840, tp2: 1.0810, tp3: 1.0780 },
    },
    "GBPUSD": {
      "1M": { bias: "bullish", bos: true, confidence: 86, trend: "Up", entry: 1.2745, tp1: 1.2765, tp2: 1.2785, tp3: 1.2805 },
      "5M": { bias: "bullish", bos: true, confidence: 83, trend: "Up", entry: 1.2743, tp1: 1.2763, tp2: 1.2783, tp3: 1.2803 },
      "15M": { bias: "bullish", bos: true, confidence: 81, trend: "Up", entry: 1.2740, tp1: 1.2760, tp2: 1.2780, tp3: 1.2800 },
      "1H": { bias: "bullish", bos: true, confidence: 79, trend: "Uptrend", entry: 1.2735, tp1: 1.2755, tp2: 1.2775, tp3: 1.2795 },
      "4H": { bias: "bullish", bos: false, confidence: 77, trend: "Consolidating", entry: 1.2720, tp1: 1.2745, tp2: 1.2770, tp3: 1.2795 },
      "D": { bias: "bullish", bos: true, confidence: 75, trend: "Uptrend", entry: 1.2700, tp1: 1.2730, tp2: 1.2760, tp3: 1.2790 },
      "W": { bias: "bullish", bos: true, confidence: 73, trend: "Long-term Up", entry: 1.2650, tp1: 1.2700, tp2: 1.2750, tp3: 1.2800 },
    },
  };

  return analysis[pair]?.[timeframe] || { bias: "neutral", bos: false, confidence: 50, trend: "Unknown", entry: 0, tp1: 0, tp2: 0, tp3: 0 };
}

export function getPairsStrength() {
  return {
    strong: [
      { pair: "XAUUSD", strength: 92, direction: "BUY", confidence: 89 },
      { pair: "GBPUSD", strength: 87, direction: "BUY", confidence: 85 },
      { pair: "AUDUSD", strength: 85, direction: "BUY", confidence: 82 },
      { pair: "NZDUSD", strength: 84, direction: "BUY", confidence: 80 },
      { pair: "USDCAD", strength: 83, direction: "SELL", confidence: 81 },
      { pair: "USDJPY", strength: 82, direction: "SELL", confidence: 79 },
      { pair: "EURGBP", strength: 81, direction: "SELL", confidence: 78 },
      { pair: "EURAUD", strength: 80, direction: "SELL", confidence: 77 },
      { pair: "GBPAUD", strength: 79, direction: "BUY", confidence: 76 },
      { pair: "AUDNZD", strength: 78, direction: "SELL", confidence: 75 },
      { pair: "CADJPY", strength: 77, direction: "SELL", confidence: 74 },
      { pair: "CHFJPY", strength: 76, direction: "BUY", confidence: 73 },
      { pair: "EURCAD", strength: 75, direction: "SELL", confidence: 72 },
      { pair: "EURJPY", strength: 74, direction: "SELL", confidence: 71 },
      { pair: "GBPJPY", strength: 73, direction: "SELL", confidence: 70 },
      { pair: "NZDJPY", strength: 72, direction: "SELL", confidence: 69 },
      { pair: "EURCZK", strength: 71, direction: "BUY", confidence: 68 },
      { pair: "EURHUF", strength: 70, direction: "BUY", confidence: 67 },
      { pair: "EURPLN", strength: 69, direction: "BUY", confidence: 66 },
      { pair: "EURHKD", strength: 68, direction: "SELL", confidence: 65 },
    ],
    medium: [
      { pair: "EURUSD", strength: 62, direction: "SELL", confidence: 58 },
      { pair: "USDCHF", strength: 61, direction: "BUY", confidence: 57 },
      { pair: "AUDCHF", strength: 60, direction: "BUY", confidence: 56 },
      { pair: "NZDCHF", strength: 59, direction: "BUY", confidence: 55 },
      { pair: "GBPCHF", strength: 58, direction: "BUY", confidence: 54 },
      { pair: "AUDCAD", strength: 57, direction: "BUY", confidence: 53 },
      { pair: "NZDCAD", strength: 56, direction: "BUY", confidence: 52 },
      { pair: "GBPCAD", strength: 55, direction: "BUY", confidence: 51 },
      { pair: "EURCHF", strength: 54, direction: "SELL", confidence: 50 },
      { pair: "USDZAR", strength: 53, direction: "BUY", confidence: 49 },
    ]
  };
}

export function getFundamentalNews() {
  return [
    { date: "Today 14:30", event: "US CPI Data", impact: "High", forecast: "+0.3%", previous: "+0.2%", pair: "USDX" },
    { date: "Today 18:00", event: "ECB Interest Rate", impact: "High", forecast: "4.25%", previous: "4.50%", pair: "EURUSD" },
    { date: "Tomorrow 08:00", event: "UK Employment Data", impact: "High", forecast: "250K", previous: "180K", pair: "GBPUSD" },
    { date: "Tomorrow 13:30", event: "Australia GDP", impact: "Medium", forecast: "+2.1%", previous: "+1.9%", pair: "AUDUSD" },
    { date: "Friday 22:00", event: "US NFP", impact: "Very High", forecast: "200K", previous: "175K", pair: "USDX" },
  ];
}

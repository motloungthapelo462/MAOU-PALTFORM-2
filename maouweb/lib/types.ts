// All tradeable forex pairs
export const ALL_FOREX_PAIRS = [
  // Major Pairs
  "EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD", "USDCAD", "NZDUSD",
  
  // Exotic Pairs
  "XAUUSD", "XAGUSD", "USOIL", "UKOIL", "US30", "USINDEX",
  
  // Cross Pairs
  "EURGBP", "EURJPY", "EURAUD", "EURNZD", "EURCAD", "EURCHF",
  "GBPJPY", "GBPAUD", "GBPNZD", "GBPCAD", "GBPCHF",
  "AUDJPY", "AUDNZD", "AUDCAD", "AUDCHF",
  "NZDJPY", "NZDCAD", "NZDCHF",
  "CADJPY", "CADCHF",
  "CHFJPY",
  
  // Emerging Markets
  "USDZAR", "USDBRL", "USDMXN", "USDTRY", "USDRUB", "USDHKD",
  "USDSGD", "USDMYR", "USDTHB", "USDPHP", "USDIDR", "USDVND",
  
  // Scandinavian
  "EURNOK", "EURSEK", "EURDKK",
  
  // Asian
  "SGDJPY", "HKDJPY",
  
  // Central European
  "EURCZK", "EURHUF", "EURPLN", "EURRON",
];

export const PREMIUM_FEATURES = {
  free: ["basic_analysis", "live_chart", "1_pair_at_time"],
  basic_premium: ["advanced_analysis", "multi_pairs", "custom_indicators", "strategy_templates"],
  pro_premium: ["all_features", "custom_strategy_builder", "ai_learning", "signal_alerts", "api_access"],
};

export type SocialMediaPlatform =
  | "twitter"
  | "x"
  | "instagram"
  | "tiktok"
  | "telegram"
  | "discord"
  | "facebook"
  | "youtube";

export interface SocialMediaAccount {
  platform: SocialMediaPlatform;
  username: string;
  apiKey: string;
  accessToken: string;
  isConnected: boolean;
  autoPost: boolean;
  postTemplate: string;
  pinRequested?: boolean;
  pinVerified?: boolean;
  pendingPin?: string;
}

export interface PremiumUser {
  userId: string;
  email: string;
  tier: "free" | "trial_5days" | "basic" | "pro";
  startDate: Date;
  expiryDate: Date;
  referralCount: number;
  strategiesGenerated: number;
  aiCreditsUsed: number;
}

export interface Strategy {
  id: string;
  name: string;
  pair: string;
  timeframe: string;
  entryLogic: string;
  exitLogic: string;
  riskReward: string;
  winRate: number;
  profitFactor: number;
  isPremium: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface CustomIndicator {
  id: string;
  name: string;
  formula: string;
  parameters: string[];
  visualization: string;
  createdBy: string;
  isPremium: boolean;
}

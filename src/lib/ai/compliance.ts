const BANNED_TERMS = [
  "passive income", "guaranteed returns", "guaranteed yield",
  "financial advice", "investment advice", "price prediction",
  "to the moon", "get rich", "guaranteed profit", "risk-free",
  "sure thing", "no risk", "double your", "100% returns",
  "financial freedom", "retire early",
];

export function checkCompliance(text: string): { safe: boolean; warnings: string[] } {
  const lower = text.toLowerCase();
  const warnings = BANNED_TERMS.filter(term => lower.includes(term));
  return { safe: warnings.length === 0, warnings };
}

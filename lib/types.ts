// lib/types.ts
// ─── Shared types across engine, API routes, and UI ───────────────

export type ModelId = "gpt-4o" | "claude-3-5-sonnet" | "gemini-2-5-pro" | "llama-3";

export type TaskProfile =
  | "general"
  | "coding"
  | "research"
  | "reasoning"
  | "creative";

// Raw response from each model API route
export interface ModelResponse {
  modelId: ModelId;
  content: string;
  tokensUsed: number;
  latencyMs: number;
  error?: string;
}

// Scores assigned by the judge model (0–100 each)
export interface ModelScores {
  accuracy: number;
  reasoning: number;
  coherence: number;
  grounding: number;
  hallucination: number; // lower = better — invert when displaying
}

// Full scored response (extends raw response)
export interface ScoredResponse extends ModelResponse {
  scores: ModelScores;
  overallScore: number; // weighted composite
}

// Final output from /api/synthesize
export interface SynthesisResult {
  scoredResponses: ScoredResponse[];
  fusedAnswer: string;
  consensus: number;        // 0–100: how much models agreed
  variance: number;         // 0–100: spread across scores
  overallQuality: number;   // 0–100: average of all overallScores
  chartData: ChartDataPoint[];
}

// Shape fed directly into Recharts
export interface ChartDataPoint {
  model: string;
  accuracy: number;
  reasoning: number;
  coherence: number;
  grounding: number;
  latency: number;          // ms — used in bar chart
  overall: number;
}

// Request body sent to /api/synthesize
export interface SynthesizeRequest {
  prompt: string;
  taskProfile: TaskProfile;
  responses: ModelResponse[];
}

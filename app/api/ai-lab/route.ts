import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, responses, scores } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    const systemPrompt = `You are the AI Lab Engine inside Fusion.
Your role is to help developers understand, analyze, and optimize their use of large language models.
You do NOT behave like a chatbot. You behave like an intelligent analysis system.

---
## YOUR OBJECTIVE
Break down and analyze the prompt and responses across:
1. Token usage and efficiency
2. Prompt clarity and structure
3. Model behavior (verbosity, reasoning, hallucination risk)
4. Cost implications
5. Optimization opportunities

---
## OUTPUT FORMAT (STRICT)
Return ONLY valid JSON matching this exact structure, with no markdown fences or preamble:

{
  "promptAnalysis": {
    "intent": "What the user is really asking",
    "clarityScore": 85,
    "issues": ["ambiguity", "verbosity"],
    "suggestedPrompt": "Improved prompt"
  },
  "tokenAnalysis": {
    "estimatedInput": 150,
    "estimatedOutput": 400,
    "totalTokens": 550,
    "efficiencyScore": 90,
    "wasteExplanation": "Where tokens are wasted",
    "reductionTips": ["Tip 1"]
  },
  "modelInsights": [
    {
      "model": "Model ID",
      "verbosity": "low | medium | high",
      "reasoningQuality": "Reasoning assessment",
      "hallucinationRisk": "low | medium | high",
      "differences": "Notable differences"
    }
  ],
  "reliability": {
    "unsupportedClaims": ["Claim 1"],
    "contradictions": ["Contradiction 1"],
    "confidenceScore": 80,
    "riskExplanation": "Risk layout"
  },
  "parameterSimulation": {
    "temperature": "How changing affects output",
    "maxTokens": "How changing affects output",
    "topP": "How changing affects output"
  },
  "optimization": {
    "promptRewrite": "Actionable rewrite",
    "tokenReduction": ["Tip 1"],
    "structureImprovements": ["Tip 1"]
  },
  "learning": {
    "misunderstoodConcepts": ["Concept 1"],
    "bestPractices": ["Practice 1"]
  }
}`;

    const userMessage = `USER PROMPT: ${prompt}
MODEL RESPONSES: ${JSON.stringify(responses)}
SCORES: ${JSON.stringify(scores)}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://fusion.ai',
        'X-Title': 'Fusion AI',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 1500, // Analysis can be long
        temperature: 0.2,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenRouter API failed: ${response.status} ${errorText}`)
    }

    const json = await response.json()
    const text = json.choices[0]?.message?.content ?? "{}"
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const analysis = JSON.parse(cleaned)

    return NextResponse.json({ analysis })
  } catch (err) {
    console.error("AI Lab Error:", err)
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : "Internal error",
      analysis: null 
    }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

type OpenAIResponse = {
  output_text?: string
  output?: Array<{
    content?: Array<{
      text?: string
      type?: string
    }>
  }>
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

type AnthropicResponse = {
  content?: Array<{
    type?: string
    text?: string
  }>
}

type OllamaResponse = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const query = typeof body?.query === 'string' ? body.query.trim() : ''
    const taskType = typeof body?.taskType === 'string' ? body.taskType : 'general'
    const modelKey = typeof body?.modelKey === 'string' ? body.modelKey : 'gemini'

    if (!query) {
      return NextResponse.json({ error: 'Query is required.' }, { status: 400 })
    }

    const prompt = [
      `Task type: ${taskType}`,
      'Provide a concise, grounded answer with clear reasoning and caveats when needed.',
      `User query: ${query}`,
    ].join('\n\n')

    if (modelKey === 'gpt4') {
      const openAIKey = process.env.OPENAI_API_KEY
      if (!openAIKey) {
        return NextResponse.json({ error: 'OPENAI_API_KEY is not configured.' }, { status: 500 })
      }

      const upstream = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          input: prompt,
          temperature: 0.3,
        }),
      })

      if (!upstream.ok) {
        const detail = await upstream.text()
        return NextResponse.json(
          { error: 'OpenAI request failed.', detail },
          { status: upstream.status }
        )
      }

      const data = (await upstream.json()) as OpenAIResponse
      const contentFromOutput = data.output
        ?.flatMap((item) => item.content ?? [])
        .map((chunk) => chunk.text)
        .filter(Boolean)
        .join('\n')
        .trim()

      const response = (data.output_text || contentFromOutput || '').trim()
      if (!response) {
        return NextResponse.json({ error: 'OpenAI returned an empty response.' }, { status: 502 })
      }

      return NextResponse.json({ response })
    }

    if (modelKey === 'gemini') {
      const geminiKey = process.env.GEMINI_API_KEY
      if (!geminiKey) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 })
      }

      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(geminiKey)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
            },
          }),
        }
      )

      if (!upstream.ok) {
        const detail = await upstream.text()
        return NextResponse.json(
          { error: 'Gemini request failed.', detail },
          { status: upstream.status }
        )
      }

      const data = (await upstream.json()) as GeminiResponse
      const response = data.candidates
        ?.flatMap((item) => item.content?.parts ?? [])
        .map((part) => part.text)
        .filter(Boolean)
        .join('\n')
        .trim()

      if (!response) {
        return NextResponse.json({ error: 'Gemini returned an empty response.' }, { status: 502 })
      }

      return NextResponse.json({ response })
    }

    if (modelKey === 'claude') {
      const anthropicKey = process.env.ANTHROPIC_API_KEY
      if (!anthropicKey) {
        return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not configured.' }, { status: 500 })
      }

      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 900,
          temperature: 0.3,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      })

      if (!upstream.ok) {
        const detail = await upstream.text()
        return NextResponse.json(
          { error: 'Anthropic request failed.', detail },
          { status: upstream.status }
        )
      }

      const data = (await upstream.json()) as AnthropicResponse
      const response = data.content
        ?.filter((chunk) => chunk.type === 'text')
        .map((chunk) => chunk.text)
        .filter(Boolean)
        .join('\n')
        .trim()

      if (!response) {
        return NextResponse.json({ error: 'Anthropic returned an empty response.' }, { status: 502 })
      }

      return NextResponse.json({ response })
    }

    if (modelKey === 'llama') {
      const ollamaKey = process.env.OLLAMA_API_KEY
      if (!ollamaKey) {
        return NextResponse.json({ error: 'OLLAMA_API_KEY is not configured.' }, { status: 500 })
      }

      const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'https://api.ollama.com/v1'
      const upstream = await fetch(`${ollamaBaseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ollamaKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3',
          temperature: 0.3,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      })

      if (!upstream.ok) {
        const detail = await upstream.text()
        return NextResponse.json(
          { error: 'Ollama request failed.', detail },
          { status: upstream.status }
        )
      }

      const data = (await upstream.json()) as OllamaResponse
      const response = data.choices?.[0]?.message?.content?.trim()

      if (!response) {
        return NextResponse.json({ error: 'Ollama returned an empty response.' }, { status: 502 })
      }

      return NextResponse.json({ response })
    }

    return NextResponse.json({ error: 'Unsupported model key.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected server error while generating provider response.', detail: String(error) },
      { status: 500 }
    )
  }
}

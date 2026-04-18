'use client'

import { Send, Zap, Brain, Gauge } from 'lucide-react'
import { useState } from 'react'

const models = [
  { name: 'cgpt', icon: Brain, color: 'bg-blue-500/20 text-blue-400' },
  { name: 'ollama', icon: Zap, color: 'bg-yellow-500/20 text-yellow-400' },
  { name: 'qwen', icon: Gauge, color: 'bg-purple-500/20 text-purple-400' },
]

export default function InputArea() {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      console.log('Sending:', input)
      setInput('')
    }
  }

  return (
    <div className="h-full flex flex-col p-6 gap-6">
      {/* Models/Responses with Icons */}
      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Response Providers
        </h2>
        <div className="flex flex-wrap gap-3">
          {models.map((model) => (
            <button
              key={model.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary transition-colors ${model.color} text-xs font-medium`}
            >
              <model.icon className="w-3.5 h-3.5" />
              {model.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area - ChatGPT Style */}
      <div className="flex-1 flex flex-col justify-end gap-2">
        <div className="rounded-lg border border-border bg-card hover:border-muted focus-within:border-primary/50 focus-within:shadow-lg transition-all shadow-sm p-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Type your response..."
            className="w-full outline-none resize-none bg-transparent text-sm text-foreground placeholder-muted-foreground max-h-40"
            rows={3}
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">Shift + Enter for new line</p>
            <button
              onClick={handleSend}
              className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

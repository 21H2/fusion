'use client'

import { TrendingUp, CheckCircle, AlertCircle, BarChart3, LineChart } from 'lucide-react'

export default function StatsPanel() {
  const stats = [
    { label: 'Avg Quality', value: '94%', icon: TrendingUp, color: 'from-emerald-500/20 to-emerald-500/10 text-emerald-400' },
    { label: 'Consensus', value: '87%', icon: CheckCircle, color: 'from-blue-500/20 to-blue-500/10 text-blue-400' },
    { label: 'Variance', value: '13%', icon: AlertCircle, color: 'from-amber-500/20 to-amber-500/10 text-amber-400' },
  ]

  return (
    <div className="h-full flex flex-col gap-4 p-6 overflow-hidden bg-gradient-to-br from-background via-background to-background/50">
      {/* Top Section - Stats/Visualization/Benchmark - 65% */}
      <div className="h-[65%] rounded-xl border border-border/50 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-5 overflow-hidden">
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <LineChart className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Performance Metrics & Benchmark</h3>
          </div>
          <BarChart3 className="w-4 h-4 text-muted-foreground/60" />
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-3 gap-3 flex-shrink-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl bg-gradient-to-br ${stat.color} p-4 border border-border/40 hover:border-primary/50 hover:shadow-md transition-all duration-200 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-background/40 backdrop-blur-sm">
                  <stat.icon className={`w-4 h-4 ${stat.color.split(' ')[2]}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground/80 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Chart Visualization Area */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Interactive Chart Placeholder */}
          <div className="flex-1 flex items-end justify-center gap-2 px-4 py-6 rounded-lg bg-background/50 border border-border/30 backdrop-blur-sm">
            {[40, 65, 85, 75, 90, 70, 88].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 h-full rounded-t-lg bg-gradient-to-t from-primary to-primary/50 hover:from-primary/90 hover:to-primary/60 transition-all duration-200 cursor-pointer group relative"
                style={{ height: `${height}%`, minHeight: '20px' }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {height}%
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Summary */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 bg-background/40 rounded-lg border border-border/30">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Response Time</p>
              <p className="text-sm font-semibold text-foreground">2.4s avg</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Model Count</p>
              <p className="text-sm font-semibold text-foreground">3 Active</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Success Rate</p>
              <p className="text-sm font-semibold text-foreground">99.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Fused Answer - 35% */}
      <div className="h-[35%] rounded-xl border border-border/50 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-3 overflow-hidden">
        <div className="flex items-center justify-between flex-shrink-0">
          <h3 className="text-sm font-bold text-foreground">Fused Answer</h3>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Live</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0">
          {/* Main Answer */}
          <p className="text-sm text-foreground/90 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-200">
            Fused answer synthesized from all model responses. This consensus output provides the most accurate and balanced result based on analyzing agreements and differences across all providers.
          </p>

          {/* Model Contributions Bar */}
          <div className="space-y-2 pt-2 border-t border-border/30">
            <p className="text-xs font-semibold text-muted-foreground/80">Model Consensus</p>
            <div className="space-y-1.5">
              {[
                { name: 'cgpt', width: 85, color: 'bg-blue-500/60' },
                { name: 'ollama', width: 80, color: 'bg-yellow-500/60' },
                { name: 'qwen', width: 75, color: 'bg-purple-500/60' },
              ].map((model) => (
                <div key={model.name} className="group">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs text-foreground/80 font-medium">{model.name}</span>
                    <span className="text-xs text-muted-foreground/60">{model.width}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-background/50 border border-border/30 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${model.color} transition-all duration-300 group-hover:shadow-lg`}
                      style={{ width: `${model.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

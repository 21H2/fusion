// components/charts.tsx
// ─── Recharts components — wired to SynthesisResult.chartData ─────
// Drop these into your stats-panel.tsx

"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint } from "@/lib/types";

// ─── Colour palette — amber accent matching your design ───────────
const MODEL_COLORS: Record<string, string> = {
  "GPT-4o":  "#f59e0b",   // amber-500
  "Claude":  "#d97706",   // amber-600
  "Gemini":  "#b45309",   // amber-700
  "Llama 3": "#92400e",   // amber-800
};

// ─── Radar chart: quality dimensions per model ────────────────────
interface QualityRadarProps {
  data: ChartDataPoint[];
}

export function QualityRadarChart({ data }: QualityRadarProps) {
  // Recharts RadarChart expects [{dimension, GPT-4o, Claude, ...}] format
  const dimensions = ["accuracy", "reasoning", "coherence", "grounding"] as const;

  const radarData = dimensions.map((dim) => {
    const point: Record<string, string | number> = {
      dimension: dim.charAt(0).toUpperCase() + dim.slice(1),
    };
    data.forEach((d) => {
      point[d.model] = d[dim];
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
        />
        {data.map((d) => (
          <Radar
            key={d.model}
            name={d.model}
            dataKey={d.model}
            stroke={MODEL_COLORS[d.model] ?? "#f59e0b"}
            fill={MODEL_COLORS[d.model] ?? "#f59e0b"}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Legend
          wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ─── Bar chart: latency comparison ───────────────────────────────
interface LatencyBarProps {
  data: ChartDataPoint[];
}

export function LatencyBarChart({ data }: LatencyBarProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="model"
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <YAxis
          unit="ms"
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v} ms`, "Latency"]}
        />
        <Bar
          dataKey="latency"
          radius={[4, 4, 0, 0]}
          fill="#f59e0b"
          opacity={0.85}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Bar chart: overall scores (consensus ranking) ────────────────
interface ScoreBarProps {
  data: ChartDataPoint[];
}

export function ScoreBarChart({ data }: ScoreBarProps) {
  const sorted = [...data].sort((a, b) => b.overall - a.overall);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 4, right: 24, left: 0, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="model"
          width={72}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(v: number) => [v, "Overall Score"]}
        />
        <Bar
          dataKey="overall"
          radius={[0, 4, 4, 0]}
          fill="#f59e0b"
          opacity={0.85}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

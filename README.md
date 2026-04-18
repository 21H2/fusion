# Fusion

**Multi-AI Response Comparator & Answer Synthesizer**

Fusion queries multiple AI models simultaneously (GPT-4o, Claude 3.5 Sonnet, Gemini 2.5 Pro, Llama 3), scores their responses across quality dimensions, and synthesizes the best answer — all in a single, elegant interface.

## Features

- **Multi-Model Comparison** — Query 4 leading AI models at once and see side-by-side results
- **Intelligent Scoring** — Automatic evaluation across accuracy, reasoning, coherence, grounding, and hallucination risk
- **Answer Synthesis** — Fused answer that combines the strongest elements from all models
- **Performance Metrics** — Real-time quality, consensus, and variance analytics
- **Benchmark Visualization** — Interactive trend charts and model consensus bars
- **Task Profiles** — Optimized scoring for general, coding, research, reasoning, and creative tasks
- **Dark & Light Mode** — Warm amber-accented palette across both themes
- **Responsive Layout** — Adaptive split-panel design for desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js](https://nextjs.org/) 16.2.0 |
| **React** | 19.x |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 4.2.0 |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Typography** | [Inter](https://rsms.me/inter/) via Google Fonts |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + Zod |
| **Charts** | [Recharts](https://recharts.org/) 2.15.0 |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Language** | TypeScript 5.7.3 |

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to use Fusion.

## Project Structure

```
fusion/
├── app/
│   ├── layout.tsx            # Root layout — Inter font, theme provider
│   ├── page.tsx              # Main page — sidebar + split panel layout
│   └── globals.css           # Design tokens — warm neutral + amber palette
├── components/
│   ├── ui/                   # Shadcn UI primitives (button, input, etc.)
│   ├── sidebar.tsx           # Collapsible navigation sidebar
│   ├── header.tsx            # Top bar — breadcrumbs, search, theme toggle
│   ├── input-area.tsx        # Prompt input, model pills, task selector
│   ├── stats-panel.tsx       # Metrics dashboard + fused answer display
│   └── theme-provider.tsx    # next-themes configuration
├── lib/
│   ├── engine.ts             # Multi-model comparison & scoring engine
│   └── utils.ts              # Utility helpers
├── hooks/                    # Custom React hooks
└── public/                   # Favicon & static assets
```

## How It Works

1. **Enter a prompt** in the input area on the left panel
2. **Select a task profile** (general, coding, research, reasoning, creative)
3. **Hit send** — Fusion queries all 4 models simultaneously
4. **View results** — The right panel shows:
   - Performance metrics (quality, consensus, variance)
   - Benchmark trend chart + consensus ranking
   - Synthesized fused answer
   - Raw responses from each model with individual scores

## Design

Fusion uses a warm neutral palette with amber/golden accents — deliberately avoiding the typical blue/purple "AI website" look. The design prioritizes readability, speed, and elegance.

- **Dark mode**: Deep charcoal with warm undertones
- **Light mode**: Warm cream/stone whites
- **Accent**: Amber/golden highlights

## License

MIT

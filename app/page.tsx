import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import InputArea from '@/components/input-area'
import StatsPanel from '@/components/stats-panel'

export default function Home() {
  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with breadcrumbs */}
        <Header />
        
        {/* Main content area - Responsive */}
        <div className="flex-1 flex overflow-hidden lg:flex-row flex-col">
          {/* Middle section - 40% on desktop, full on mobile */}
          <div className="w-full lg:w-[40%] flex flex-col border-r border-b lg:border-b-0 border-border/50 overflow-hidden">
            <InputArea />
          </div>
          {/* Right section - 60% on desktop, full on mobile */}
          <div className="w-full lg:w-[60%] flex flex-col overflow-hidden">
            <StatsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import {
  Menu,
  User,
  Home,
  Zap,
  History,
  Settings,
  HelpCircle,
  Plus,
  Layers,
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  const labelClass = `overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-200 ${
    isExpanded ? 'max-w-[140px] opacity-100 ml-3' : 'max-w-0 opacity-0 ml-0'
  }`

  const rowClass = 'justify-start gap-0 px-3 py-2.5'

  return (
    <div
      className={`border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out flex flex-col ${
        isExpanded ? 'w-60' : 'w-[60px]'
      }`}
    >
      {/* Header — Logo & Toggle */}
      <div className="flex items-center p-3 h-14">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
        <div className={`font-semibold text-sidebar-foreground flex items-center gap-2 text-[15px] tracking-tight ${labelClass}`}>
          <Layers className="w-[18px] h-[18px] text-primary" />
          <span>Fusion</span>
        </div>
      </div>

      {/* New Chat */}
      <div className="px-3 pt-1 pb-2">
        <button className={`flex items-center rounded-xl bg-primary/10 hover:bg-primary/[0.17] border border-primary/20 transition-all text-primary text-sm font-medium w-full ${rowClass}`}>
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span className={labelClass}>New Chat</span>
        </button>
      </div>

      {/* Separator */}
      <div className="mx-4 h-px bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-2 pt-3 overflow-y-auto">
        <div className="space-y-0.5">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Zap, label: 'Quick Compare', active: false },
            { icon: History, label: 'History', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center rounded-xl transition-colors w-full text-sm ${rowClass} ${
                item.active
                  ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className={labelClass}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Actions */}
        <div className="space-y-0.5">
          {[
            { icon: HelpCircle, label: 'Help' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center rounded-xl text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors w-full text-sm ${rowClass}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className={labelClass}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <button className={`w-full flex items-center rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${rowClass}`}>
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className={`flex-1 text-left ${labelClass}`}>
            <div>
              <p className="text-xs font-semibold">User</p>
              <p className="text-[10px] text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

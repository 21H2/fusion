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
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`border-r border-border bg-sidebar transition-all duration-300 flex flex-col ${
        isExpanded ? 'w-56' : 'w-16'
      }`}
    >
      {/* Header - Logo & Menu */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>
        {isExpanded && (
          <div className="text-sm font-semibold text-sidebar-foreground flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Fusion
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
        {/* New Conversation */}
        <button className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors text-sidebar-primary text-sm font-medium w-full">
          <Plus className="w-4 h-4 flex-shrink-0" />
          {isExpanded && <span>New Fusion</span>}
        </button>

        {/* Divider */}
        {isExpanded && <div className="h-px bg-sidebar-border my-2" />}

        {/* Navigation Items */}
        <div className="space-y-1">
          {[
            { icon: Home, label: 'Home', active: false },
            { icon: Zap, label: 'Quick Compare', active: false },
            { icon: History, label: 'History', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-sm ${
                item.active
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {isExpanded && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Divider */}
        {isExpanded && <div className="h-px bg-sidebar-border my-3" />}

        {/* Help & Settings */}
        <div className="space-y-1 mt-auto">
          {[
            { icon: HelpCircle, label: 'Help' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors w-full text-sm"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {isExpanded && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          {isExpanded && (
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold">User</p>
              <p className="text-xs text-sidebar-foreground/70">Profile</p>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

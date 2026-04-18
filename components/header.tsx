'use client'

import { ChevronRight, Search, Bell, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      html.classList.add('dark')
      localStorage.theme = 'dark'
    }
    setIsDark(!isDark)
  }

  if (!mounted) return null

  return (
    <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 gap-4">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <button className="text-sidebar-foreground hover:text-foreground transition-colors font-medium">
          Responses
        </button>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          New Fusion Session
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search models..."
            className="px-3 py-2 rounded-lg bg-background border border-border text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        </div>
        
        <button className="p-2 rounded-lg hover:bg-background transition-colors text-foreground relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>

        <div className="h-6 w-px bg-border" />

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-background transition-colors text-foreground"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

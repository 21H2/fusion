'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chrome, Lock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type GoogleAuthModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GoogleAuthModal({ open, onOpenChange }: GoogleAuthModalProps) {
  const [showAdmin, setShowAdmin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    try {
      await signIn('credentials', { 
        username, 
        password, 
        callbackUrl: '/',
        redirect: true 
      })
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-md border-border/80 bg-card/95 backdrop-blur-md"
      >
        <DialogHeader className="items-center text-center space-y-2">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm shadow-primary/10">
            <Lock className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl">
            {showAdmin ? 'System Administration' : 'Sign in to continue'}
          </DialogTitle>
          <DialogDescription className="max-w-sm text-sm">
            {showAdmin 
              ? 'Enter authorized system credentials to proceed.' 
              : 'Fusion requires a Google account before running model comparisons.'
            }
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!showAdmin ? (
            <motion.div 
              key="google"
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button className="w-full" size="lg" onClick={() => void signIn('google')}>
                <Chrome className="h-4 w-4 mr-2" />
                Sign in with Google
              </Button>
              
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest bg-card px-2 text-muted-foreground/40">Or Use Management</div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-border/40 hover:bg-muted/50" 
                size="lg" 
                onClick={() => setShowAdmin(true)}
              >
                Administrator Login
              </Button>
            </motion.div>
          ) : (
            <motion.form 
              key="admin"
              className="space-y-4"
              onSubmit={handleAdminLogin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                  className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="ghost" 
                  className="flex-1 rounded-xl" 
                  onClick={() => setShowAdmin(false)}
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className="flex-[2] rounded-xl" 
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Verifying...' : 'Login as Admin'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

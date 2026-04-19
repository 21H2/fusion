import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Development Access',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Admin emergency access
        if (credentials?.username === 'admin' && credentials?.password === '000000') {
          return {
            id: 'admin-001',
            name: 'Administrator',
            email: 'admin@fusion.ai',
            image: null,
          }
        }
        // Guest fallback for development
        if (credentials?.username === 'guest' || !credentials?.username) {
          return {
            id: 'guest',
            name: 'Guest User',
            email: 'guest@fusion.ai',
            image: null,
          }
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow all sign-ins in development
      return true
    },
  },
}

export const auth = () => getServerSession(authOptions)

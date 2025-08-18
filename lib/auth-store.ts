"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  username: string
  role: string
  email: string
  lastLogin: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  sessionExpiry: number | null
  loginAttempts: number
  lastAttempt: number | null
  // Actions
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkSession: () => boolean
  resetLoginAttempts: () => void
}

// Simulated user database
const USERS = [
  {
    id: "1",
    username: "admin",
    password: "aurarise2024",
    role: "Administrator",
    email: "admin@kekebtech.com",
  },
  {
    id: "2",
    username: "manager",
    password: "manager123",
    role: "Content Manager",
    email: "manager@kekebtech.com",
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      sessionExpiry: null,
      loginAttempts: 0,
      lastAttempt: null,

      login: async (username: string, password: string) => {
        const state = get()
        const now = Date.now()

        // Check for too many attempts
        if (state.loginAttempts >= 5 && state.lastAttempt && now - state.lastAttempt < 15 * 60 * 1000) {
          throw new Error("Too many login attempts. Please try again in 15 minutes.")
        }

        // Find user
        const user = USERS.find((u) => u.username === username && u.password === password)

        if (!user) {
          set({
            loginAttempts: state.loginAttempts + 1,
            lastAttempt: now,
          })
          return false
        }

        // Successful login
        const sessionExpiry = now + 8 * 60 * 60 * 1000 // 8 hours
        set({
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            lastLogin: new Date().toISOString(),
          },
          isAuthenticated: true,
          sessionExpiry,
          loginAttempts: 0,
          lastAttempt: null,
        })

        return true
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          sessionExpiry: null,
        })
      },

      checkSession: () => {
        const state = get()
        if (!state.isAuthenticated || !state.sessionExpiry) {
          return false
        }

        if (Date.now() > state.sessionExpiry) {
          get().logout()
          return false
        }

        return true
      },

      resetLoginAttempts: () => {
        set({
          loginAttempts: 0,
          lastAttempt: null,
        })
      },
    }),
    {
      name: "kekeb-auth-storage",
    },
  ),
)

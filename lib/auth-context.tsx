"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  userRole: "user" | "admin"
  login: (role: "user" | "admin") => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"user" | "admin">("user")

  const login = (role: "user" | "admin") => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole("user")
  }

  return <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

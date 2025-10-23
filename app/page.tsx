"use client"

import { useState } from "react"
import AuthPage from "@/components/auth/auth-page"
import Dashboard from "@/components/dashboard/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"user" | "admin">("user")

  const handleLogin = (role: "user" | "admin") => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole("user")
  }

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />
  }

  return <Dashboard userRole={userRole} onLogout={handleLogout} />
}

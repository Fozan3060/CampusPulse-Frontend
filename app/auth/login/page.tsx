"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import AuthPage from "@/components/auth/auth-page"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (role: "user" | "admin") => {
    login(role)
    router.push("/dashboard")
  }

  return <AuthPage onLogin={handleLogin} />
}

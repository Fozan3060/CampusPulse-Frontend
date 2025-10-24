"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleSignup = () => {
    setIsLogin(true)
  }

  const handleSignup = () => {
    setIsLogin(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
            <span className="text-2xl font-bold text-primary-foreground">CP</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            CampusPulse
          </h1>
          <p className="text-muted-foreground">Your campus events hub</p>
        </div>

        {/* Auth Forms */}
        <div className="bg-card rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm p-8 animate-slide-up">
          {isLogin ? <LoginForm /> : <SignupForm onSignup={handleSignup} />}

          {/* Toggle between login and signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-primary hover:text-secondary transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>

        {/* Demo info */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Demo: Use any email/password to test</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const { register, isLoading, error, clearError } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setSuccessMessage("")

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const success = await register(formData.username, formData.email, formData.password)
      if (success) {
        setSuccessMessage("Account created successfully! Redirecting to login...")
          router.push("/auth/login")
      }
    } catch (err) {
      console.error("Signup error:", err)
    }
  }

  return (
    
    <form  onSubmit={handleSubmit} className="space-y-4 max-w-120 m-auto bg-card rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm p-8 animate-slide-up mt-20">
      <h2 className="text-2xl font-bold mb-6">Create your account</h2>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">{error}</div>
      )}

      {successMessage && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
          {successMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@campus.edu"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg transition-all disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Sign up"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline font-semibold">
          Login here
        </Link>
      </p>
    </form>
  )
}

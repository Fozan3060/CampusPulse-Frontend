"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navigation from "@/components/dashboard/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 1. Get both isAuthenticated AND isLoading from the auth context
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 2. Only run the check when loading is complete
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, router]) // 3. Add isLoading to the dependencies

  // 4. While the authentication is being checked, show a loading message
  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading session...</p>
        </div>
    )
  }

  // 5. If loading is done and the user is authenticated, show the page
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">{children}</main>
      </div>
    )
  }

  // If not loading and not authenticated, the redirect is happening.
  // Return null to prevent any content from flashing.
  return null
}

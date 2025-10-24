"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AdminDashboard from "@/components/dashboard/admin-dashboard"

export default function AdminPage() {
  const { userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userRole !== "admin") {
      router.push("/dashboard/events")
    }
  }, [userRole, router])

  if (userRole !== "admin") {
    return null
  }

  return <AdminDashboard />
}

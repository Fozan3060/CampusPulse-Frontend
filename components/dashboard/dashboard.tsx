"use client"

import { useState } from "react"
import Navigation from "./navigation"
import EventsPage from "./events-page"
import AdminDashboard from "./admin-dashboard"
import FeedbackPage from "./feedback-page"

interface DashboardProps {
  userRole: "user" | "admin"
  onLogout: () => void
}

export default function Dashboard({ userRole, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<"events" | "admin" | "feedback">("events")

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={userRole} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} />

      <main className="pt-20">
        {currentPage === "events" && <EventsPage />}
        {currentPage === "admin" && userRole === "admin" && <AdminDashboard />}
        {currentPage === "feedback" && <FeedbackPage />}
      </main>
    </div>
  )
}

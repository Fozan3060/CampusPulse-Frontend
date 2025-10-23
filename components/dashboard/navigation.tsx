"use client"

import { useState } from "react"

interface NavigationProps {
  userRole: "user" | "admin"
  currentPage: "events" | "admin" | "feedback"
  onPageChange: (page: "events" | "admin" | "feedback") => void
  onLogout: () => void
}

export default function Navigation({ userRole, currentPage, onPageChange, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">CP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CampusPulse
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onPageChange("events")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === "events" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              Events
            </button>
            {userRole === "admin" && (
              <button
                onClick={() => onPageChange("admin")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === "admin" ? "bg-secondary text-secondary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                Admin
              </button>
            )}
            <button
              onClick={() => onPageChange("feedback")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === "feedback" ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              Feedback
            </button>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                U
              </div>
              <span className="text-sm font-medium">{userRole === "admin" ? "Admin" : "Student"}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 font-medium transition-all text-sm"
            >
              Logout
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => {
                onPageChange("events")
                setIsMobileMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === "events" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              Events
            </button>
            {userRole === "admin" && (
              <button
                onClick={() => {
                  onPageChange("admin")
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === "admin" ? "bg-secondary text-secondary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                Admin Dashboard
              </button>
            )}
            <button
              onClick={() => {
                onPageChange("feedback")
                setIsMobileMenuOpen(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === "feedback" ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              Feedback
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

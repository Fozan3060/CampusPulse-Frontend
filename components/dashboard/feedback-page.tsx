"use client"

import { useState } from "react"
import FeedbackForm from "./feedback-form"
import FeedbackList from "./feedback-list"

interface Feedback {
  id: string
  name: string
  email: string
  rating: number
  message: string
  date: string
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@campus.edu",
      rating: 5,
      message: "Amazing event! The organization was perfect and I learned so much.",
      date: "March 16, 2025",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@campus.edu",
      rating: 4,
      message: "Great event overall. Would love more networking opportunities.",
      date: "March 15, 2025",
    },
  ])

  const handleAddFeedback = (newFeedback: Omit<Feedback, "id" | "date">) => {
    const feedback: Feedback = {
      ...newFeedback,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    }
    setFeedbacks([feedback, ...feedbacks])
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold mb-2">Feedback</h1>
        <p className="text-muted-foreground">Share your thoughts about our events</p>
      </div>

      {/* Feedback Form */}
      <div className="mb-12 animate-slide-up">
        <FeedbackForm onSubmit={handleAddFeedback} />
      </div>

      {/* Feedback List */}
      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold mb-6">Recent Feedback</h2>
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </div>
  )
}

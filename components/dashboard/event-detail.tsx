"use client"

import { useState } from "react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  organizer: string
  description: string
  image: string
  deadline: string
  category: string
}

interface EventDetailProps {
  event: Event
  onBack: () => void
}

export default function EventDetail({ event, onBack }: EventDetailProps) {
  const [isRegistered, setIsRegistered] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Events
      </button>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xl">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden bg-muted">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">DATE & TIME</h3>
              <p className="text-lg font-medium">{event.date}</p>
              <p className="text-muted-foreground">{event.time}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">LOCATION</h3>
              <p className="text-lg font-medium">{event.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">ORGANIZER</h3>
              <p className="text-lg font-medium">{event.organizer}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">REGISTRATION DEADLINE</h3>
              <p className="text-lg font-medium">{event.deadline}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Registration Button */}
          <button
            onClick={() => setIsRegistered(!isRegistered)}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
              isRegistered
                ? "bg-muted text-foreground hover:bg-muted/80"
                : "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg"
            }`}
          >
            {isRegistered ? "✓ Registered" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  )
}

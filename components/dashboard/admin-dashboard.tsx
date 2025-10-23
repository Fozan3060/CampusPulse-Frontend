"use client"

import { useState } from "react"
import EventForm from "./event-form"
import EventsList from "./events-list"

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

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Tech Summit 2025",
      date: "March 15, 2025",
      time: "10:00 AM",
      location: "Main Auditorium",
      organizer: "Tech Club",
      description: "Join us for an exciting tech summit featuring industry leaders.",
      image: "/tech-conference.png",
      deadline: "March 10, 2025",
      category: "Technology",
    },
  ])
  const [showForm, setShowForm] = useState(false)

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    }
    setEvents([...events, event])
    setShowForm(false)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage campus events</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-semibold hover:shadow-lg transition-all"
        >
          {showForm ? "Cancel" : "+ Add Event"}
        </button>
      </div>

      {/* Event Form */}
      {showForm && (
        <div className="mb-8 animate-slide-up">
          <EventForm onSubmit={handleAddEvent} />
        </div>
      )}

      {/* Events List */}
      <div className="animate-slide-up">
        <EventsList events={events} onDelete={handleDeleteEvent} />
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import EventCard from "./event-card"
import EventDetail from "./event-detail"

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

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Summit 2025",
    date: "March 15, 2025",
    time: "10:00 AM",
    location: "Main Auditorium",
    organizer: "Tech Club",
    description:
      "Join us for an exciting tech summit featuring industry leaders discussing the future of AI and web development.",
    image: "/tech-conference-stage-with-blue-lighting.jpg",
    deadline: "March 10, 2025",
    category: "Technology",
  },
  {
    id: "2",
    title: "Music Festival",
    date: "March 20, 2025",
    time: "6:00 PM",
    location: "Campus Grounds",
    organizer: "Music Society",
    description: "Experience live performances from talented campus musicians and guest artists.",
    image: "/music-festival-stage-with-colorful-lights.jpg",
    deadline: "March 18, 2025",
    category: "Entertainment",
  },
  {
    id: "3",
    title: "Sports Championship",
    date: "March 25, 2025",
    time: "2:00 PM",
    location: "Sports Complex",
    organizer: "Sports Department",
    description: "Annual inter-college sports championship featuring multiple sports competitions.",
    image: "/sports-stadium-with-athletes.jpg",
    deadline: "March 22, 2025",
    category: "Sports",
  },
  {
    id: "4",
    title: "Art Exhibition",
    date: "March 28, 2025",
    time: "11:00 AM",
    location: "Art Gallery",
    organizer: "Art Club",
    description: "Showcase of contemporary art works by talented student artists.",
    image: "/modern-art-gallery.png",
    deadline: "March 26, 2025",
    category: "Arts",
  },
  {
    id: "5",
    title: "Startup Pitch Night",
    date: "April 2, 2025",
    time: "7:00 PM",
    location: "Innovation Hub",
    organizer: "Entrepreneurship Club",
    description: "Watch student startups pitch their ideas to investors and mentors.",
    image: "/startup-pitch-presentation-stage.jpg",
    deadline: "March 30, 2025",
    category: "Business",
  },
  {
    id: "6",
    title: "Hackathon 2025",
    date: "April 5-7, 2025",
    time: "9:00 AM",
    location: "Tech Building",
    organizer: "Developer Community",
    description: "48-hour hackathon with prizes and mentorship from industry professionals.",
    image: "/hackathon-coding-competition.jpg",
    deadline: "April 1, 2025",
    category: "Technology",
  },
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", "Technology", "Entertainment", "Sports", "Arts", "Business"]

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
        <p className="text-muted-foreground">Find and join amazing campus events</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 animate-slide-up">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 animate-slide-up">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <div key={event.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up flex justify-center">
            <EventCard event={event} onClick={() => setSelectedEvent(event)} />
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No events found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}

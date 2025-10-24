"use client"

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

interface EventCardProps {
  event: Event
  onClick: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <button
      onClick={onClick}
      className="group h-full w-full max-w-120 max text-left bg-card rounded-xl border border-border hover:border-primary/50 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{event.date}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="truncate">{event.organizer}</span>
        </div>
      </div>
    </button>
  )
}

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

interface EventsListProps {
  events: Event[]
  onDelete: (id: string) => void
}

export default function EventsList({ events, onDelete }: EventsListProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Event</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Organizer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className={`border-b border-border ${index % 2 === 0 ? "bg-background" : ""}`}>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.category}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{event.date}</td>
                <td className="px-6 py-4 text-sm">{event.location}</td>
                <td className="px-6 py-4 text-sm">{event.organizer}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(event.id)}
                    className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 text-sm font-medium transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events created yet. Create your first event!</p>
        </div>
      )}
    </div>
  )
}

"use client"

interface Feedback {
  id: string
  name: string
  email: string
  rating: number
  message: string
  date: string
}

interface FeedbackListProps {
  feedbacks: Feedback[]
}

export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <div className="space-y-4">
      {feedbacks.map((feedback, index) => (
        <div
          key={feedback.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="bg-card rounded-xl border border-border p-6 animate-slide-up"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{feedback.name}</h3>
              <p className="text-sm text-muted-foreground">{feedback.email}</p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < feedback.rating ? "text-yellow-400" : "text-muted"}`}>
                  ★
                </span>
              ))}
            </div>
          </div>

          <p className="text-foreground mb-3">{feedback.message}</p>

          <p className="text-xs text-muted-foreground">{feedback.date}</p>
        </div>
      ))}

      {feedbacks.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">No feedback yet. Be the first to share!</p>
        </div>
      )}
    </div>
  )
}

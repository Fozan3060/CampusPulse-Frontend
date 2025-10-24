"use client"
import EventDetail from "@/components/dashboard/event-detail"
import { useParams } from "next/navigation"

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string

  return <EventDetail eventId={eventId} />
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventTable } from "@/features/events/components/event-table"
import { useEventsStore } from "@/store/events.store"

export function MitraEventsPage() {
  const events = useEventsStore((s) => s.events)
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Kelola Event</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-ink-soft">Daftar Event ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <EventTable events={events} onEdit={() => {}} />
        </CardContent>
      </Card>
    </div>
  )
}
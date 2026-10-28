import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventTable } from "@/features/events/components/event-table"
import { EventForm } from "@/features/events/components/event-form"
import { useEventsStore } from "@/store/events.store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function MitraEventsPage() {
  const events = useEventsStore((s) => s.events)
  const updateEvent = useEventsStore((s) => s.updateEvent)
  const [editingEvent, setEditingEvent] = useState<any>(null)

  const handleEdit = (event: any) => {
    setEditingEvent(event)
  }

  const handleSave = (data: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data)
    }
    setEditingEvent(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Kelola Event</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-ink-soft">Daftar Event ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <EventTable events={events} onEdit={handleEdit} />
        </CardContent>
      </Card>

      <Dialog open={!!editingEvent} onOpenChange={(open) => !open && setEditingEvent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <EventForm
              initialData={editingEvent}
              onSubmit={handleSave}
              onCancel={() => setEditingEvent(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
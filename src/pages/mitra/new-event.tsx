import { Card, CardContent } from "@/components/ui/card"
import { EventForm } from "@/features/events/components/event-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function MitraNewEventPage() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Buat Event Baru</h1>
      <Card>
        <CardContent className="p-6">
          <EventForm
            onSubmit={() => {
              setSubmitted(true)
              setTimeout(() => navigate("/mitra"), 1000)
            }}
            onCancel={() => navigate("/mitra")}
          />
          {submitted && (
            <p className="text-sm text-success mt-4">Event berhasil dibuat!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
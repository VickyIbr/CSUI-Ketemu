import { useEventsStore } from "@/store/events.store"
import { useOrdersStore } from "@/store/orders.store"
import { usersSeed } from "@/features/profile/data/users.seed"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ParticipantsPage() {
  const events = useEventsStore((s) => s.events)
  const orders = useOrdersStore((s) => s.orders)

  const participants = orders
    .filter((o) => o.status === "paid")
    .map((o) => {
      const event = events.find((e) => e.id === o.eventId)
      const user = usersSeed.find((u) => u.id === o.userId)
      return { order: o, event, user }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">Daftar Peserta</h1>

      <div className="space-y-3">
        {participants.length === 0 ? (
          <p className="text-ink-soft text-center py-8">Belum ada peserta terdaftar</p>
        ) : (
          participants.map(({ order, event, user }) => (
            <Card key={order.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-ink">{user?.name || "User"}</p>
                  <p className="text-sm text-ink-soft">{event?.title || "Event"}</p>
                  <p className="text-xs text-ink-soft">
                    {order.quantity} tiket • {order.status}
                  </p>
                </div>
                <Badge variant={order.status === "paid" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

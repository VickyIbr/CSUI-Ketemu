import { useOrdersStore } from "@/store/orders.store"
import { useEventsStore } from "@/store/events.store"
import { ETicket } from "@/features/checkout/components/e-ticket"

export default function TicketsPage() {
  const orders = useOrdersStore((s) => s.orders)
  const events = useEventsStore((s) => s.events)

  const paidOrders = orders.filter((o) => o.status === "paid")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">Tiket Saya</h1>

      {paidOrders.length === 0 ? (
        <p className="text-ink-soft text-center py-8">Belum ada tiket aktif</p>
      ) : (
        <div className="space-y-6">
          {paidOrders.map((order) => {
            const event = events.find((e) => e.id === order.eventId)
            return (
              <ETicket
                key={order.id}
                orderId={order.id}
                eventTitle={event?.title || "Event"}
                eventDate={event?.startDate || ""}
                location={event?.location || ""}
                participantName="User"
                quantity={order.quantity}
                total={order.totalAmount}
                status="paid"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePartnersStore } from "@/store/partners.store"
import { useOrdersStore } from "@/store/orders.store"
import { useEventsStore } from "@/store/events.store"
import { formatIDR } from "@/lib/format"

export function PartnerDashboardPage() {
  const partners = usePartnersStore((s) => s.partners)
  const events = useEventsStore((s) => s.events)
  const orders = useOrdersStore((s) => s.orders)

  // Demo: show first partner's dashboard
  const partner = partners[0]
  const partnerEvents = events.filter((e) => e.partnerId === partner?.id)
  const partnerOrders = orders.filter((o) => {
    const ev = events.find((e) => e.id === o.eventId)
    return ev?.partnerId === partner?.id
  })

  const totalRevenue = partnerOrders.reduce((sum, o) => sum + o.totalAmount, 0)
  const totalCommission = partnerOrders.reduce((sum, o) => sum + o.commission, 0)

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Dashboard Mitra</h1>
          <p className="mt-1 text-ink-soft">{partner?.name}</p>
        </div>
        <Button asChild>
          <Link to="/mitra/new-event">Buat Event Baru</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-ink-soft">Total Event</p>
            <p className="text-2xl font-bold text-ink">{partnerEvents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-ink-soft">Total Pesanan</p>
            <p className="text-2xl font-bold text-ink">{partnerOrders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-ink-soft">Total Pendapatan</p>
            <p className="text-2xl font-bold text-ink">{formatIDR(totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-ink-soft">Komisi (5%)</p>
            <p className="text-2xl font-bold text-ink">{formatIDR(totalCommission)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Events list */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink">Event Saya</h2>
        <div className="mt-4 space-y-3">
          {partnerEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <p className="font-medium text-ink">{event.title}</p>
                  <p className="text-sm text-ink-soft">{event.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-ink">{event.isFree || event.price === 0 ? "Gratis" : formatIDR(event.price)}</p>
                  <Badge variant={event.status === "published" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink">Pesanan Terbaru</h2>
        <div className="mt-4 space-y-3">
          {partnerOrders.slice(0, 5).map((order) => {
            const event = events.find((e) => e.id === order.eventId)
            return (
              <Card key={order.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-ink">{event?.title ?? "Event"}</p>
                    <p className="text-sm text-ink-soft">
                      {order.quantity} tiket • {order.status}
                    </p>
                  </div>
                  <p className="font-bold text-ink">{formatIDR(order.totalAmount)}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
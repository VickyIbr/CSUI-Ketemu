import { useOrdersStore } from "@/store/orders.store"
import { useEventsStore } from "@/store/events.store"
import { usePartnersStore } from "@/store/partners.store"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatIDR, formatDateLong } from "@/lib/format"

const statusColors: Record<string, string> = {
  pending: "pending",
  waiting_verification: "pending",
  paid: "verified",
  expired: "danger",
  cancelled: "danger",
}

const statusLabels: Record<string, string> = {
  pending: "Menunggu",
  waiting_verification: "Menunggu Verifikasi",
  paid: "Dibayar",
  expired: "Kadaluarsa",
  cancelled: "Dibatalkan",
}

export function OrderHistoryPage() {
  const orders = useOrdersStore((s) => s.orders)
  const getEventById = useEventsStore((s) => s.getEventById)
  const getPartnerById = usePartnersStore((s) => s.getPartnerById)

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <h1 className="text-3xl font-bold text-ink">Riwayat Pesanan</h1>
      <p className="mt-1 text-ink-soft">{orders.length} pesanan</p>

      <div className="mt-8 space-y-4">
        {orders.map((order) => {
          const event = getEventById(order.eventId)
          const partner = event ? getPartnerById(event.partnerId) : undefined
          return (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-ink">{event?.title ?? "Event"}</p>
                    <p className="text-sm text-ink-soft">
                      {partner?.name} • {formatDateLong(order.createdAt)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusColors[order.status] as any}>
                        {statusLabels[order.status] ?? order.status}
                      </Badge>
                      {order.paymentProof && (
                        <span className="text-xs text-ink-soft">Bukti diupload</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-ink">
                      {formatIDR(order.totalAmount)}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {order.quantity} x {formatIDR(event?.price ?? 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {orders.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-lg text-ink-soft">Belum ada pesanan</p>
            <p className="mt-1 text-sm text-ink-soft">
              Jelajahi event dan lakukan pemesanan
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
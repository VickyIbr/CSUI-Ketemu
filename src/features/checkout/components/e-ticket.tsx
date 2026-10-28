import { Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatIDR, formatDateLong } from "@/lib/format"

interface ETicketProps {
  orderId: string
  eventTitle: string
  eventDate: string
  location: string
  participantName: string
  quantity: number
  total: number
  status: "paid" | "pending" | "expired"
  onReview?: () => void
}

export function ETicket({
  orderId,
  eventTitle,
  eventDate,
  location,
  participantName,
  quantity,
  total,
  status,
  onReview,
}: ETicketProps) {
  const statusColors = {
    paid: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    expired: "bg-danger/10 text-danger border-danger/20",
  }

  const statusLabels = {
    paid: "Lunas",
    pending: "Menunggu Pembayaran",
    expired: "Kedaluwarsa",
  }

  return (
    <div className="max-w-md mx-auto">
      <div
        id="e-ticket"
        className="border-2 border-line rounded-xl overflow-hidden bg-paper"
      >
        <div className="bg-ink text-paper px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Ketemu</h2>
            <span className={`text-xs px-2 py-1 rounded border ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          <p className="text-xs text-paper/70 mt-1">E-Ticket Digital</p>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <p className="text-sm text-ink-soft">Order ID</p>
            <p className="font-mono font-bold text-ink">{orderId}</p>
          </div>

          <div>
            <p className="text-sm text-ink-soft">Event</p>
            <p className="font-bold text-ink">{eventTitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-ink-soft">Tanggal</p>
              <p className="font-medium text-ink">{formatDateLong(eventDate)}</p>
            </div>
            <div>
              <p className="text-sm text-ink-soft">Lokasi</p>
              <p className="font-medium text-ink">{location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-ink-soft">Peserta</p>
              <p className="font-medium text-ink">{participantName}</p>
            </div>
            <div>
              <p className="text-sm text-ink-soft">Jumlah</p>
              <p className="font-medium text-ink">{quantity} tiket</p>
            </div>
          </div>

          <div className="border-t border-line pt-4">
            <div className="flex justify-between">
              <span className="font-medium text-ink">Total</span>
              <span className="font-bold text-ink">{formatIDR(total)}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-muted/30 border-t border-line">
          <p className="text-xs text-ink-soft text-center">
            Tunjukkan tiket ini saat check-in event
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => window.print()}
        >
          <Printer size={16} className="mr-2" />
          Cetak
        </Button>
        <Button variant="secondary" className="flex-1">
          <Share2 size={16} className="mr-2" />
          Bagikan
        </Button>
      </div>

      {status === "paid" && onReview && (
        <Button variant="default" className="w-full mt-2" onClick={onReview}>
          Beri Ulasan
        </Button>
      )}
    </div>
  )
}

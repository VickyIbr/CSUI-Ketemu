import { formatIDR } from "@/lib/format"

interface CommissionBreakdownProps {
  subtotal: number
  biayaLayanan: number
  total: number
  commission: number
  netMitra: number
}

export function CommissionBreakdown({
  subtotal,
  biayaLayanan,
  total,
  commission,
  netMitra,
}: CommissionBreakdownProps) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-ink-soft">Subtotal</span>
        <span className="text-ink">{formatIDR(subtotal)}</span>
      </div>
      {biayaLayanan > 0 && (
        <div className="flex justify-between">
          <span className="text-ink-soft">Biaya Layanan</span>
          <span className="text-ink">{formatIDR(biayaLayanan)}</span>
        </div>
      )}
      <div className="flex justify-between font-medium">
        <span className="text-ink">Total</span>
        <span className="text-ink">{formatIDR(total)}</span>
      </div>
      <div className="flex justify-between text-ink-soft">
        <span>Komisi (5%)</span>
        <span>{formatIDR(commission)}</span>
      </div>
      <div className="flex justify-between text-success font-medium">
        <span>Netto Mitra</span>
        <span>{formatIDR(netMitra)}</span>
      </div>
    </div>
  )
}

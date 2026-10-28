import { formatCurrency } from "@/lib/format"

interface CommissionBreakdownProps {
  subtotal: number
  biayaLayanan: number
  total: number
  komisi: number
  netMitra: number
}

export function CommissionBreakdown({
  subtotal,
  biayaLayanan,
  total,
  komisi,
  netMitra,
}: CommissionBreakdownProps) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-ink-soft">Subtotal</span>
        <span className="font-mono text-ink">{formatCurrency(subtotal)}</span>
      </div>
      {biayaLayanan > 0 && (
        <div className="flex justify-between">
          <span className="text-ink-soft">Biaya Layanan</span>
          <span className="font-mono text-ink">{formatCurrency(biayaLayanan)}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-line pt-2">
        <span className="font-medium text-ink">Total</span>
        <span className="font-mono font-bold text-ink">{formatCurrency(total)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-ink-soft">Komisi (5%)</span>
        <span className="font-mono text-ink-soft">{formatCurrency(komisi)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-ink-soft">Net Mitra</span>
        <span className="font-mono text-ink-soft">{formatCurrency(netMitra)}</span>
      </div>
    </div>
  )
}
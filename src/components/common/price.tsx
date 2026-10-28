import { formatIDR } from "@/lib/format"

interface PriceProps {
  amount: number
  showLabel?: boolean
}

export function Price({ amount, showLabel = true }: PriceProps) {
  return (
    <div>
      {showLabel && <span className="text-sm text-ink-soft">Harga</span>}
      <span className="font-bold text-ink">{formatIDR(amount)}</span>
    </div>
  )
}

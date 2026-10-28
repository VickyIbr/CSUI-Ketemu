import { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | ReactNode
  hint?: string
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-5">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-2 text-xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
    </div>
  )
}

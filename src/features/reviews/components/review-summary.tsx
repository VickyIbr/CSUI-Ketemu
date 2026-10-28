interface ReviewSummaryProps {
  average: number
  total: number
  distribution: Record<number, number>
}

export function ReviewSummary({ average, total, distribution }: ReviewSummaryProps) {
  const max = Math.max(...Object.values(distribution))

  return (
    <div className="flex gap-6">
      <div className="text-center">
        <p className="text-4xl font-bold text-ink">{average.toFixed(1)}</p>
        <p className="text-sm text-ink-soft">{total} ulasan</p>
      </div>
      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] || 0
          const pct = max > 0 ? (count / max) * 100 : 0
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-3 text-sm text-ink-soft">{star}</span>
              <div className="h-2 flex-1 rounded-full bg-paper-2">
                <div
                  className="h-full rounded-full bg-highlighter"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm text-ink-soft">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
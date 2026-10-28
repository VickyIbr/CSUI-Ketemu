import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface CountdownProps {
  expiresAt: string
  onExpired?: () => void
}

export function Countdown({ expiresAt, onExpired }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const expiry = new Date(expiresAt).getTime()
      const diff = Math.max(0, Math.floor((expiry - now) / 1000))
      setTimeLeft(diff)
      if (diff === 0 && onExpired) onExpired()
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expiresAt, onExpired])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (timeLeft <= 0) {
    return (
      <div className="flex items-center gap-2 text-danger">
        <Clock size={16} />
        <span className="font-mono text-sm">Waktu habis</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-ink">
      <Clock size={16} />
      <span className="font-mono text-sm">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}

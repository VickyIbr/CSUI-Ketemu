import { CheckCircle } from "lucide-react"

interface VerifiedBadgeProps {
  className?: string
}

export function VerifiedBadge({ className = "" }: VerifiedBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success ${className}`}>
      <CheckCircle size={12} />
      Terverifikasi
    </span>
  )
}

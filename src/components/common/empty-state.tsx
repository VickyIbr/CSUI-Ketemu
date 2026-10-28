import { ReactNode } from "react"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-muted/30 py-12 px-4 text-center">
      {icon && <div className="text-muted-foreground mb-3">{icon}</div>}
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
      {action}
    </div>
  )
}

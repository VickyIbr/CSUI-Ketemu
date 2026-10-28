import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  ariaLabel?: string
}

export function Section({ children, className = "", id, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-16 ${className}`}
    >
      {children}
    </section>
  )
}

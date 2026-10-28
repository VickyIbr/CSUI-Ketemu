import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`
}

export function formatDateLong(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatDateRelative(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Hari ini"
  } else if (diffDays === 1) {
    return "Kemarin"
  } else if (diffDays < 7) {
    return `${diffDays} hari yang lalu`
  } else {
    return formatDateShort(d)
  }
}

export function padNumber(num: number, size: number = 2): string {
  return num.toString().padStart(size, "0")
}

export function calculateRating(recent: number, older: number, oldest: number): { avg: number; count: number } {
  const sum = recent * 5 + older * 3 + oldest * 1
  const count = recent + older + oldest
  return count > 0 ? { avg: sum / count, count } : { avg: 0, count: 0 }
}
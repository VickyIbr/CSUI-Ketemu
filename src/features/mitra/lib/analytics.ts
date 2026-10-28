import { Event } from "@/features/events/types"
import { Booking } from "@/features/checkout/types"

export interface DateRange {
  from: string
  to: string
}

export interface MitraAnalytics {
  totalRegistrants: number
  totalGross: number
  totalCommission: number
  totalNet: number
  conversionRate: number
  topEvent: string | null
  monthlyTrend: { month: string; gross: number; registrants: number }[]
}

const COMMISSION_RATE = 0.05

export function calculateMitraAnalytics(
  events: Event[],
  bookings: Booking[],
  dateRange?: DateRange
): MitraAnalytics {
  const filteredEvents = dateRange
    ? events.filter((e) => {
        const d = new Date(e.startDate)
        return d >= new Date(dateRange.from) && d <= new Date(dateRange.to)
      })
    : events

  const filteredBookings = dateRange
    ? bookings.filter((b) => {
        const d = new Date(b.createdAt)
        return d >= new Date(dateRange.from) && d <= new Date(dateRange.to)
      })
    : bookings

  const totalRegistrants = filteredBookings.reduce((sum, b) => sum + (b.quantity || 0), 0)
  const totalGross = filteredBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
  const totalCommission = Math.round(totalGross * COMMISSION_RATE)
  const totalNet = totalGross - totalCommission
  const totalQuota = filteredEvents.reduce((sum, e) => sum + e.quota, 0)
  const conversionRate = totalQuota > 0 ? (totalRegistrants / totalQuota) * 100 : 0

  const topEventEntry = filteredBookings.reduce(
    (acc, b) => {
      const key = b.eventId
      if (!acc[key]) acc[key] = 0
      acc[key] += b.quantity || 0
      return acc
    },
    {} as Record<string, number>
  )
  const topEventId = Object.entries(topEventEntry).sort((a, b) => b[1] - a[1])[0]?.[0]
  const topEvent = topEventId
    ? filteredEvents.find((e) => e.id === topEventId)?.title || null
    : null

  const monthlyMap = new Map<string, { gross: number; registrants: number }>()
  for (const b of filteredBookings) {
    const month = new Date(b.createdAt).toLocaleDateString("id-ID", { month: "short", year: "numeric" })
    const existing = monthlyMap.get(month) || { gross: 0, registrants: 0 }
    monthlyMap.set(month, {
      gross: existing.gross + (b.totalAmount || 0),
      registrants: existing.registrants + (b.quantity || 0),
    })
  }
  const monthlyTrend = Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    gross: data.gross,
    registrants: data.registrants,
  }))

  return {
    totalRegistrants,
    totalGross,
    totalCommission,
    totalNet,
    conversionRate,
    topEvent,
    monthlyTrend,
  }
}

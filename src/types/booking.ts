export interface Booking {
  id: string
  userId: string
  eventId: string
  eventTitle: string
  eventSlug: string
  qty: number
  total: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  paymentStatus: "pending" | "verified" | "rejected"
  proofUrl?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BookingInput {
  eventId: string
  qty: number
  notes?: string
}
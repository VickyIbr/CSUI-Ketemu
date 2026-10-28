export type BookingStatus = "pending" | "waiting_verification" | "paid" | "expired" | "cancelled"

export interface PaymentProof {
  uploadedAt: string
  fileUrl: string
  fileName: string
}

export interface Booking {
  id: string
  eventId: string
  userId: string
  status: BookingStatus
  quantity: number
  totalAmount: number
  commission: number
  createdAt: string
  expiresAt: string
  paymentProof: PaymentProof | null
  paidAt: string | null
}
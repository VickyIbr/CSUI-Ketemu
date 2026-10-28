import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Booking } from "@/types"

interface BookingState {
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, data: Partial<Booking>) => void
  getBooking: (id: string) => Booking | undefined
  getUserBookings: (userId: string) => Booking[]
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],

      addBooking: (booking: Booking) => {
        set((state: BookingState) => ({ bookings: [...state.bookings, booking] }))
      },

      updateBooking: (id: string, data: Partial<Booking>) => {
        set((state: BookingState) => ({
          bookings: state.bookings.map((b: Booking) =>
            b.id === id ? { ...b, ...data, updatedAt: new Date().toISOString() } : b
          ),
        }))
      },

      getBooking: (id: string) => {
        return get().bookings.find((b: Booking) => b.id === id)
      },

      getUserBookings: (userId: string) => {
        return get().bookings.filter((b: Booking) => b.userId === userId)
      },
    }),
    {
      name: "ketemu-booking-storage",
      partialize: (state: BookingState) => ({ bookings: state.bookings }),
    }
  )
)
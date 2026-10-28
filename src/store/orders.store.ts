import { create } from "zustand"
import { Booking } from "@/features/checkout/types"

interface OrdersState {
  orders: Booking[]
  addOrder: (order: Booking) => void
  getOrderById: (id: string) => Booking | undefined
  getOrdersByUser: (userId: string) => Booking[]
  updateOrder: (id: string, updates: Partial<Booking>) => void
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  addOrder: (order) => set({ orders: [...get().orders, order] }),
  getOrderById: (id) => get().orders.find((o) => o.id === id),
  getOrdersByUser: (userId) => get().orders.filter((o) => o.userId === userId),
  updateOrder: (id, updates) =>
    set({
      orders: get().orders.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    }),
}))
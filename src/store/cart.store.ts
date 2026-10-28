import { create } from "zustand"

interface CartItem {
  eventId: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (eventId: string, quantity?: number) => void
  removeItem: (eventId: string) => void
  updateQuantity: (eventId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (eventId, quantity = 1) => {
    const existing = get().items.find((i) => i.eventId === eventId)
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.eventId === eventId ? { ...i, quantity: i.quantity + quantity } : i
        ),
      })
    } else {
      set({ items: [...get().items, { eventId, quantity }] })
    }
  },
  removeItem: (eventId) => set({ items: get().items.filter((i) => i.eventId !== eventId) }),
  updateQuantity: (eventId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(eventId)
    } else {
      set({
        items: get().items.map((i) =>
          i.eventId === eventId ? { ...i, quantity } : i
        ),
      })
    }
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
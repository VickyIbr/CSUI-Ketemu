import { useAuthStore } from "@/store/auth.store"
import { useEventsStore } from "@/store/events.store"
import { useOrdersStore } from "@/store/orders.store"
import { usePartnersStore } from "@/store/partners.store"
import { useReviewsStore } from "@/store/reviews.store"

export function getAppState() {
  return {
    auth: useAuthStore.getState(),
    events: useEventsStore.getState(),
    orders: useOrdersStore.getState(),
    partners: usePartnersStore.getState(),
    reviews: useReviewsStore.getState(),
  }
}

export function resetAppState() {
  useAuthStore.setState({ session: null })
  useOrdersStore.setState({ orders: [] })
  useReviewsStore.getState().setReviews([])
  useEventsStore.getState().setEvents([])
}

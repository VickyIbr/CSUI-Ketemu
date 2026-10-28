import { create } from "zustand"
import { Review } from "@/features/reviews/types"
import { reviewsSeed } from "@/features/reviews/data/reviews.seed"

interface ReviewsState {
  reviews: Review[]
  setReviews: (reviews: Review[]) => void
  getReviewsByEvent: (eventId: string) => Review[]
  addReview: (review: Review) => void
  getAverageRating: (eventId: string) => number
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: reviewsSeed,
  setReviews: (reviews) => set({ reviews }),
  getReviewsByEvent: (eventId) => get().reviews.filter((r) => r.eventId === eventId),
  addReview: (review) => set({ reviews: [...get().reviews, review] }),
  getAverageRating: (eventId) => {
    const eventReviews = get().reviews.filter((r) => r.eventId === eventId)
    if (eventReviews.length === 0) return 0
    return eventReviews.reduce((sum, r) => sum + r.rating, 0) / eventReviews.length
  },
}))
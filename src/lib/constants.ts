export const APP_NAME = "Ketemu"
export const APP_TAGLINE = "Marketplace Event Edukasi"

export const ROUTES = {
  HOME: "/",
  DISCOVERY: "/event",
  EVENT_DETAIL: "/event/:slug",
  CHECKOUT: "/checkout/:id",
  PAYMENT: "/payment/:id",
  ORDER_HISTORY: "/order",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
  PERSONAL_SITE: "/u/:username",
  PARTNER_DASHBOARD: "/mitra",
  PAGE_BUILDER: "/mitra/page-builder",
  BLOG_POST: "/blog/:slug",
  ADMIN_PAYMENTS: "/admin/payments",
  ADMIN_USERS: "/admin/users",
} as const

export const CATEGORY_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "course", label: "Course" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "kompetisi", label: "Kompetisi" },
] as const

export const EVENT_MODES = ["online", "offline", "hybrid"] as const
export const PAYMENT_STATUSES = ["pending", "verified", "rejected"] as const
export const BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed"] as const

export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

export const STORAGE_KEYS = {
  AUTH: "auth",
  EVENTS: "events",
  BOOKINGS: "bookings",
  PARTNERS: "partners",
  USERS: "users",
  PAGES: "pages",
} as const
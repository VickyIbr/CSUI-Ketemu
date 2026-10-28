export const KATEGORI = [
  "Course",
  "Workshop",
  "Seminar",
  "Kompetisi",
  "Bootcamp",
  "Webinar",
] as const

export const SORT_OPTIONS = [
  { label: "Terpopuler", value: "popular" },
  { label: "Terbaru", value: "newest" },
  { label: "Harga terendah", value: "price_asc" },
  { label: "Harga tertinggi", value: "price_desc" },
  { label: "Rating tertinggi", value: "rating" },
] as const

export const BOOKING_STATUS = {
  pending: "Menunggu pembayaran",
  waiting_verification: "Menunggu verifikasi",
  paid: "Lunas",
  expired: "Kadaluarsa",
  cancelled: "Dibatalkan",
} as const

export const EVENT_STATUS = {
  draft: "Draft",
  published: "Aktif",
  cancelled: "Dibatalkan",
  completed: "Selesai",
} as const

export const KOMISI_RATE = 0.05
export const HOLD_MINUTES = 15
export const PLATFORM_NAME = "Ketemu"
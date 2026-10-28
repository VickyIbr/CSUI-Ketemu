import type { User } from "@/types/user"

export const usersSeed: User[] = [
  {
    id: "user-001",
    email: "rina@example.com",
    name: "Rina Ayu",
    username: "rina_aku",
    avatar: "https://images.unsplash.com/photo-1534080564583-6be75777b70f?w=200&q=80",
    bio: "Mahasiswi Teknik Informatika UI. Suka UI/UX design.",
    isPartner: false,
    createdAt: "2026-01-15T00:00:00+07:00",
    updatedAt: "2026-01-15T00:00:00+07:00",
  },
  {
    id: "user-002",
    email: "budi@example.com",
    name: "Budi Santoso",
    username: "budi_dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bio: "Developer full-stack. Suka React & Node.js.",
    isPartner: false,
    createdAt: "2026-02-20T00:00:00+07:00",
    updatedAt: "2026-02-20T00:00:00+07:00",
  },
  {
    id: "user-003",
    email: "admin@ketemu.id",
    name: "Admin Ketemu",
    username: "admin_ketemu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    bio: "Admin platform Ketemu",
    isPartner: true,
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
  },
]

// Kredensial demo untuk prototipe
export const demoCredentials = [
  { email: "rina@example.com", password: "rina123", name: "Rina Ayu" },
  { email: "budi@example.com", password: "budi123", name: "Budi Santoso" },
  { email: "admin@ketemu.id", password: "admin123", name: "Admin Ketemu" },
]
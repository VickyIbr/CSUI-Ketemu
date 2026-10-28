import { User } from "../types"

export const usersSeed: User[] = [
  {
    id: "user-1",
    username: "vicky",
    email: "user@ketemu.id",
    name: "Vicky Ibrahimovic",
    headline: "Mahasiswa Sistem Informasi Fasilkom UI",
    bio: "Suka belajar teknologi baru dan berpartisipasi dalam kompetisi hackathon. Fokus pada DevOps dan AI.",
    avatarUrl: "/avatars/vicky.svg",
    education: [
      {
        id: "edu-1",
        institution: "Universitas Indonesia",
        degree: "S1",
        field: "Sistem Informasi",
        startYear: 2023,
        endYear: null,
      },
    ],
    skills: [
      { id: "sk-1", name: "React", level: "advanced" },
      { id: "sk-2", name: "TypeScript", level: "advanced" },
      { id: "sk-3", name: "Go", level: "intermediate" },
    ],
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    username: "budi",
    email: "budi@example.com",
    name: "Budi Santoso",
    headline: "Mahasiswa Ilmu Komputer UI",
    bio: "Backend developer yang tertarik pada data science dan AI. Aktif di lab riset Fasilkom UI.",
    avatarUrl: "/avatars/budi.svg",
    education: [
      {
        id: "edu-2",
        institution: "Universitas Indonesia",
        degree: "S1",
        field: "Ilmu Komputer",
        startYear: 2022,
        endYear: null,
      },
    ],
    skills: [
      { id: "sk-4", name: "Python", level: "advanced" },
      { id: "sk-5", name: "Go", level: "intermediate" },
      { id: "sk-6", name: "Machine Learning", level: "intermediate" },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "user-3",
    username: "siti",
    email: "siti@example.com",
    name: "Siti Aminah",
    headline: "Mahasiswa Desain Komunikasi Visual UI",
    bio: "Desainer dengan passion di accessibility dan inclusive design. Aktif di UKM Seni Fasilkom UI.",
    avatarUrl: "/avatars/siti.svg",
    education: [
      {
        id: "edu-3",
        institution: "Universitas Indonesia",
        degree: "S1",
        field: "Desain Komunikasi Visual",
        startYear: 2023,
        endYear: null,
      },
    ],
    skills: [
      { id: "sk-7", name: "Figma", level: "advanced" },
      { id: "sk-8", name: "CSS", level: "advanced" },
      { id: "sk-9", name: "UI/UX Design", level: "advanced" },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
]

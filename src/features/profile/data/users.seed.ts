import { User } from "../types"

export const usersSeed: User[] = [
  {
    id: "user-1",
    username: "rina",
    email: "rina@example.com",
    name: "Rina Wijaya",
    headline: "Mahasiswa Sistem Informasi UI",
    bio: "Suka belajar teknologi baru dan berpartisipasi dalam kompetisi hackathon.",
    avatarUrl: "/avatars/rina.svg",
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
      { id: "sk-1", name: "React", level: "intermediate" },
      { id: "sk-2", name: "TypeScript", level: "intermediate" },
    ],
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    username: "budi",
    email: "budi@example.com",
    name: "Budi Santoso",
    headline: "Software Engineer",
    bio: "Backend developer yang tertarik pada data science dan AI.",
    avatarUrl: "/avatars/budi.svg",
    education: [
      {
        id: "edu-2",
        institution: "Institut Teknologi Bandung",
        degree: "S1",
        field: "Informatika",
        startYear: 2020,
        endYear: 2024,
      },
    ],
    skills: [
      { id: "sk-3", name: "Python", level: "advanced" },
      { id: "sk-4", name: "Go", level: "intermediate" },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "user-3",
    username: "siti",
    email: "siti@example.com",
    name: "Siti Aminah",
    headline: "UI/UX Designer",
    bio: "Desainer dengan passion di accessibility dan inclusive design.",
    avatarUrl: "/avatars/siti.svg",
    education: [
      {
        id: "edu-3",
        institution: "Universitas Gadjah Mada",
        degree: "S1",
        field: "Desain Komunikasi Visual",
        startYear: 2022,
        endYear: null,
      },
    ],
    skills: [
      { id: "sk-5", name: "Figma", level: "advanced" },
      { id: "sk-6", name: "CSS", level: "advanced" },
    ],
    createdAt: "2025-03-01T00:00:00Z",
  },
]
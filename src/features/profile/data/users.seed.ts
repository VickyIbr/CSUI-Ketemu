import { User } from "../types"

export const usersSeed: User[] = [
  {
    id: "user-1",
    username: "oscar",
    email: "oscar.ryanda@ui.ac.id",
    name: "Oscar Ryanda Putra",
    headline: "Mahasiswa Sistem Informasi Fasilkom UI",
    bio: "Mahasiswa Sistem Informasi angkatan 2023. Juara 1 Tecfest Global Business Case Competition 2025.",
    avatarUrl: "/avatars/oscar.svg",
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
      { id: "sk-3", name: "AI", level: "intermediate" },
    ],
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    username: "vinka",
    email: "vinka.alrezky@ui.ac.id",
    name: "Vinka Alrezky As",
    headline: "Mahasiswa Ilmu Komputer Fasilkom UI",
    bio: "Mahasiswa Ilmu Komputer angkatan 2022. Juara 3 Toyota Software Academy Indonesia 2026.",
    avatarUrl: "/avatars/vinka.svg",
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
      { id: "sk-5", name: "Machine Learning", level: "intermediate" },
      { id: "sk-6", name: "Go", level: "intermediate" },
    ],
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "user-3",
    username: "naomyscha",
    email: "naomyscha.attalie@ui.ac.id",
    name: "Naomyscha Attalie Maza",
    headline: "Mahasiswa Fasilkom UI",
    bio: "Mahasiswa Fasilkom UI angkatan 2024. None Jakarta Barat 2025.",
    avatarUrl: "/avatars/naomyscha.svg",
    education: [
      {
        id: "edu-3",
        institution: "Universitas Indonesia",
        degree: "S1",
        field: "Ilmu Komputer",
        startYear: 2024,
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

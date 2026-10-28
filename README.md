# KeTemu — Platform Event & Course Kampus

> Temukan event, workshop, course, dan kompetisi yang relevan untuk kampusmu — semua dalam satu tempat.

![Status](https://img.shields.io/badge/status-prototype-yellow)
![Stack](https://img.shields.io/badge/stack-React%2019%20%2B%20TS%20%2B%20Vite-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Apa itu KeTemu?

KeTemu adalah **platform event & course kampus** yang menyatukan pencari event (mahasiswa, profesional, komunitas) dengan penyedia event (organisasi, mitra, kampus). Fokus: **discovery yang mudah, transaksi yang aman, dan portfolio terverifikasi**.

---

## 🎯 Fitur Utama

- 🔍 **Event Discovery** — filter kategori, harga, lokasi, tanggal
- 📚 **Course & Diploma** — dedicated section, bedakan per kategori (IT, Matematika, Bisnis, Desain, Bahasa, Sains)
- 👥 **People Search** — profil & portfolio (LinkedIn-style) untuk verifikasi kredibilitas
- 🎓 **Dashboard User** — profil, riwayat, sertifikat, pengaturan
- 🏢 **Dashboard Mitra** — kelola event, peserta, analitik
- 🛡️ **Dashboard Admin** — kelola pengguna, event, analitik, pengaturan
- 💳 **Checkout & Payment** — QRIS, e-ticket
- 🔐 **Auth Google OAuth** — login/register via akun Google
- 🦉 **Branding KeTemu** — owl mascot sebagai icon & favicon

---

## 🎨 Design System

| Token | Hex | Keterangan |
|---|---|---|
| Paper | `#ffffff` | Latar utama |
| Ink | `#14161a` | Teks utama |
| Ink Soft | `#5b6470` | Teks sekunder |
| Line | `#e4e6e9` | Border 1px |
| Highlighter | `#ffd43b` | Kuning (stabilo) |
| Ink Blue | `#1d3fd1` | Biru (tinta/aksi) |

**Tipografi:** Instrument Sans (UI/body) + JetBrains Mono (angka tabular, harga, order ID)
**Radius:** 6px (input/badge) · 10px (kartu/dialog) · 999px (chip/pill)

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 3.4 |
| UI Kit | shadcn/ui (new-york style) |
| State | Zustand |
| Routing | React Router 7 |
| Deploy | Vercel |

---

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/VickyIbr/CSUI-Ketemu.git
cd CSUI-Ketemu
npm install

# Dev server
npm run dev        # → http://localhost:5173

# Type check
npx tsc --noEmit

# Production build
npm run build
```

---

## 📁 Struktur Folder

```
src/
├── app/            # Router & guards
├── components/     # Layout (header, footer, admin/mitra layout) + ui primitives
├── features/       # Domain modules (events, courses, people, auth, ...)
├── pages/          # All pages (public, admin, mitra, user)
├── store/          # Zustand stores
└── lib/            # Utils & helpers
```

---

## 🌐 Live Preview

**https://ketemu.vicky.id** — deploy otomatis setiap push ke `main`.

---

## 📝 Catatan Penting

- **Prototype statis** — tidak ada backend/database. Data ditaruh di file TypeScript seed.
- **Gambar dari internet** — bukan data pribadi user.
- **Bahasa UI** — Bahasa Indonesia tidak formal (gaya Gojek). Route, variable, component, file tetap dalam bahasa Inggris.
- **Author** — VickyIbr (bukan ubuntu).

---

## 📚 Dokumentasi Lengkap

- `.agents/1-PRD.md` — Product Requirements Document
- `.agents/2-DESIGN.md` — Design system & aturan visual
- `.agents/3-TASKS/` — Task list (60 task, 11 modul)
- `docs/design-decisions.md` — Validasi design decision

---

## 👤 Author

**Vicky Ibrahimovic** — Software Engineer · Universitas Indonesia
Website: https://vicky.id
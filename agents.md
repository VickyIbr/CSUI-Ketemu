# agents.md

> **Petunjuk untuk agent / AI pemrogram yang bekerja di repo ini.**

---

## HAL PENTING

- **Ini prototype statis.** Tidak ada backend, tidak ada database, data ditaruh di file TypeScript seed.
- Konten placeholder: **gambar dari internet, data dummy dari berita, nama mahasiswa UI** — bukan data pribadi siapa pun.
- Tanpa bahasa Indonesia formal, **user-facing text dalam Bahasa Indonesia tidak formal** (gaya Gojek), sedangkan route, variable, component, dan file tetap dalam bahasa Inggris.
- Semua gaya visual mengikuti `.agents/2-DESIGN.md` (design system ketat, tidak ada deviation).
- Git author: VickyIbr

---

## Arsitektur Ringkas

```
src/
  app/router.tsx          # Route tree (React Router 7)
  app/guards.tsx          # Auth guard
  components/layout/      # SiteHeader, SiteFooter, AdminLayout, MitraLayout
  features/{events,courses,people,auth,...}/  # Domain feature modules
  pages/                  # All pages (public, admin, mitra, user)
```

Routing: React Router 7 (`src/app/router.tsx`) dengan lazy-load components via `.then((m) => ({ default: m.Component }))`.

---

## Features yang Sudah Ada

| Fitur | Status |
|---|---|
| Landing page | ✅ 5-column grid, event populer + course populer section |
| Events discovery & detail | ✅ Filter + detail page |
| Courses discovery & detail | ✅ Dedicated section, category badges (IT, Matematika, Bisnis, Desain, Bahasa, Sains) |
| People search & profile | ✅ Read-only, dummy data, `/people` + `/my/:username` |
| User dashboard | ✅ 5 tabs: profile, portfolio, history, certificates, settings |
| Admin dashboard & pages | ✅ /admin, /admin/users, /admin/events, /admin/analytics, /admin/settings |
| Mitra dashboard & pages | ✅ /mitra, /mitra/new-event, /mitra/events, /mitra/participants, /mitra/analytics, /mitra/settings |
| Auth (Google OAuth) | ✅ Login/register with account picker modal |
| Hosted | ✅ https://ketemu.site |

---

## What's Next (Next 5 Tasks)

1. **Type checking & build pass** — `npx tsc --noEmit` and `npm run build`
2. **Verify all routes end-to-end** — `browser_exec` on production URL for each route
3. **Fix remaining UI inconsistencies** — align all buttons/badges to shadcn standard
4. **Final documentation polish** — README, development guide, deployment notes
5. **Light smoke test** — open dev server, click through 5-10 flows, then commit

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # TypeScript + Vite production build
npx tsc --noEmit # Type check only
```

---

## Deployment

- **Preview:** `npx vite preview` — but it fails repeatedly with exit -1; use browser_exec against production URL instead.
- **Production:** Vercel at https://ketemu.site
- **Development:** Vercel at https://development.ketemu.site
- Every `npm run build` + push updates the live deployment.

# TASK LIST — Prototype Frontend "Ketemu"

**Sumber acuan:** `.agents/1-PRD.md` (produk), `.agents/2-DESIGN.md` (visual), file ini (eksekusi)
**Tanggal dibuat:** 2026-10-28 · **Revisi:** 2026-10-28 (renumber v2)
**Tipe:** static frontend prototype (Vite + React + TS + React Router + Tailwind v4 + shadcn/ui)
**Backend:** tidak ada. Data statis TS + localStorage.
**Status global:** semua task `Todo`

---

## Perubahan di Revisi v2

| # | Masalah | Perbaikan |
|---|---|---|
| 1 | `RequireAuth` dibuat (T-17 lama) sebelum auth ada (T-23 lama) → gagal compile | Guard dipindah ke T-24, setelah auth mock T-22 |
| 2 | Login/register (T-39 lama) terkubur di M6, padahal checkout butuh login | Dipindah ke T-23 di M3 |
| 3 | `ratingAvg`/`reviewCount` di seed event & mitra ≠ data review | Seed hanya isi review; agregat dihitung `recomputeAggregates()` di T-21 |
| 4 | Nama komponen shadcn (`empty`, `field`, `input-group`, `spinner`, `chart`) belum diverifikasi | T-04 wajib `shadcn view` per komponen sebelum commit |
| 5 | localStorage ~5 MB bisa jebol oleh base64 (bukti bayar, avatar, cover) | T-38 kompres gambar ≤800px JPEG q0.7; cover pakai SVG lokal; fallback in-memory |
| 6 | Header butuh `useAuth` tapi shell dibuat sebelum store | Shell T-16 tanpa user menu; integrasi auth ke header digabung di T-24 |

---

## Aturan Eksekusi

1. **Satu task = satu commit.** Tidak boleh menumpuk dua task dalam satu commit.
2. Format commit: Conventional Commits, scope = nama modul.
   Contoh: `feat(events): add filter bar with category and price range`
3. Task dikerjakan berurutan sesuai dependensi. Task tanpa dependensi boleh paralel.
4. **Gate tiap akhir sesi** (§Sesi Kerja): `npx tsc --noEmit` + `npm run build` + screenshot 3 breakpoint.
5. Definition of Done tiap task: kode jalan, tidak ada error TypeScript, tidak ada `any`, file < 250 baris, responsif 360px, tidak ada import relatif berantai (`../../`), lolos checklist anti-slop `.agents/2-DESIGN.md` §11.
6. Skill wajib per jenis task:
   - Semua task UI → `antislop` + `antislop-ui` + `shadcn/ui` + `design-taste-frontend`
   - Task layout/halaman → tambah `antislop-layoutmobile`
   - Task form/aksesibilitas → tambah `antislop-human`
   - Task copy/landing → tambah `antislop-copywriting`
   - Task komponen kode → tambah `antislop-code`
7. Jangan edit `src/components/ui/*` kecuali 4 file di T-25 (`button`, `card`, `badge`, `input`). Override lain lewat `components/common`.
8. Setiap perubahan bentuk data → naikkan versi key localStorage (`ketemu:v1` → `v2`).

---

## Ringkasan Modul

| Modul | Task | Jumlah | Fokus |
|---|---|---|---|
| M0 Foundation | T-01 … T-08 | 8 | repo, toolchain, skill, deps |
| M1 Design System | T-09 … T-12 | 4 | token, tipografi, util |
| M2 Shell & Routing | T-13 … T-16 | 4 | folder, providers, route tree, layout |
| M3 Data, Store & Auth | T-17 … T-24 | 8 | types, seed, store, auth, guard |
| M4 Landing Page | T-25 … T-29 | 5 | primitif, hero, kategori, CTA mitra |
| M5 Discovery & Detail | T-30 … T-34 | 5 | filter, sort, detail, profil mitra |
| M6 Checkout & Payment | T-35 … T-39 | 5 | pricing, form, QRIS, e-ticket |
| M7 Personal Site & Review | T-40 … T-45 | 6 | profil publik, blog, ulasan verified |
| M8 Mitra Dashboard | T-46 … T-52 | 7 | analytics, CRUD event, peserta |
| M9 Akun & Polish | T-53 … T-57 | 5 | dashboard user, state, a11y, mobile |
| M10 Verifikasi & Docs | T-58 … T-60 | 3 | build, smoke test, readme |
| **Total** | | **60** | |

---

## Sesi Kerja (9 sesi, 60 commit)

| Sesi | Task | Gate sebelum lanjut |
|---|---|---|
| S0 | T-01 … T-04 | `npm run dev` jalan, `npx shadcn info --json` keluar |
| S1 | T-05 … T-12 | komponen terpasang, token & font terlihat |
| S2 | T-13 … T-24 | login → logout → guard redirect benar |
| S3 | T-25 … T-29 | screenshot landing 360/768/1280, lolos §11 |
| S4 | T-30 … T-34 | filter via URL bisa di-share, 404 benar |
| S5 | T-35 … T-39 | alur beli → upload → tiket selesai |
| S6 | T-40 … T-45 | badge terverifikasi hanya dari booking `paid` |
| S7 | T-46 … T-52 | verifikasi bayar → dashboard mitra ikut berubah |
| S8 | T-53 … T-57 | semua halaman 360px tanpa horizontal scroll |
| S9 | T-58 … T-60 | `tsc --noEmit` + build + smoke Playwright hijau |

`npm run dev` dinyalakan sekali di background per sesi. `git push` hanya di akhir sesi.

---

# M0 — Foundation

## T-01 — Inisialisasi repo & git hygiene
- **Deskripsi:** `git init`, `.gitignore` (`node_modules`, `dist`, `.env*`, `*.local`, `.DS_Store`), `README.md` kerangka (judul, cara run, akun demo placeholder, batasan prototype).
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** —
- **Estimasi:** 0.5 jam
- **File:** `.gitignore`, `README.md`
- **Commit:** `chore: initialize repository with gitignore and readme`

## T-02 — Scaffold Vite + React + TypeScript
- **Deskripsi:** `npm create vite@latest . -- --template react-ts`, bersihkan boilerplate (logo, counter, `App.css`), pastikan `npm run dev` dan `npm run build` jalan.
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-01
- **Estimasi:** 0.5 jam
- **File:** `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`
- **Commit:** `chore: scaffold vite react typescript app`

## T-03 — Tailwind v4 + path alias
- **Deskripsi:** Pasang `tailwindcss` + `@tailwindcss/vite`, `src/index.css` → `@import "tailwindcss"`. Alias `@/*` di `vite.config.ts` dan `tsconfig.app.json`.
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-02
- **Estimasi:** 0.5 jam
- **File:** `vite.config.ts`, `tsconfig.app.json`, `src/index.css`
- **Commit:** `chore: add tailwind v4 and path alias`

## T-04 — Inisialisasi shadcn/ui + verifikasi komponen
- **Deskripsi:** `npx shadcn@latest init` (base `radix`, style `new-york`, base color **neutral**, CSS variables on). Verifikasi `components.json` + `src/lib/utils.ts`. **Wajib:** jalankan `npx shadcn@latest view <name>` untuk setiap komponen yang akan dipasang di T-05…T-07 dan catat hasilnya (ada / tidak ada / nama pengganti) di `docs/shadcn-components.md`. Komponen yang tidak ada → pakai primitif sendiri, jangan dipaksakan.
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-03
- **Estimasi:** 1 jam
- **File:** `components.json`, `src/lib/utils.ts`, `src/index.css`, `docs/shadcn-components.md`
- **Commit:** `chore: initialize shadcn ui and verify component availability`

## T-05 — Komponen shadcn batch 1 (dasar)
- **Deskripsi:** `button card input label badge avatar separator skeleton sonner` (sesuai hasil verifikasi T-04).
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 0.5 jam
- **File:** `src/components/ui/*`
- **Commit:** `chore(ui): add base shadcn components`

## T-06 — Komponen shadcn batch 2 (navigasi & overlay)
- **Deskripsi:** `sheet dialog alert-dialog dropdown-menu tabs breadcrumb pagination tooltip popover`
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 0.5 jam
- **File:** `src/components/ui/*`
- **Commit:** `chore(ui): add navigation and overlay components`

## T-07 — Komponen shadcn batch 3 (form & data)
- **Deskripsi:** `form select checkbox radio-group textarea switch calendar progress table chart` — `empty`, `field`, `input-group`, `spinner` hanya bila tersedia di T-04; jika tidak, gunakan `skeleton`/`div` dan `sonner`.
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 0.5 jam
- **File:** `src/components/ui/*`
- **Commit:** `chore(ui): add form and data components`

## T-08 — Dependensi runtime + skills
- **Deskripsi:** Install `react-router-dom recharts lucide-react date-fns zod react-hook-form sonner @fontsource/instrument-sans @fontsource/jetbrains-mono`. Install skills:
  - `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`
  - `npx skills add anthropics/skills@frontend-design`
  - `npx skills add shadcn/ui`
  - `npx skills add anthropics/skills@webapp-testing`

  Catat di README bagian "Skills". Acuan visual: `.agents/2-DESIGN.md`.
- **Modul:** Foundation · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-02
- **Estimasi:** 1 jam
- **File:** `package.json`, `README.md`, `.agents/skills/*`
- **Commit:** `chore: add runtime dependencies and ai skills`

---

# M1 — Design System

## T-09 — Validasi design system + review anti-slop
- **Deskripsi:** Baca `.agents/2-DESIGN.md` §0–§4. Verifikasi tiap token masih sesuai; penyimpangan dicatat di `docs/design-decisions.md` beserta alasan. Jalankan review terhadap §11: pastikan tidak ada cream background, gradasi, ungu, eyebrow ALL-CAPS, 3 kartu fitur identik, hover lift, animasi scroll.
- **Modul:** Design System · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-08
- **Estimasi:** 1 jam
- **File:** `.agents/2-DESIGN.md`, `docs/design-decisions.md`
- **Commit:** `docs(design): validate design system against anti-slop checklist`

## T-10 — Token warna & radius (light only)
- **Deskripsi:** Terapkan `@theme` + CSS variables dari `.agents/2-DESIGN.md` §10 ke `src/index.css`: 12 token (`paper`, `paper-2`, `ink`, `ink-soft`, `line`, `line-strong`, `highlighter`, `ink-blue`, `ink-blue-soft`, `success`, `danger`, `warning`), radius 6/10, `--shadow-overlay`. Map ke variabel shadcn (`--background`, `--primary`, `--accent`, `--ring`, dst.). Tanpa dark mode. Verifikasi kontras tabel §2.
- **Modul:** Design System · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-09
- **Estimasi:** 1.5 jam
- **File:** `src/index.css`
- **Commit:** `feat(design): apply paper ink and highlighter color tokens`

## T-11 — Tipografi & skala
- **Deskripsi:** Muat `@fontsource/instrument-sans` (400/500/600/700) + `@fontsource/jetbrains-mono` (400/500). Definisikan `--font-sans`, `--font-mono`, utility `.text-display`…`.text-micro` sesuai §3, kelas `.num` dengan `tabular-nums`. Body 16/1.55, max 68ch, sentence case.
- **Modul:** Design System · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-10
- **Estimasi:** 1 jam
- **File:** `src/index.css`, `src/main.tsx`, `package.json`
- **Commit:** `feat(design): add typography scale with instrument sans and jetbrains mono`

## T-12 — Utility & konstanta bersama
- **Deskripsi:** `src/lib/format.ts` (IDR `Rp150.000` tanpa desimal, tanggal `id-ID` panjang & pendek, relatif), `src/lib/storage.ts` (wrapper localStorage aman + versioning + fallback in-memory), `src/lib/constants.ts` (`KATEGORI`, `SORT_OPTIONS`, `BOOKING_STATUS`, `EVENT_STATUS`, `KOMISI_RATE = 0.05`, `HOLD_MINUTES = 15`, `STORAGE_KEY = 'ketemu:v2'`), `src/lib/id.ts` (order id generator), `src/lib/image.ts` (kompres gambar ≤800px JPEG q0.7).
- **Modul:** Design System · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 2 jam
- **File:** `src/lib/format.ts`, `src/lib/storage.ts`, `src/lib/constants.ts`, `src/lib/id.ts`, `src/lib/image.ts`
- **Commit:** `feat(lib): add formatting storage constants and image compression`

---

# M2 — App Shell & Routing

## T-13 — Struktur folder feature-first
- **Deskripsi:** Buat kerangka direktori sesuai plan: `src/app`, `src/components/{layout,common}`, `src/features/{events,partners,checkout,reviews,profile,mitra,auth}`, `src/pages/{public,auth,user,mitra,system}`, `src/store/slices`, `src/types`, `docs`.
- **Modul:** Shell & Routing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-12
- **Estimasi:** 0.5 jam
- **File:** struktur direktori (`.gitkeep`)
- **Commit:** `chore: add feature-first folder structure`

## T-14 — Providers & root app
- **Deskripsi:** `src/app/providers.tsx` (slot `AppStoreProvider` placeholder, `Toaster` sonner), `src/App.tsx` render `RouterProvider`, `src/main.tsx` mounting. Hapus sisa boilerplate.
- **Modul:** Shell & Routing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-13
- **Estimasi:** 1 jam
- **File:** `src/app/providers.tsx`, `src/App.tsx`, `src/main.tsx`
- **Commit:** `feat(app): add providers and root application`

## T-15 — Route tree lengkap (lazy + placeholder)
- **Deskripsi:** `src/app/router.tsx` dengan `createBrowserRouter`: semua 18 route, `React.lazy` per halaman, `Suspense` fallback `PageSkeleton`, `errorElement`. Halaman placeholder minimal (judul + breadcrumb). Guard **belum** dipasang (menyusul T-24).
- **Modul:** Shell & Routing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-14
- **Estimasi:** 2 jam
- **File:** `src/app/router.tsx`, `src/pages/**/*.tsx`
- **Commit:** `feat(app): add complete route tree with lazy pages`

## T-16 — App shell (header, footer, mobile nav)
- **Deskripsi:** `AppShell` (skip-link, `SiteHeader` sticky 64px, `Outlet`, `SiteFooter`), `SiteHeader` (logo, nav Discover / Untuk Mitra, search trigger, **tombol Masuk/Daftar statis** — user menu menyusul di T-24, badge "Prototype"), `MobileNav` via `Sheet`, `SiteFooter` (kolom link, label prototype 12px, tombol Reset demo data placeholder). Active link via `NavLink`.
- **Modul:** Shell & Routing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-15
- **Estimasi:** 2.5 jam
- **File:** `src/components/layout/*`
- **Commit:** `feat(shell): add app shell with responsive header and footer`

---

# M3 — Data, Store & Auth

## T-17 — Domain types per feature
- **Deskripsi:** `types.ts` per feature: `events` (Event, EventStatus, EventCategory), `partners` (Partner, Rekening), `checkout` (Booking, BookingStatus, PaymentProof), `reviews` (Review), `profile` (User, Post, Education, Skill), `auth` (Session, AccountType). `src/types/index.ts` hanya re-export. Tanpa `any`, tanggal ISO string. **Event & Partner tidak menyimpan `ratingAvg`/`reviewCount`** — dihitung di selector.
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-16
- **Estimasi:** 1.5 jam
- **File:** `src/features/*/types.ts`, `src/types/index.ts`
- **Commit:** `feat(types): add domain types for all features`

## T-18 — Seed mitra & user
- **Deskripsi:** `partners.seed.ts` (6 mitra Jakarta: lembaga IT, bootcamp, komunitas, penyelenggara hackathon, dll — slug, logo SVG lokal, deskripsi, kota, rekening), `users.seed.ts` (3 user + 1 akun mitra, headline, bio, skills, education, username unik).
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-17
- **Estimasi:** 2 jam
- **File:** `src/features/partners/data/partners.seed.ts`, `src/features/profile/data/users.seed.ts`, `public/logos/*.svg`
- **Commit:** `feat(data): add partner and user seed data`

## T-19 — Seed event
- **Deskripsi:** 14 event: 4 course, 4 workshop, 3 seminar, 3 kompetisi. Campur gratis/berbayar, online/offline Jakarta, kuota & terisi bervariasi, silabus + target pencapaian terisi, status mayoritas `active` + 1 `draft` + 1 `selesai`. Cover `public/covers/*.svg` (dibuat sendiri).
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-18
- **Estimasi:** 2.5 jam
- **File:** `src/features/events/data/events.seed.ts`, `public/covers/*.svg`
- **Commit:** `feat(data): add event seed data and local cover assets`

## T-20 — Seed review, post, booking
- **Deskripsi:** 24 review (semua berasal dari booking `paid`), 6 post, 5 booking dengan status berbeda (`paid`, `menunggu_verifikasi`, `pending`, `expired`). **Tidak** mengisi rating agregat di event/mitra.
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-19
- **Estimasi:** 2 jam
- **File:** `src/features/reviews/data/reviews.seed.ts`, `src/features/profile/data/posts.seed.ts`, `src/features/checkout/data/bookings.seed.ts`
- **Commit:** `feat(data): add review post and booking seed data`

## T-21 — App store (context + reducer + persist)
- **Deskripsi:** `src/store/app-store.tsx`: state `{auth, users, partners, events, bookings, reviews, posts}`, reducer gabungan dari `src/store/slices/*`, persist via `storage.ts` (`ketemu:v2`), `resetDemoData()`. **`recomputeAggregates()`** menghitung `ratingAvg` + `reviewCount` event & mitra dari `reviews` saat init dan setiap review berubah — satu sumber kebenaran. `selectors.ts` untuk turunan (event by slug, booking by orderId, revenue mitra, event mendatang).
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-20
- **Estimasi:** 3 jam
- **File:** `src/store/app-store.tsx`, `src/store/selectors.ts`, `src/store/slices/*`
- **Commit:** `feat(store): add persisted app store with computed aggregates`

## T-22 — Auth mock & akun demo
- **Deskripsi:** `features/auth/lib/mock-auth.ts`: login email+password (kredensial demo hardcoded), register (tambah user ke store), logout, switch akun cepat. Hook `useAuth`, `useCurrentUser`. Kredensial demo tampil di README + accordion "Akun demo" di halaman login.
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-21
- **Estimasi:** 1.5 jam
- **File:** `src/features/auth/lib/mock-auth.ts`, `src/features/auth/hooks/use-auth.ts`, `README.md`
- **Commit:** `feat(auth): add mock authentication with demo accounts`

## T-23 — Halaman login & register
- **Deskripsi:** Form login (email, password, akun demo), register (nama, email, password, tipe akun User/Mitra), validasi zod, redirect ke `next` param. Register sebagai mitra → arahkan ke `/mitra/pengaturan`. Satu kolom max 400px, tanpa ilustrasi (`.agents/2-DESIGN.md` §7).
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-22
- **Estimasi:** 2 jam
- **File:** `src/pages/auth/login.tsx`, `register.tsx`, `src/features/auth/components/*`
- **Commit:** `feat(auth): add login and register pages`

## T-24 — Guard, integrasi auth ke header, halaman sistem
- **Deskripsi:** `src/app/guards.tsx`: `RequireAuth` (redirect `/login?next=`), `RequireRole` (render `/403`). Pasang guard di route tree. Ganti tombol statis T-16 dengan `UserMenu` (avatar, nama, menu Akun / Dashboard mitra / Keluar) yang membaca `useAuth`. Halaman `not-found.tsx` + `forbidden.tsx` dengan CTA balik.
- **Modul:** Data & Store · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-23, T-16
- **Estimasi:** 2 jam
- **File:** `src/app/guards.tsx`, `src/app/router.tsx`, `src/components/layout/user-menu.tsx`, `src/pages/system/*`
- **Commit:** `feat(app): add route guards and authenticated header menu`

---

# M4 — Landing Page

## T-25 — Override primitif shadcn + komponen bersama
- **Deskripsi:** Sesuai `.agents/2-DESIGN.md` §6: override `Button` (varian `primary`/`secondary`/`ghost`/`destructive`/`highlight`, radius 6px, tinggi 40/44px, state lengkap), `Card` (hapus `shadow-sm`, border `--line`, radius 10px, hover hanya ubah border), `Badge` (pill + tint semantik), `Input` (tinggi 40px, focus ring biru). Buat `components/common/`: `Section`, `PageHeader`, `StatCard`, `Price`, `RatingStars`, `VerifiedBadge`, `CategoryIcon`, `EmptyState`, `PageSkeleton`, `ErrorState`.
- **Modul:** Landing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-24
- **Estimasi:** 3 jam
- **File:** `src/components/ui/{button,card,badge,input}.tsx`, `src/components/common/*`
- **Commit:** `feat(ui): override shadcn primitives and add shared components`

## T-26 — EventCard & PartnerCard
- **Deskripsi:** `EventCard` (cover 16:9, badge kategori pill, judul clamp 2 baris, mitra + verified, rating mono, harga mono, sisa kuota, state sold-out), varian `default`/`compact`. `PartnerCard` (logo, nama, rating, jumlah event). Border 1px, tanpa shadow, hover hanya border.
- **Modul:** Landing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-25
- **Estimasi:** 2 jam
- **File:** `src/features/events/components/event-card.tsx`, `src/features/partners/components/partner-card.tsx`
- **Commit:** `feat(events): add event and partner cards`

## T-27 — Hero + search fungsional
- **Deskripsi:** Hero §7: headline `display` 56px dengan **satu sapuan stabilo `--highlighter`** di belakang satu frasa (teks tetap `--ink`), subcopy maks 2 baris, form search (keyword + kategori + kota) tombol `primary`, statistik mono 13px dari data nyata. Satu-satunya animasi masuk halaman (opacity 240ms, hormati reduced-motion). Submit → `/events?q=&kategori=&kota=`. Copy pakai `antislop-copywriting`.
- **Modul:** Landing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-26
- **Estimasi:** 2.5 jam
- **File:** `src/pages/public/landing/hero-section.tsx`, `search-form.tsx`
- **Commit:** `feat(landing): add hero section with highlighter accent and search`

## T-28 — Section kategori, event populer, mitra teratas
- **Deskripsi:** 4 tile kategori (ikon garis + label + jumlah event, link ke `/events?kategori=`), grid 6 event populer, strip mitra teratas. Semua dipisah garis rambut 1px, tanpa background bergantian.
- **Modul:** Landing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-27
- **Estimasi:** 2 jam
- **File:** `src/pages/public/landing/category-section.tsx`, `popular-events-section.tsx`, `top-partners-section.tsx`
- **Commit:** `feat(landing): add category popular events and partner sections`

## T-29 — Value prop, teaser personal site, CTA mitra, footer
- **Deskripsi:** "Kenapa Ketemu": 3 baris bernomor tipografis dengan garis pemisah (bukan 3 kartu identik, bukan ikon dalam lingkaran). Teaser personal site: mock profil + badge terverifikasi sebagai panel bergaris. CTA mitra: tombol `highlight` (kuning, teks `--ink`). Footer: kolom link, label "Prototype", Reset demo data. Rakit `landing.tsx`, spacing 96/64.
- **Modul:** Landing · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-28
- **Estimasi:** 2.5 jam
- **File:** `src/pages/public/landing/*`, `src/pages/public/landing.tsx`
- **Commit:** `feat(landing): complete landing page with value props and partner cta`

---

# M5 — Discovery & Detail

## T-30 — Filter & sort logic (fungsi murni)
- **Deskripsi:** `features/events/lib/filter-events.ts`: filter keyword (judul + mitra + kota), kategori multi, rentang harga, rentang tanggal, hanya `active` + kuota > 0; sort `termurah | terpopuler | terdekat | terbaru`. Tanpa React, mudah dites.
- **Modul:** Discovery · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-29
- **Estimasi:** 1.5 jam
- **File:** `src/features/events/lib/filter-events.ts`
- **Commit:** `feat(events): add pure filtering and sorting logic`

## T-31 — Halaman discovery `/events`
- **Deskripsi:** URL search params sebagai source of truth (`useSearchParams`). `FilterBar` (sidebar sticky desktop, `Sheet` mobile), `SortSelect`, chip filter aktif (latar `--ink-blue-soft`), counter hasil mono, grid 1/2/3 kolom, `EmptyState` dengan CTA reset, skeleton transisi.
- **Modul:** Discovery · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-30
- **Estimasi:** 3 jam
- **File:** `src/pages/public/event-list.tsx`, `src/features/events/components/filter-bar.tsx`, `sort-select.tsx`, `active-filters.tsx`
- **Commit:** `feat(events): add discovery page with url-driven filters`

## T-32 — Detail event `/events/:slug`
- **Deskripsi:** Cover + breadcrumb, header (judul, mitra, rating, kategori, lokasi/tanggal, sisa kuota), segmen: Deskripsi, Silabus (daftar bernomor), Target Pencapaian, Ulasan. Sidebar sticky (harga, CTA "Daftar sekarang", info hold 15 menit, bookmark). 404 bila slug tidak ada. Layout 8/4.
- **Modul:** Discovery · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-31
- **Estimasi:** 3 jam
- **File:** `src/pages/public/event-detail.tsx`, `src/features/events/components/event-detail-*.tsx`
- **Commit:** `feat(events): add event detail page with syllabus and reviews`

## T-33 — Profil mitra publik `/mitra/:slug`
- **Deskripsi:** Header mitra (logo, nama, verified, rating agregat dari selector, jumlah event & ulasan), deskripsi, grid event aktif, ringkasan ulasan terbaru. 404 bila tidak ada.
- **Modul:** Discovery · **Prioritas:** Mid · **Status:** Todo
- **Dependensi:** T-32
- **Estimasi:** 2 jam
- **File:** `src/pages/public/partner-detail.tsx`, `src/features/partners/components/*`
- **Commit:** `feat(partners): add public partner profile page`

## T-34 — Review list & summary (read-only)
- **Deskripsi:** `ReviewSummary` (rata-rata + distribusi bintang 1–5 sebagai bar horizontal, bukan donut), `ReviewList` (avatar, nama, tanggal, rating, teks, badge "Terverifikasi"), limit + "lihat semua". Dipakai di detail event dan profil mitra.
- **Modul:** Discovery · **Prioritas:** Mid · **Status:** Todo
- **Dependensi:** T-32
- **Estimasi:** 2 jam
- **File:** `src/features/reviews/components/review-summary.tsx`, `review-list.tsx`
- **Commit:** `feat(reviews): add review summary and list components`

---

# M6 — Checkout & Payment

## T-35 — Logika harga & komisi
- **Deskripsi:** `features/checkout/lib/pricing.ts`: `subtotal = harga × jumlah`, `biayaLayanan` (0 untuk event gratis), `total`, `komisi = subtotal × 0.05`, `netMitra`. Pembulatan rupiah. Fungsi murni + `CommissionBreakdown` (mono, rata kanan, terbuka).
- **Modul:** Checkout · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-34
- **Estimasi:** 1.5 jam
- **File:** `src/features/checkout/lib/pricing.ts`, `src/features/checkout/components/commission-breakdown.tsx`
- **Commit:** `feat(checkout): add pricing logic with 5 percent commission split`

## T-36 — Form peserta `/checkout/:slug`
- **Deskripsi:** RHF + zod: nama, email, no HP, jumlah tiket (1..sisa kuota), checkbox S&K. Ringkasan order sticky (mobile: di bawah). Validasi inline bahasa Indonesia. Event gratis → "Daftar gratis" tanpa pembayaran. Event penuh → blokir dengan pesan jelas.
- **Modul:** Checkout · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-35
- **Estimasi:** 3 jam
- **File:** `src/pages/public/checkout.tsx`, `src/features/checkout/components/participant-form.tsx`, `order-summary.tsx`
- **Commit:** `feat(checkout): add participant form with validated order summary`

## T-37 — Buat booking + countdown hold
- **Deskripsi:** Submit → `createBooking` (generate `orderId`, `expiresAt = now + 15 menit`, kurangi kuota sementara) → redirect `/order/:orderId`. `Countdown` mono. Saat habis → `expired`, kuota dikembalikan, state expired dengan CTA ulangi.
- **Modul:** Checkout · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-36
- **Estimasi:** 2.5 jam
- **File:** `src/features/checkout/components/countdown.tsx`, `src/store/slices/booking.slice.ts`
- **Commit:** `feat(checkout): add booking creation with 15 minute hold countdown`

## T-38 — Halaman pembayaran QRIS `/order/:orderId`
- **Deskripsi:** Panel QRIS (QR statis lokal, quiet zone 16px, border `--line`), nominal + kode unik, instruksi 3 langkah, `ProofUpload` (drag & drop, **kompres via `lib/image.ts` → ≤800px JPEG q0.7**, validasi tipe/ukuran, fallback in-memory bila storage penuh), tombol "Saya sudah bayar" → `menunggu_verifikasi`. State `pending`, `menunggu_verifikasi`, `paid`, `ditolak`, `expired` punya tampilan berbeda.
- **Modul:** Checkout · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-37
- **Estimasi:** 3 jam
- **File:** `src/pages/public/order-payment.tsx`, `src/features/checkout/components/qris-panel.tsx`, `proof-upload.tsx`, `public/qris.svg`
- **Commit:** `feat(checkout): add qris payment page with compressed proof upload`

## T-39 — E-ticket `/order/:orderId/tiket`
- **Deskripsi:** Kartu tiket (orderId mono, event, tanggal, peserta, jumlah, total, status badge), garis putus-putus sebagai pembatas stub, tombol print (CSS print tanpa latar warna), tombol "Beri ulasan" (aktif hanya `paid` dan belum review), tombol "Lihat tiket saya".
- **Modul:** Checkout · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-38
- **Estimasi:** 2 jam
- **File:** `src/pages/public/order-ticket.tsx`, `src/features/checkout/components/e-ticket.tsx`
- **Commit:** `feat(checkout): add printable e-ticket page with review cta`

---

# M7 — Personal Site & Review

## T-40 — Profil publik `/@:username`
- **Deskripsi:** Header (avatar, nama, headline, bio, lokasi), skill chips, pendidikan, section "Sertifikasi & Event Terverifikasi" — hanya booking `paid` milik user, tiap item: judul event, mitra, tanggal selesai, badge terverifikasi, link detail. Portfolio sebagai daftar baris bergaris, bukan grid kartu. Empty state bila kosong. 404 bila username tidak ada.
- **Modul:** Personal Site · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-39
- **Estimasi:** 3 jam
- **File:** `src/pages/public/profile-public.tsx`, `src/features/profile/components/profile-header.tsx`, `portfolio-section.tsx`
- **Commit:** `feat(profile): add public personal site with verified portfolio`

## T-41 — Blog publik di personal site
- **Deskripsi:** Daftar post (judul, excerpt, tanggal), detail `/@:username/posts/:postSlug`, render multi-paragraf, copy link, empty state.
- **Modul:** Personal Site · **Prioritas:** Mid · **Status:** Todo
- **Dependensi:** T-40
- **Estimasi:** 2 jam
- **File:** `src/pages/public/profile-post.tsx`, `src/features/profile/components/post-list.tsx`, `post-detail.tsx`
- **Commit:** `feat(profile): add public blog pages`

## T-42 — Edit profil & personal site `/akun/profil`
- **Deskripsi:** Form bio, headline, lokasi, skills (tag input), pendidikan (repeatable), avatar (kompres via `lib/image.ts`). Preview URL personal site + "Lihat profil publik". Validasi zod, toast sukses.
- **Modul:** Personal Site · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-40
- **Estimasi:** 2.5 jam
- **File:** `src/pages/user/edit-profile.tsx`, `src/features/profile/components/profile-form.tsx`
- **Commit:** `feat(profile): add profile and personal site editor`

## T-43 — CRUD post `/akun/posts`
- **Deskripsi:** List post milik user, buat/edit/hapus dengan `AlertDialog`, editor sederhana (judul, isi textarea), status draft/published.
- **Modul:** Personal Site · **Prioritas:** Mid · **Status:** Todo
- **Dependensi:** T-42
- **Estimasi:** 2.5 jam
- **File:** `src/pages/user/my-posts.tsx`, `src/features/profile/components/post-editor.tsx`
- **Commit:** `feat(profile): add post management for personal site`

## T-44 — Form ulasan verified
- **Deskripsi:** `ReviewForm`: rating bintang (`radiogroup` aksesibel + keyboard), teks min 20 karakter, foto opsional. Guard: hanya jika ada booking `paid` untuk event itu dan belum pernah review. Submit → `recomputeAggregates()` jalan, toast, item muncul.
- **Modul:** Personal Site · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-40
- **Estimasi:** 2.5 jam
- **File:** `src/features/reviews/components/review-form.tsx`, `src/store/slices/review.slice.ts`
- **Commit:** `feat(reviews): add verified review submission`

## T-45 — Ulasan saya `/akun/ulasan`
- **Deskripsi:** Event yang menunggu diulas (booking `paid` tanpa review) + ulasan yang sudah dibuat (edit/hapus). CTA langsung ke form.
- **Modul:** Personal Site · **Prioritas:** Mid · **Status:** Todo
- **Dependensi:** T-44
- **Estimasi:** 1.5 jam
- **File:** `src/pages/user/my-reviews.tsx`
- **Commit:** `feat(reviews): add personal review management page`

---

# M8 — Mitra Dashboard

## T-46 — Analytics mitra (fungsi murni)
- **Deskripsi:** `features/mitra/lib/analytics.ts`: total pendaftar, gross, komisi, net, tren per bulan, top event, konversi kuota. Filter rentang tanggal + event. Tanpa React.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-45
- **Estimasi:** 2 jam
- **File:** `src/features/mitra/lib/analytics.ts`
- **Commit:** `feat(mitra): add analytics calculations for dashboard`

## T-47 — Dashboard `/mitra`
- **Deskripsi:** 4 stat card (pendaftar, gross, komisi 5%, net) tanpa ikon dekoratif, `RevenueChart` (area chart: seri utama `--ink-blue` 2px, komisi `--highlighter` 2px, gridline horizontal saja), tabel event terbaru, daftar pembayaran menunggu verifikasi. Filter rentang tanggal.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-46
- **Estimasi:** 3 jam
- **File:** `src/pages/mitra/dashboard.tsx`, `src/features/mitra/components/revenue-chart.tsx`, `stat-cards.tsx`
- **Commit:** `feat(mitra): add dashboard with revenue analytics`

## T-48 — Tabel event `/mitra/events`
- **Deskripsi:** Tabel (judul, kategori, tanggal, kuota terisi/total, harga, status) + filter status, pencarian, sort kolom, pagination. Aksi: edit, peserta, publish/unpublish (konfirmasi), hapus (hanya draft). Angka & uang rata kanan mono. Mobile → daftar kartu.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-47
- **Estimasi:** 3 jam
- **File:** `src/pages/mitra/event-list.tsx`, `src/features/mitra/components/event-table.tsx`
- **Commit:** `feat(mitra): add event management table`

## T-49 — Form event `/mitra/events/new` & `/edit`
- **Deskripsi:** Multi-section (Info dasar, Jadwal & lokasi, Silabus & target pencapaian repeatable, Harga & kuota, Cover). Simpan draft atau publish. Gate: publish diblokir bila profil/rekening belum lengkap → alert + link pengaturan. Validasi zod.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-48
- **Estimasi:** 4 jam
- **File:** `src/pages/mitra/event-form.tsx`, `src/features/mitra/components/event-form/*`
- **Commit:** `feat(mitra): add event create and edit form`

## T-50 — Peserta & verifikasi pembayaran `/mitra/events/:id/peserta`
- **Deskripsi:** Tabel peserta (nama, email, hp, jumlah, total, status, bukti), preview bukti di dialog, aksi Verifikasi (→ `paid`, terbitkan tiket) dan Tolak (→ `ditolak` + alasan). Export CSV via Blob. Ringkasan pendapatan dengan rincian komisi.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-49
- **Estimasi:** 3.5 jam
- **File:** `src/pages/mitra/participants.tsx`, `src/features/mitra/components/participant-table.tsx`, `proof-dialog.tsx`
- **Commit:** `feat(mitra): add participant table with payment verification`

## T-51 — Pengaturan mitra `/mitra/pengaturan`
- **Deskripsi:** Form profil lembaga (nama, slug, deskripsi, logo, kota) + rekening (bank, nomor, atas nama). Indikator kelengkapan yang mengontrol izin publish. Toast sukses.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-47
- **Estimasi:** 2 jam
- **File:** `src/pages/mitra/settings.tsx`, `src/features/mitra/components/partner-settings-form.tsx`
- **Commit:** `feat(mitra): add partner profile and bank account settings`

## T-52 — Layout mitra (sidebar)
- **Deskripsi:** `MitraLayout` dengan sidebar shadcn (Dashboard, Event, Pengaturan), breadcrumb, user menu, collapse ke `Sheet` di mobile, indikator role. Guard `RequireRole` di route group.
- **Modul:** Mitra · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-47
- **Estimasi:** 2 jam
- **File:** `src/components/layout/mitra-layout.tsx`, `src/app/router.tsx`
- **Commit:** `feat(mitra): add dashboard layout with responsive sidebar`

---

# M9 — Akun User & Polish

## T-53 — Layout akun + ringkasan `/akun`
- **Deskripsi:** `AccountLayout` (tab: Ringkasan, Tiket, Ulasan, Profil, Post), halaman ringkasan (statistik tiket, event mendatang, CTA lengkapi profil).
- **Modul:** Akun · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-52
- **Estimasi:** 2 jam
- **File:** `src/components/layout/account-layout.tsx`, `src/pages/user/account-dashboard.tsx`
- **Commit:** `feat(account): add account layout and dashboard summary`

## T-54 — Tiket & riwayat `/akun/tiket`
- **Deskripsi:** Daftar booking dengan filter status, kartu ringkas (event, tanggal, status, total), aksi lanjutkan pembayaran / lihat tiket / beri ulasan sesuai status.
- **Modul:** Akun · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-53
- **Estimasi:** 2 jam
- **File:** `src/pages/user/my-tickets.tsx`, `src/features/checkout/components/booking-card.tsx`
- **Commit:** `feat(account): add ticket history page`

## T-55 — Konsistensi state (loading, empty, error, disabled)
- **Deskripsi:** Audit semua halaman: list punya empty state dengan CTA, form punya state submitting (spinner + disabled), aksi async punya toast sukses/gagal, skeleton untuk lazy load. Checklist di `docs/state-audit.md`.
- **Modul:** Akun · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-54
- **Estimasi:** 3 jam
- **File:** `src/**/*`, `docs/state-audit.md`
- **Commit:** `refactor(ui): standardize loading empty and error states`

## T-56 — Aksesibilitas
- **Deskripsi:** Audit terhadap `.agents/2-DESIGN.md` §9: semua pasangan warna lolos AA (tabel §2), semua input punya `<label>`, focus ring 2px `--ink-blue` offset 2px, urutan tab logis, `aria-*` pada rating/upload/countdown, status tidak hanya warna, satu `h1` per halaman, skip link, `prefers-reduced-motion`. Hasil di `docs/a11y-audit.md`.
- **Modul:** Akun · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-55
- **Estimasi:** 3 jam
- **File:** `src/**/*`, `docs/a11y-audit.md`
- **Commit:** `fix(a11y): improve contrast labels and keyboard navigation`

## T-57 — Mobile pass 360px
- **Deskripsi:** Cek semua halaman di 360/768/1280: tanpa horizontal scroll, tap target ≥44px, tabel jadi card list, filter jadi Sheet, sticky CTA tidak menutupi konten. Catat di `docs/responsive-audit.md`.
- **Modul:** Akun · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-56
- **Estimasi:** 3 jam
- **File:** `src/**/*`, `docs/responsive-audit.md`
- **Commit:** `fix(layout): make all pages usable at 360px`

---

# M10 — Verifikasi & Dokumentasi

## T-58 — Build & typecheck bersih
- **Deskripsi:** `npx tsc --noEmit` tanpa error, `npm run build` sukses, hapus `console.log` sisa, cek tidak ada aset tak terpakai.
- **Modul:** Verifikasi · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-57
- **Estimasi:** 1 jam
- **File:** `src/**/*`
- **Commit:** `chore: fix typecheck and build warnings`

## T-59 — Smoke test Playwright alur kritis
- **Deskripsi:** Load skill `playwright-cli`. Skenario user: landing → search → detail → checkout → upload bukti → tiket. Skenario mitra: login → verifikasi bayar → tiket `paid` → dashboard pendapatan. Skenario profil: login → ulasan → profil publik menampilkan badge. Skrip di `e2e/smoke.spec.ts` + screenshot 3 breakpoint di `docs/screenshots/`.
- **Modul:** Verifikasi · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-58
- **Estimasi:** 4 jam
- **File:** `e2e/smoke.spec.ts`, `docs/screenshots/*`
- **Commit:** `test(e2e): add smoke tests for critical flows`

## T-60 — README final & batasan prototype
- **Deskripsi:** README: install/run, akun demo (user & mitra), peta route, daftar skill, struktur folder, batasan prototype (pembayaran simulasi, upload lokal, auth mock, tanpa admin platform), tombol reset demo data, rujukan `.agents/2-DESIGN.md`.
- **Modul:** Verifikasi · **Prioritas:** High · **Status:** Todo
- **Dependensi:** T-59
- **Estimasi:** 1.5 jam
- **File:** `README.md`
- **Commit:** `docs: finalize readme with demo accounts and limitations`

---

## Traceability PRD → Task

| FR / Modul PRD | Task |
|---|---|
| FR-01 Autentikasi | T-22, T-23, T-24 |
| FR-02 Profil personal site | T-40, T-42 |
| FR-03 Portfolio terverifikasi | T-40, T-50 |
| FR-04 Pencarian & filter | T-30, T-31 |
| FR-05 Detail event | T-32, T-34 |
| FR-06 Checkout & pemesanan | T-35, T-36, T-37 |
| FR-07 Pembayaran + komisi 5% | T-35, T-38, T-50 |
| FR-08 Ulasan verified | T-44, T-45, T-34 |
| FR-09 Manajemen listing | T-48, T-49 |
| FR-10 Analytics & data peserta | T-46, T-47, T-50 |
| NFR Mobile-first & aksesibilitas | T-56, T-57 |
| NFR Performa (lazy load) | T-15, T-55 |
| Revenue config (komisi) | T-12, T-35 |

## Di Luar Scope (tidak dibuat task)

- Payment gateway nyata (Xendit/Midtrans) — V1.1
- Mobile app native
- Integrasi kalender
- Multi-admin per mitra
- Sertifikasi blockchain
- Panel admin platform
- Email/OTP nyata, backend, database
- Dark mode

---

## Checklist Audit

- [x] Tidak ada task yang bergantung pada task setelahnya (T-24 guard, T-23 auth dipindah)
- [x] Setiap FR di PRD punya task (tabel traceability)
- [x] Tidak ada task backend/DB yang tidak relevan
- [x] Agregat rating punya satu sumber kebenaran (`recomputeAggregates`)
- [x] Nama komponen shadcn diverifikasi sebelum dipasang (T-04)
- [x] Batas localStorage ditangani (kompresi gambar, fallback in-memory)
- [x] Satu task = satu commit, pesan commit jelas
- [x] Estimasi total wajar (~118 jam)
- [x] Batasan prototype dinyatakan eksplisit
- [x] Semua task UI merujuk `.agents/2-DESIGN.md`
- [x] Palet hanya putih + kuning + biru (tanpa cream, gradasi, ungu)
- [x] Setiap halaman melewati checklist anti-slop §11 sebelum commit

# TASK LIST — Prototype Frontend "Ketemu"

**Sumber acuan:** `.agents/1-PRD.md` (produk), `.agents/2-DESIGN.md` (visual), `.agents/3-TASKS` (eksekusi)
**Tanggal dibuat:** 2026-10-28
**Tipe:** static frontend prototype (Vite + React + TS + React Router + Tailwind v4 + shadcn/ui)
**Backend:** tidak ada. Data statis TS + localStorage.
**Status global:** semua task `Todo`

---

## Aturan Eksekusi

1. **Satu task = satu commit.** Tidak boleh menumpuk dua task dalam satu commit.
2. Format commit: Conventional Commits, scope = nama modul.
   Contoh: `feat(events): add filter bar with category and price range`
3. Task dikerjakan berurutan sesuai dependensi. Task tanpa dependensi boleh paralel.
4. Definition of Done tiap task: kode jalan (`npm run dev`), tidak ada error TypeScript, tidak ada `any`, file < 250 baris, responsive 360px, tidak ada import relatif berantai (`../../`).
5. Skill yang wajib di-load per jenis task:
   - Semua task UI → `antislop` + `antislop-ui` + `shadcn/ui`
   - Task layout/halaman → tambah `antislop-layoutmobile`
   - Task form/aksesibilitas → tambah `antislop-human`
   - Task copy/landing → tambah `antislop-copywriting`
   - Task komponen kode → tambah `antislop-code`

---

## Ringkasan Modul

| Modul | Task | Jumlah | Fokus |
|---|---|---|---|
| M0 Foundation | T-01 … T-08 | 8 | repo, toolchain, skill, deps |
| M1 Design System | T-09 … T-12 | 4 | token, tipografi, primitif UI |
| M2 Shell & Routing | T-13 … T-17 | 5 | layout, route tree, guard |
| M3 Data & Store | T-18 … T-23 | 6 | types, seed, store, auth mock |
| M4 Landing Page | T-24 … T-28 | 5 | hero, kategori, event populer, CTA mitra |
| M5 Discovery & Detail | T-29 … T-33 | 5 | filter, sort, detail event, profil mitra |
| M6 Checkout & Payment | T-34 … T-39 | 6 | form peserta, QRIS, e-ticket |
| M7 Personal Site & Review | T-40 … T-45 | 6 | profil publik, post, ulasan verified |
| M8 Mitra Dashboard | T-46 … T-52 | 7 | analytics, CRUD event, peserta, rekening |
| M9 Akun User & Polish | T-53 … T-57 | 5 | dashboard user, state, a11y |
| M10 Verifikasi & Docs | T-58 … T-60 | 3 | build, smoke test, readme |
| **Total** | | **60** | |

---

# M0 — Foundation

## T-01 — Inisialisasi repo & git hygiene
- **Deskripsi:** `git init`, buat `.gitignore` (`node_modules`, `dist`, `.env*`, `*.local`, `.DS_Store`), `README.md` kerangka (judul, cara run, akun demo placeholder, batasan prototype).
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** —
- **Estimasi:** 0.5 jam
- **File:** `.gitignore`, `README.md`
- **Commit:** `chore: initialize repository with gitignore and readme`

## T-02 — Scaffold Vite + React + TypeScript
- **Deskripsi:** `npm create vite@latest . -- --template react-ts`, bersihkan boilerplate (logo, counter, `App.css`), pastikan `npm run dev` dan `npm run build` jalan.
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-01
- **Estimasi:** 0.5 jam
- **File:** `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`
- **Commit:** `chore: scaffold vite react typescript app`

## T-03 — Tailwind v4 + path alias
- **Deskripsi:** Pasang `tailwindcss` + `@tailwindcss/vite`, ganti isi `src/index.css` ke `@import "tailwindcss"`. Set alias `@/*` di `vite.config.ts` dan `tsconfig.app.json` (`baseUrl` + `paths`).
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-02
- **Estimasi:** 0.5 jam
- **File:** `vite.config.ts`, `tsconfig.app.json`, `src/index.css`
- **Commit:** `chore: add tailwind v4 and path alias`

## T-04 — Inisialisasi shadcn/ui
- **Deskripsi:** Jalankan `npx shadcn@latest init` (base `radix`, style `new-york`, base color netral, CSS variables). Verifikasi `components.json` dan `src/lib/utils.ts` (`cn()`).
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-03
- **Estimasi:** 0.5 jam
- **File:** `components.json`, `src/lib/utils.ts`, `src/index.css`
- **Commit:** `chore: initialize shadcn ui design system`

## T-05 — Install komponen shadcn batch 1 (dasar)
- **Deskripsi:** `npx shadcn@latest add button card input label badge avatar separator skeleton sonner`
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 0.5 jam
- **File:** `src/components/ui/*`
- **Commit:** `chore(ui): add base shadcn components`

## T-06 — Install komponen shadcn batch 2 (navigasi & overlay)
- **Deskripsi:** `sheet dialog alert-dialog dropdown-menu tabs breadcrumb navigation-menu pagination tooltip popover`
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 0.5 jam
- **File:** `src/components/ui/*`
- **Commit:** `chore(ui): add navigation and overlay components`

## T-07 — Install komponen shadcn batch 3 (form & data)
- **Deskripsi:** `form select checkbox radio-group textarea switch calendar progress table chart empty spinner field input-group`
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 0.5 jam
- **File:** `src/components/ui/*`
- **Commit:** `chore(ui): add form and data components`

## T-08 — Dependensi runtime + skills
- **Deskripsi:** Install `react-router-dom recharts lucide-react date-fns zod react-hook-form sonner` + `@fontsource/instrument-sans @fontsource/jetbrains-mono`. Install skills ke project:
  - `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` (anti-slop + browser check)
  - `npx skills add anthropics/skills@frontend-design`
  - `npx skills add shadcn/ui`
  - `npx skills add anthropics/skills@webapp-testing`

  Catat di README bagian "Skills". Acuan visual: `.agents/2-DESIGN.md`.
- **Modul:** Foundation
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-02
- **Estimasi:** 1 jam
- **File:** `package.json`, `README.md`, `.agents/skills/*`
- **Commit:** `chore: add runtime dependencies and ai skills`

---

# M1 — Design System

## T-09 — Terapkan arah desain dari `.agents/2-DESIGN.md`
- **Deskripsi:** Baca `.agents/2-DESIGN.md` §0–§4 (konsep "Kertas kerja", palet putih + kuning stabilo + biru tinta, tipografi Instrument Sans + JetBrains Mono, layout grid 1160px). Verifikasi tiap token masih sesuai; bila ada penyimpangan catat di `docs/design-decisions.md` beserta alasan. Lalu jalankan review anti-default terhadap §11: pastikan tidak ada cream background, gradasi, ungu, eyebrow ALL-CAPS, 3 kartu fitur identik, hover lift, atau animasi scroll.
- **Modul:** Design System
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-08
- **Estimasi:** 1 jam
- **File:** `.agents/2-DESIGN.md`, `docs/design-decisions.md`
- **Commit:** `docs(design): validate design system against anti-slop checklist`

## T-10 — Token warna & radius (light only)
- **Deskripsi:** Terapkan `@theme` + CSS variables dari `.agents/2-DESIGN.md` §10 ke `src/index.css`: 12 token warna (`paper`, `paper-2`, `ink`, `ink-soft`, `line`, `line-strong`, `highlighter`, `ink-blue`, `ink-blue-soft`, `success`, `danger`, `warning`), radius 6/10, `--shadow-overlay`. Map ke variabel shadcn (`--background`, `--primary`, `--accent`, `--ring`, dst.). Tanpa dark mode. Verifikasi kontras sesuai tabel §2.
- **Modul:** Design System
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-09
- **Estimasi:** 1.5 jam
- **File:** `src/index.css`
- **Commit:** `feat(design): apply paper ink and highlighter color tokens`

## T-11 — Tipografi & skala
- **Deskripsi:** Muat `@fontsource/instrument-sans` (400/500/600/700) + `@fontsource/jetbrains-mono` (400/500). Definisikan `--font-sans`, `--font-mono`, utility skala `.text-display`…`.text-micro` sesuai `.agents/2-DESIGN.md` §3. Terapkan `tabular-nums` pada kelas `.num`. Body 16/1.55, max lebar baris 68ch, sentence case.
- **Modul:** Design System
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-10
- **Estimasi:** 1 jam
- **File:** `src/index.css`, `src/main.tsx`, `package.json`
- **Commit:** `feat(design): add typography scale with instrument sans and jetbrains mono`

## T-12 — Utility & konstanta bersama
- **Deskripsi:** `src/lib/format.ts` (format IDR tanpa desimal, tanggal `id-ID` panjang & pendek, format relatif), `src/lib/storage.ts` (wrapper localStorage aman + versioning + fallback), `src/lib/constants.ts` (`KATEGORI`, `SORT_OPTIONS`, `BOOKING_STATUS`, `EVENT_STATUS`, `KOMISI_RATE = 0.05`, `HOLD_MINUTES = 15`), `src/lib/id.ts` (order id generator deterministik untuk mock).
- **Modul:** Design System
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-04
- **Estimasi:** 1.5 jam
- **File:** `src/lib/format.ts`, `src/lib/storage.ts`, `src/lib/constants.ts`, `src/lib/id.ts`
- **Commit:** `feat(lib): add formatting, storage, and domain constants`

---

# M2 — App Shell & Routing

## T-13 — Struktur folder feature-first
- **Deskripsi:** Buat kerangka direktori kosong dengan `.gitkeep` sesuai plan: `src/app`, `src/components/{layout,common}`, `src/features/{events,partners,checkout,reviews,profile,mitra,auth}`, `src/pages/{public,auth,user,mitra,system}`, `src/store/slices`, `src/types`, `docs`.
- **Modul:** Shell & Routing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-12
- **Estimasi:** 0.5 jam
- **File:** struktur direktori
- **Commit:** `chore: add feature-first folder structure`

## T-14 — Providers & root app
- **Deskripsi:** `src/app/providers.tsx` (AppStoreProvider placeholder, `Toaster` sonner, theme class), `src/App.tsx` render `RouterProvider`, `src/main.tsx` mounting. Hapus sisa boilerplate.
- **Modul:** Shell & Routing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-13
- **Estimasi:** 1 jam
- **File:** `src/app/providers.tsx`, `src/App.tsx`, `src/main.tsx`
- **Commit:** `feat(app): add providers and root application`

## T-15 — Route tree lengkap (lazy + placeholder)
- **Deskripsi:** `src/app/router.tsx` dengan `createBrowserRouter`: semua 18 route dari plan, `React.lazy` per halaman, `Suspense` fallback `PageSkeleton`, `errorElement`. Setiap halaman placeholder minimal (judul + breadcrumb).
- **Modul:** Shell & Routing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-14
- **Estimasi:** 2 jam
- **File:** `src/app/router.tsx`, `src/pages/**/*.tsx`
- **Commit:** `feat(app): add complete route tree with lazy pages`

## T-16 — App shell (header, footer, mobile nav)
- **Deskripsi:** `AppShell` (skip-link, `SiteHeader` sticky, `Outlet`, `SiteFooter`), `SiteHeader` (logo, nav Discover / Untuk Mitra, search trigger, tombol Masuk/Daftar atau user menu, badge "Prototype"), `MobileNav` via `Sheet`, `SiteFooter` (kolom link, label prototype, tombol "Reset demo data" placeholder). Active link state via `NavLink`.
- **Modul:** Shell & Routing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-15
- **Estimasi:** 2.5 jam
- **File:** `src/components/layout/*`
- **Commit:** `feat(shell): add app shell with responsive header and footer`

## T-17 — Route guard & halaman sistem
- **Deskripsi:** `src/app/guards.tsx`: `RequireAuth` (redirect `/login?next=`), `RequireRole` (render `/403`). Halaman `not-found.tsx` dan `forbidden.tsx` dengan CTA balik.
- **Modul:** Shell & Routing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-16
- **Estimasi:** 1 jam
- **File:** `src/app/guards.tsx`, `src/pages/system/*`
- **Commit:** `feat(app): add route guards and system pages`

---

# M3 — Data & Store

## T-18 — Domain types per feature
- **Deskripsi:** Tulis `types.ts` di tiap feature: `events` (Event, EventStatus, EventCategory), `partners` (Partner, Rekening), `checkout` (Booking, BookingStatus, PaymentProof), `reviews` (Review), `profile` (User, Post, Education, Skill), `auth` (Session, AccountType). `src/types/index.ts` hanya re-export. Tanpa `any`, tanggal sebagai ISO string.
- **Modul:** Data & Store
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-17
- **Estimasi:** 1.5 jam
- **File:** `src/features/*/types.ts`, `src/types/index.ts`
- **Commit:** `feat(types): add domain types for all features`

## T-19 — Seed mitra & user
- **Deskripsi:** `partners.seed.ts` (6 mitra Jakarta: lembaga IT, bootcamp, komunitas, penyelenggara hackathon, dll — lengkap slug, logo, rating agregat, rekening), `users.seed.ts` (3 user + 1 akun mitra, headline, bio, skills, education, username unik).
- **Modul:** Data & Store
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-18
- **Estimasi:** 2 jam
- **File:** `src/features/partners/data/partners.seed.ts`, `src/features/profile/data/users.seed.ts`
- **Commit:** `feat(data): add partner and user seed data`

## T-20 — Seed event
- **Deskripsi:** 14 event realistis: 4 course, 4 workshop, 3 seminar, 3 kompetisi. Campur gratis/berbayar, online/offline Jakarta, kuota & terisi bervariasi, silabus + target pencapaian terisi, status mayoritas `active` + 1 `draft` + 1 `selesai`. Cover pakai aset lokal `public/covers/*.svg` (dibuat sendiri, bukan hotlink).
- **Modul:** Data & Store
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-19
- **Estimasi:** 2.5 jam
- **File:** `src/features/events/data/events.seed.ts`, `public/covers/*.svg`
- **Commit:** `feat(data): add event seed data and local cover assets`

## T-21 — Seed review, post, booking
- **Deskripsi:** 24 review tersebar (semua berasal dari booking `paid` — konsisten dengan aturan verified), 6 post blog, 5 booking contoh dengan status berbeda (`paid`, `menunggu_verifikasi`, `pending`, `expired`). Pastikan agregat rating event/mitra cocok dengan data review.
- **Modul:** Data & Store
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-20
- **Estimasi:** 2 jam
- **File:** `src/features/reviews/data/reviews.seed.ts`, `src/features/profile/data/posts.seed.ts`, `src/features/checkout/data/bookings.seed.ts`
- **Commit:** `feat(data): add review, post, and booking seed data`

## T-22 — App store (context + reducer + persist)
- **Deskripsi:** `src/store/app-store.tsx`: state tunggal `{auth, users, partners, events, bookings, reviews, posts}`, reducer gabungan dari `src/store/slices/*` (satu file reducer per domain, di-combine di `app-store.tsx`), persist ke localStorage via `storage.ts` (key `ketemu:v1`), `resetDemoData()`. `selectors.ts` untuk turunan (event by slug, booking by orderId, rating agregat, revenue mitra).
- **Modul:** Data & Store
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-21
- **Estimasi:** 3 jam
- **File:** `src/store/app-store.tsx`, `src/store/selectors.ts`
- **Commit:** `feat(store): add persisted app store with domain selectors`

## T-23 — Auth mock & akun demo
- **Deskripsi:** `features/auth/lib/mock-auth.ts`: login by email+password (kredensial demo hardcoded), register (tambah user ke store), logout, switch akun cepat untuk demo. Hook `useAuth`, `useCurrentUser`. Tampilkan kredensial demo di README + di halaman login (accordion "Akun demo").
- **Modul:** Data & Store
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-22
- **Estimasi:** 1.5 jam
- **File:** `src/features/auth/lib/mock-auth.ts`, `src/features/auth/hooks/use-auth.ts`, `README.md`
- **Commit:** `feat(auth): add mock authentication with demo accounts`

---

# M4 — Landing Page

## T-24 — Override primitif shadcn + komponen bersama
- **Deskripsi:** Sesuai `.agents/2-DESIGN.md` §6: override `Button` (varian `primary`/`secondary`/`ghost`/`destructive`/`highlight`, radius 6px, tinggi 40/44px, state lengkap), `Card` (hapus `shadow-sm`, border `--line`, radius 10px, hover hanya ubah border), `Badge` (pill + tint semantik), `Input` (tinggi 40px, focus ring biru). Lalu buat `components/common/`: `Section`, `PageHeader`, `StatCard`, `Price`, `RatingStars`, `VerifiedBadge`, `CategoryIcon`, `EmptyState`, `PageSkeleton`, `ErrorState`.
- **Modul:** Landing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-23
- **Estimasi:** 3 jam
- **File:** `src/components/ui/{button,card,badge,input}.tsx`, `src/components/common/*`
- **Commit:** `feat(ui): override shadcn primitives and add shared components`

## T-25 — EventCard & PartnerCard
- **Deskripsi:** `EventCard` (cover 16:9, badge kategori, judul clamp 2 baris, mitra + verified badge, rating, harga, kuota tersisa, state sold-out), varian `default` dan `compact`. `PartnerCard` (logo, nama, rating, jumlah event). Keduanya pakai `Link` ke detail.
- **Modul:** Landing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-24
- **Estimasi:** 2 jam
- **File:** `src/features/events/components/event-card.tsx`, `src/features/partners/components/partner-card.tsx`
- **Commit:** `feat(events): add event and partner cards`

## T-26 — Hero + search fungsional
- **Deskripsi:** Hero landing sesuai `.agents/2-DESIGN.md` §7: headline `display` 56px dengan **satu sapuan stabilo `--highlighter`** di belakang satu frasa (teks tetap `--ink`), subcopy maks 2 baris, form search (keyword + kategori select + kota) dengan tombol `primary`, baris statistik mono 13px dari data nyata (event aktif, mitra, ulasan). Satu-satunya animasi masuk halaman (opacity 240ms, hormati reduced-motion). Submit → `/events?q=&kategori=&kota=`. Copy pakai `antislop-copywriting`, tanpa klaim kosong.
- **Modul:** Landing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-25
- **Estimasi:** 2.5 jam
- **File:** `src/pages/public/landing/hero-section.tsx`, `src/pages/public/landing/search-form.tsx`
- **Commit:** `feat(landing): add hero section with highlighter accent and search`

## T-27 — Section kategori, event populer, mitra teratas
- **Deskripsi:** 4 tile kategori (ikon + label + jumlah event, link ke `/events?kategori=`), grid 6 event populer (sort rating/terisi), strip mitra teratas (logo + rating).
- **Modul:** Landing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-26
- **Estimasi:** 2 jam
- **File:** `src/pages/public/landing/category-section.tsx`, `popular-events-section.tsx`, `top-partners-section.tsx`
- **Commit:** `feat(landing): add category, popular events, and partner sections`

## T-28 — Section value prop, teaser personal site, CTA mitra, footer
- **Deskripsi:** "Kenapa Ketemu": 3 baris bernomor tipografis dengan garis pemisah 1px (bukan 3 kartu identik, bukan ikon dalam lingkaran). Teaser personal site: mock profil + badge terverifikasi, tampil sebagai panel bergaris. CTA mitra: tombol varian `highlight` (kuning stabilo, teks `--ink`). Footer: kolom link, label "Prototype" 12px, tombol Reset demo data. Rakit `landing.tsx`, semua section dipisah garis rambut, spacing 96/64.
- **Modul:** Landing
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-27
- **Estimasi:** 2.5 jam
- **File:** `src/pages/public/landing/*`, `src/pages/public/landing.tsx`
- **Commit:** `feat(landing): complete landing page with value props and partner cta`

---

# M5 — Discovery & Detail

## T-29 — Filter & sort logic (murni, teruji manual)
- **Deskripsi:** `features/events/lib/filter-events.ts`: filter keyword (judul + mitra + kota), kategori multi, rentang harga, rentang tanggal, hanya event `active` + kuota > 0; sort `termurah | terpopuler | terdekat | terbaru`. Fungsi murni, tanpa React, mudah dites.
- **Modul:** Discovery
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-28
- **Estimasi:** 1.5 jam
- **File:** `src/features/events/lib/filter-events.ts`
- **Commit:** `feat(events): add pure filtering and sorting logic`

## T-30 — Halaman discovery `/events`
- **Deskripsi:** URL search params sebagai source of truth (`useSearchParams`). `FilterBar` (desktop sidebar sticky, mobile `Sheet`), `SortSelect`, chip filter aktif yang bisa dihapus, counter hasil, grid responsif 1/2/3 kolom, `EmptyState` dengan CTA reset filter, skeleton saat transisi.
- **Modul:** Discovery
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-29
- **Estimasi:** 3 jam
- **File:** `src/pages/public/event-list.tsx`, `src/features/events/components/filter-bar.tsx`, `sort-select.tsx`, `active-filters.tsx`
- **Commit:** `feat(events): add discovery page with url-driven filters`

## T-31 — Detail event `/events/:slug`
- **Deskripsi:** Cover + breadcrumb, header (judul, mitra, rating, kategori, lokasi/tanggal, sisa kuota real-time), tab/segmen: Deskripsi, Silabus, Target Pencapaian, Ulasan. Sidebar sticky (harga, CTA "Daftar Sekarang", info hold 15 menit, tombol simpan/bookmark). State 404 bila slug tidak ada.
- **Modul:** Discovery
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-30
- **Estimasi:** 3 jam
- **File:** `src/pages/public/event-detail.tsx`, `src/features/events/components/event-detail-*.tsx`
- **Commit:** `feat(events): add event detail page with syllabus and reviews`

## T-32 — Profil mitra publik `/mitra/:slug`
- **Deskripsi:** Header mitra (logo, nama, verified, rating agregat, jumlah event & ulasan), deskripsi lembaga, grid event aktif, ringkasan ulasan terbaru. 404 bila tidak ada.
- **Modul:** Discovery
- **Prioritas:** Mid
- **Status:** Todo
- **Dependensi:** T-31
- **Estimasi:** 2 jam
- **File:** `src/pages/public/partner-detail.tsx`, `src/features/partners/components/*`
- **Commit:** `feat(partners): add public partner profile page`

## T-33 — Review list & summary (read-only)
- **Deskripsi:** `ReviewSummary` (rata-rata, distribusi bintang 1–5 sebagai bar), `ReviewList` (avatar, nama, tanggal, rating, teks, badge "Terverifikasi"), pagination/limit + "lihat semua". Dipakai di detail event dan profil mitra.
- **Modul:** Discovery
- **Prioritas:** Mid
- **Status:** Todo
- **Dependensi:** T-31
- **Estimasi:** 2 jam
- **File:** `src/features/reviews/components/review-summary.tsx`, `review-list.tsx`
- **Commit:** `feat(reviews): add review summary and list components`

---

# M6 — Checkout & Payment

## T-34 — Logika harga & komisi
- **Deskripsi:** `features/checkout/lib/pricing.ts`: hitung `subtotal = harga × jumlah`, `biayaLayanan` (config, 0 untuk event gratis), `total`, `komisi = subtotal × 0.05`, `netMitra = subtotal − komisi`. Semua pembulatan ke rupiah. Fungsi murni + `CommissionBreakdown` menampilkan rincian transparan.
- **Modul:** Checkout
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-33
- **Estimasi:** 1.5 jam
- **File:** `src/features/checkout/lib/pricing.ts`, `src/features/checkout/components/commission-breakdown.tsx`
- **Commit:** `feat(checkout): add pricing logic with 5 percent commission split`

## T-35 — Form peserta `/checkout/:slug`
- **Deskripsi:** RHF + zod: nama, email, no HP, jumlah tiket (1..sisa kuota), checkbox setuju S&K. Ringkasan order sticky di kanan (mobile: di bawah). Validasi inline dengan pesan bahasa Indonesia. Event gratis → tombol "Daftar gratis" tanpa pembayaran. Event penuh → blokir dengan pesan jelas.
- **Modul:** Checkout
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-34
- **Estimasi:** 3 jam
- **File:** `src/pages/public/checkout.tsx`, `src/features/checkout/components/participant-form.tsx`, `order-summary.tsx`
- **Commit:** `feat(checkout): add participant form with validated order summary`

## T-36 — Buat booking + countdown hold
- **Deskripsi:** Submit form → action `createBooking` (generate `orderId`, set `expiresAt = now + 15 menit`, kurangi kuota sementara) → redirect `/order/:orderId`. `Countdown` komponen menampilkan sisa waktu; saat habis → status `expired`, kuota dikembalikan, tampilkan state expired dengan CTA ulangi.
- **Modul:** Checkout
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-35
- **Estimasi:** 2.5 jam
- **File:** `src/features/checkout/components/countdown.tsx`, `src/store/slices/booking.slice.ts`
- **Commit:** `feat(checkout): add booking creation with 15 minute hold countdown`

## T-37 — Halaman pembayaran QRIS `/order/:orderId`
- **Deskripsi:** Panel QRIS (gambar QR statis lokal), nominal + kode unik, instruksi 3 langkah, `ProofUpload` (drag & drop + preview base64, validasi tipe/ukuran), tombol "Saya sudah bayar" → status `menunggu_verifikasi`. State per status: `pending`, `menunggu_verifikasi`, `paid`, `ditolak`, `expired` — masing-masing punya tampilan berbeda.
- **Modul:** Checkout
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-36
- **Estimasi:** 3 jam
- **File:** `src/pages/public/order-payment.tsx`, `src/features/checkout/components/qris-panel.tsx`, `proof-upload.tsx`
- **Commit:** `feat(checkout): add qris payment page with proof upload`

## T-38 — E-ticket `/order/:orderId/tiket`
- **Deskripsi:** Kartu tiket (orderId, event, tanggal, peserta, jumlah, total, status badge), tombol print (CSS print), tombol "Beri ulasan" (aktif hanya jika `paid` dan belum review), tombol "Lihat tiket saya".
- **Modul:** Checkout
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-37
- **Estimasi:** 2 jam
- **File:** `src/pages/public/order-ticket.tsx`, `src/features/checkout/components/e-ticket.tsx`
- **Commit:** `feat(checkout): add e-ticket page with review cta`

## T-39 — Autentikasi halaman `/login` & `/register`
- **Deskripsi:** Form login (email, password, akun demo), register (nama, email, password, tipe akun User/Mitra), validasi zod, redirect ke `next` param. Setelah register sebagai mitra → arahkan ke `/mitra/pengaturan` untuk lengkapi rekening.
- **Modul:** Checkout
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-23, T-17
- **Estimasi:** 2 jam
- **File:** `src/pages/auth/login.tsx`, `register.tsx`, `src/features/auth/components/*`
- **Commit:** `feat(auth): add login and register pages`

---

# M7 — Personal Site & Review

## T-40 — Profil publik `/@:username`
- **Deskripsi:** Header (avatar, nama, headline, bio, lokasi, link), section skill (chip), riwayat pendidikan, section "Sertifikasi & Event Terverifikasi" — hanya booking `paid` milik user, tiap item: judul event, mitra, tanggal selesai, badge "Terverifikasi Ketemu", link ke detail event. Empty state bila belum ada. 404 bila username tidak ada.
- **Modul:** Personal Site
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-39, T-38
- **Estimasi:** 3 jam
- **File:** `src/pages/public/profile-public.tsx`, `src/features/profile/components/profile-header.tsx`, `portfolio-section.tsx`
- **Commit:** `feat(profile): add public personal site with verified portfolio`

## T-41 — Blog publik di personal site
- **Deskripsi:** Section daftar post (cover, judul, excerpt, tanggal), halaman detail `/@:username/posts/:postSlug`, render teks multi-paragraf, tombol share (copy link), empty state.
- **Modul:** Personal Site
- **Prioritas:** Mid
- **Status:** Todo
- **Dependensi:** T-40
- **Estimasi:** 2 jam
- **File:** `src/pages/public/profile-post.tsx`, `src/features/profile/components/post-list.tsx`, `post-detail.tsx`
- **Commit:** `feat(profile): add public blog pages`

## T-42 — Edit profil & personal site `/akun/profil`
- **Deskripsi:** Form bio, headline, lokasi, skills (input tag), pendidikan (repeatable), upload avatar (preview lokal). Preview URL personal site + tombol "Lihat profil publik". Validasi zod, toast sukses.
- **Modul:** Personal Site
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-40
- **Estimasi:** 2.5 jam
- **File:** `src/pages/user/edit-profile.tsx`, `src/features/profile/components/profile-form.tsx`
- **Commit:** `feat(profile): add profile and personal site editor`

## T-43 — CRUD post `/akun/posts`
- **Deskripsi:** Tabel/list post milik user, buat/edit/hapus dengan `AlertDialog` konfirmasi, editor sederhana (judul, cover, isi textarea), status draft/published.
- **Modul:** Personal Site
- **Prioritas:** Mid
- **Status:** Todo
- **Dependensi:** T-42
- **Estimasi:** 2.5 jam
- **File:** `src/pages/user/my-posts.tsx`, `src/features/profile/components/post-editor.tsx`
- **Commit:** `feat(profile): add post management for personal site`

## T-44 — Form ulasan verified
- **Deskripsi:** `ReviewForm`: rating bintang (radio-group aksesibel), teks min 20 karakter, foto opsional. Guard: hanya bisa submit jika ada booking `paid` untuk event tersebut dan belum pernah review. Setelah submit → update agregat rating event + mitra, toast, item muncul di list.
- **Modul:** Personal Site
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-40
- **Estimasi:** 2.5 jam
- **File:** `src/features/reviews/components/review-form.tsx`, `src/store/slices/review.slice.ts`
- **Commit:** `feat(reviews): add verified review submission`

## T-45 — Ulasan saya `/akun/ulasan`
- **Deskripsi:** Daftar event yang menunggu diulas (booking paid tanpa review) + daftar ulasan yang sudah dibuat (bisa edit/hapus). CTA langsung ke form ulasan.
- **Modul:** Personal Site
- **Prioritas:** Mid
- **Status:** Todo
- **Dependensi:** T-44
- **Estimasi:** 1.5 jam
- **File:** `src/pages/user/my-reviews.tsx`
- **Commit:** `feat(reviews): add personal review management page`

---

# M8 — Mitra Dashboard

## T-46 — Analytics mitra (pure functions)
- **Deskripsi:** `features/mitra/lib/analytics.ts`: total pendaftar, gross, komisi, net, tren per bulan (untuk chart), top event, konversi kuota. Input dari store, output siap render. Filter rentang tanggal + filter event.
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-45
- **Estimasi:** 2 jam
- **File:** `src/features/mitra/lib/analytics.ts`
- **Commit:** `feat(mitra): add analytics calculations for dashboard`

## T-47 — Dashboard `/mitra`
- **Deskripsi:** 4 stat card (pendaftar, gross, komisi 5%, net), `RevenueChart` (area chart recharts, responsive), tabel event terbaru dengan status, daftar pembayaran menunggu verifikasi (link cepat). Filter rentang tanggal.
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-46
- **Estimasi:** 3 jam
- **File:** `src/pages/mitra/dashboard.tsx`, `src/features/mitra/components/revenue-chart.tsx`, `stat-cards.tsx`
- **Commit:** `feat(mitra): add dashboard with revenue analytics`

## T-48 — Tabel event `/mitra/events`
- **Deskripsi:** Tabel (judul, kategori, tanggal, kuota terisi/total, harga, status) dengan filter status, pencarian, sort kolom, pagination. Aksi baris: edit, lihat peserta, publish/unpublish (dengan konfirmasi), hapus (hanya draft).
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-47
- **Estimasi:** 3 jam
- **File:** `src/pages/mitra/event-list.tsx`, `src/features/mitra/components/event-table.tsx`
- **Commit:** `feat(mitra): add event management table`

## T-49 — Form event `/mitra/events/new` & `/edit`
- **Deskripsi:** Form multi-section (Info dasar, Jadwal & lokasi, Silabus & target pencapaian repeatable, Harga & kuota, Cover). Simpan sebagai draft atau publish. Gate: publish diblokir jika profil lembaga/rekening belum lengkap → tampilkan alert dengan link ke pengaturan. Validasi zod lengkap.
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-48
- **Estimasi:** 4 jam
- **File:** `src/pages/mitra/event-form.tsx`, `src/features/mitra/components/event-form/*`
- **Commit:** `feat(mitra): add event create and edit form`

## T-50 — Peserta & verifikasi pembayaran `/mitra/events/:id/peserta`
- **Deskripsi:** Tabel peserta (nama, email, hp, jumlah, total, status, bukti bayar), preview bukti di dialog, aksi Verifikasi (→ `paid`, terbitkan tiket) dan Tolak (→ `ditolak` + alasan). Export CSV via Blob download. Ringkasan pendapatan event dengan rincian komisi.
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-49
- **Estimasi:** 3.5 jam
- **File:** `src/pages/mitra/participants.tsx`, `src/features/mitra/components/participant-table.tsx`, `proof-dialog.tsx`
- **Commit:** `feat(mitra): add participant table with payment verification`

## T-51 — Pengaturan mitra `/mitra/pengaturan`
- **Deskripsi:** Form profil lembaga (nama, slug, deskripsi, logo, kota) + data rekening (bank, nomor, atas nama) dengan validasi. Indikator kelengkapan profil yang mengontrol izin publish. Toast sukses.
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-47
- **Estimasi:** 2 jam
- **File:** `src/pages/mitra/settings.tsx`, `src/features/mitra/components/partner-settings-form.tsx`
- **Commit:** `feat(mitra): add partner profile and bank account settings`

## T-52 — Layout mitra (sidebar)
- **Deskripsi:** `MitraLayout` dengan sidebar shadcn (Dashboard, Event, Pengaturan), breadcrumb, user menu, responsif (collapse ke Sheet di mobile), indikator role mitra. Guard `RequireRole` diterapkan di route group.
- **Modul:** Mitra
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-47
- **Estimasi:** 2 jam
- **File:** `src/components/layout/mitra-layout.tsx`, `src/app/router.tsx`
- **Commit:** `feat(mitra): add dashboard layout with responsive sidebar`

---

# M9 — Akun User & Polish

## T-53 — Layout akun + ringkasan `/akun`
- **Deskripsi:** `AccountLayout` (tab: Ringkasan, Tiket, Ulasan, Profil, Post), halaman ringkasan (statistik tiket, event mendatang, CTA lengkapi profil).
- **Modul:** Akun
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-52
- **Estimasi:** 2 jam
- **File:** `src/components/layout/account-layout.tsx`, `src/pages/user/account-dashboard.tsx`
- **Commit:** `feat(account): add account layout and dashboard summary`

## T-54 — Tiket & riwayat `/akun/tiket`
- **Deskripsi:** Daftar booking user dengan filter status, kartu ringkas (event, tanggal, status, total), aksi lanjutkan pembayaran / lihat tiket / beri ulasan sesuai status.
- **Modul:** Akun
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-53
- **Estimasi:** 2 jam
- **File:** `src/pages/user/my-tickets.tsx`, `src/features/checkout/components/booking-card.tsx`
- **Commit:** `feat(account): add ticket history page`

## T-55 — Konsistensi state (loading, empty, error, disabled)
- **Deskripsi:** Audit semua halaman: setiap list punya empty state dengan CTA, setiap form punya state submitting (spinner + disabled), setiap aksi async punya toast sukses/gagal, skeleton untuk lazy load. Buat checklist di `docs/state-audit.md`.
- **Modul:** Akun
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-54
- **Estimasi:** 3 jam
- **File:** `src/**/*`, `docs/state-audit.md`
- **Commit:** `refactor(ui): standardize loading empty and error states`

## T-56 — Aksesibilitas
- **Deskripsi:** Audit terhadap `.agents/2-DESIGN.md` §9: verifikasi semua pasangan warna lolos AA (tabel §2), semua input punya `<label>`, focus ring 2px `--ink-blue` offset 2px di semua elemen interaktif, urutan tab logis, `aria-*` pada rating (radiogroup), upload, countdown, status tidak hanya dibedakan warna, satu `h1` per halaman, skip link, `prefers-reduced-motion`. Catat hasil di `docs/a11y-audit.md`.
- **Modul:** Akun
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-55
- **Estimasi:** 3 jam
- **File:** `src/**/*`, `docs/a11y-audit.md`
- **Commit:** `fix(a11y): improve contrast labels and keyboard navigation`

## T-57 — Mobile pass 360px
- **Deskripsi:** Cek semua halaman di 360 / 768 / 1280: tanpa horizontal scroll, tap target ≥ 44px, tabel jadi card list di mobile, filter jadi Sheet, sticky CTA tidak menutupi konten. Catat di `docs/responsive-audit.md`.
- **Modul:** Akun
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-56
- **Estimasi:** 3 jam
- **File:** `src/**/*`, `docs/responsive-audit.md`
- **Commit:** `fix(layout): make all pages usable at 360px`

---

# M10 — Verifikasi & Dokumentasi

## T-58 — Build & typecheck bersih
- **Deskripsi:** `npx tsc --noEmit` tanpa error, `npm run build` sukses, cek bundle tidak memuat aset tak terpakai, hapus `console.log` sisa.
- **Modul:** Verifikasi
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-57
- **Estimasi:** 1 jam
- **File:** `src/**/*`
- **Commit:** `chore: fix typecheck and build warnings`

## T-59 — Smoke test Playwright alur kritis
- **Deskripsi:** Load skill `playwright-cli`. Skenario user: landing → search → detail → checkout → upload bukti → tiket. Skenario mitra: login → verifikasi bayar → tiket jadi paid → dashboard pendapatan. Skenario profil: login user → ulasan → profil publik menampilkan badge terverifikasi. Simpan skrip di `e2e/smoke.spec.ts` + screenshot 3 breakpoint di `docs/screenshots/`.
- **Modul:** Verifikasi
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-58
- **Estimasi:** 4 jam
- **File:** `e2e/smoke.spec.ts`, `docs/screenshots/*`
- **Commit:** `test(e2e): add smoke tests for critical flows`

## T-60 — README final & batasan prototype
- **Deskripsi:** README: cara install/run, akun demo (user & mitra), peta route, daftar skill, struktur folder, batasan prototype (pembayaran simulasi, upload lokal, auth mock, tanpa admin platform), tombol reset demo data. Tambah label "Prototype" di navbar (bila belum).
- **Modul:** Verifikasi
- **Prioritas:** High
- **Status:** Todo
- **Dependensi:** T-59
- **Estimasi:** 1.5 jam
- **File:** `README.md`
- **Commit:** `docs: finalize readme with demo accounts and limitations`

---

## Traceability PRD → Task

| FR / Modul PRD | Task |
|---|---|
| FR-01 Autentikasi | T-23, T-39 |
| FR-02 Profil personal site | T-40, T-42 |
| FR-03 Portfolio terverifikasi | T-40, T-50 |
| FR-04 Pencarian & filter | T-29, T-30 |
| FR-05 Detail event | T-31, T-33 |
| FR-06 Checkout & pemesanan | T-34, T-35, T-36 |
| FR-07 Pembayaran + komisi 5% | T-34, T-37, T-50 |
| FR-08 Ulasan verified | T-44, T-45, T-33 |
| FR-09 Manajemen listing | T-48, T-49 |
| FR-10 Analytics & data peserta | T-46, T-47, T-50 |
| NFR Mobile-first & aksesibilitas | T-56, T-57 |
| NFR Performa (lazy load) | T-15, T-55 |
| Revenue config (komisi) | T-12, T-34 |

## Di Luar Scope (tidak dibuat task)

- Payment gateway nyata (Xendit/Midtrans) — V1.1
- Mobile app native
- Integrasi kalender
- Multi-admin per mitra
- Sertifikasi blockchain
- Panel admin platform
- Email/OTP nyata, backend, database

---

## Checklist Audit

- [ ] Jumlah task sesuai kebutuhan (60 task, 11 modul)
- [ ] Setiap FR di PRD punya task (lihat tabel traceability)
- [ ] Tidak ada task backend/DB yang tidak relevan
- [ ] Dependensi logis, tidak ada siklus
- [ ] Satu task = satu commit, pesan commit jelas
- [ ] Estimasi total wajar (~118 jam)
- [ ] Batasan prototype dinyatakan eksplisit
- [ ] Semua task UI merujuk `.agents/2-DESIGN.md` (bukan menebak visual)
- [ ] Palet hanya putih + kuning + biru (tanpa cream, gradasi, ungu)
- [ ] Setiap halaman melewati checklist anti-slop §11 sebelum commit

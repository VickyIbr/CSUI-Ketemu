# DESIGN SYSTEM — Ketemu Prototype

**Status:** source of truth untuk semua keputusan visual
**Acuan:** `.agents/1-PRD.md` (produk), `.agents/3-TASKS/2026-10-28_ketemu-prototype.md` (eksekusi)
**Arah:** minimalis, putih dominan, aksen kuning + biru, anti AI-slop
**Stack:** Tailwind v4 + shadcn/ui (base radix, style new-york)

---

## 0. Konsep

**"Kertas kerja"** — Ketemu terasa seperti lembar kerja dan buku catatan, bukan dashboard SaaS.

- Latar putih bersih. Struktur dibentuk **garis rambut 1px** dan hierarki tipografi, bukan kartu bertumpuk dengan shadow.
- **Kuning = stabilo.** Hanya dipakai sebagai blok penanda di belakang teks pendek, dan sebagai status "baru/perhatian". Kuning tidak pernah jadi warna teks di atas putih.
- **Biru = tinta.** Semua aksi, tautan, dan fokus. Satu biru, tidak ada gradasi.
- Satu elemen berani per halaman: sapuan stabilo pada satu frasa di hero landing. Sisanya tenang.

Alasan konsep ini dipilih untuk produk ini: target pengguna adalah pembelajar yang membandingkan kualitas event — mereka butuh keterbacaan dan angka yang jujur, bukan dekorasi. Garis + angka tabular + stabilo penanda cocok dengan aktivitas "menandai halaman penting".

---

## 1. Skill (wajib dipakai saat implementasi)

```bash
# arah desain & anti-slop, dengan browser check
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

# anti "AI slop" versi Anthropic
npx skills add anthropics/skills@frontend-design

# project-aware shadcn (baca components.json, enforce pola)
npx skills add shadcn/ui

# verifikasi UI
npx skills add anthropics/skills@webapp-testing
```

Skill lokal yang sudah terpasang dan **wajib** di-load:

| Skill | Kapan |
|---|---|
| `antislop` | setiap task UI |
| `antislop-ui` | warna, layout, komponen, motion |
| `antislop-layoutmobile` | setiap halaman/layout |
| `antislop-human` | form, kontras, keyboard, focus, state |
| `antislop-copywriting` | landing page, microcopy, empty state, error |
| `antislop-code` | higienitas komentar |

Urutan kerja: **pass 1 tulis rencana visual → review lawan daftar §11 → pass 2 implementasi → screenshot 3 breakpoint → perbaiki 3 masalah teratas**. Maksimal 3 putaran.

---

## 2. Palet

Putih sebagai permukaan utama. Kuning dan biru hanya aksen — total luas aksen di satu layar ≤ 10%.

| Token | Hex | Peran | Aturan |
|---|---|---|---|
| `--paper` | `#FFFFFF` | latar utama semua halaman | default, bukan "card color" |
| `--paper-2` | `#F6F7F8` | permukaan sekunder (sidebar, baris tabel selang-seling, panel filter) | netral dingin, **bukan** cream |
| `--ink` | `#14161A` | teks utama, heading | kontras 18:1 di putih |
| `--ink-soft` | `#5B6470` | teks sekunder, caption, label form | 6.0:1 di putih — lolos AA |
| `--line` | `#E4E6E9` | garis rambut 1px, border input, pemisah baris | hanya elemen non-teks |
| `--line-strong` | `#C9CED6` | border input aktif-samar, pemisah tabel header | — |
| `--highlighter` | `#FFD43B` | blok stabilo, badge "baru", highlight chart | 12.7:1 dengan `--ink` — **teks di atasnya wajib `--ink`** |
| `--ink-blue` | `#1D3FD1` | tombol primer, tautan, focus ring, seri utama chart | 7.8:1 di putih — aman untuk teks |
| `--ink-blue-soft` | `#EEF1FE` | latar chip aktif, latar badge biru | pasangan `--ink-blue` |
| `--success` | `#0F7B4F` | status `paid`, badge terverifikasi | 5.3:1 |
| `--danger` | `#C02626` | status `ditolak`, `expired`, error | 5.9:1 |
| `--warning` | `#9A5B00` | status `menunggu_verifikasi` | 5.4:1 |

### Larangan warna

- Tidak ada gradasi (linear, radial, conic, gradient text).
- Tidak ada ungu, indigo, violet, atau pink.
- Tidak ada glassmorphism, backdrop-blur, atau glow.
- Kuning **tidak boleh** jadi warna teks, ikon, atau border di atas putih (kontras gagal).
- Tidak ada `#F4F1EA` / cream / beige — sering jadi penanda desain AI.
- Tidak ada hitam `#000000` murni. Pakai `--ink`.
- Tidak ada warna tambahan di luar tabel di atas. Butuh nuansa? pakai `--paper-2` atau opacity dari token yang ada.

### Pasangan yang sudah diverifikasi

| Kombinasi | Rasio | Status |
|---|---|---|
| `--ink` di `--paper` | 18.0:1 | AAA |
| `--ink-soft` di `--paper` | 6.0:1 | AA |
| `--ink-blue` di `--paper` | 7.8:1 | AAA |
| `#FFFFFF` di `--ink-blue` | 7.8:1 | AAA |
| `--ink` di `--highlighter` | 12.7:1 | AAA |
| `--ink` di `--paper-2` | 16.9:1 | AAA |
| `--success` di `--paper` | 5.3:1 | AA |
| `--danger` di `--paper` | 5.9:1 | AA |
| `--warning` di `--paper` | 5.4:1 | AA |

---

## 3. Tipografi

Dua keluarga, peran tegas berbeda:

| Peran | Font | Alasan |
|---|---|---|
| Semua teks UI & body | **Instrument Sans** (400, 500, 600, 700) | grotesque dengan sedikit karakter, x-height tinggi, enak di 14–16px |
| Angka tabular, order ID, harga di tabel, sumbu chart | **JetBrains Mono** (400, 500) | `font-variant-numeric: tabular-nums` — angka sejajar kolom, ini alasan fungsional bukan dekorasi |

Self-host via `@fontsource/instrument-sans` dan `@fontsource/jetbrains-mono`. Tanpa CDN runtime.

### Skala

| Token | Size / Line-height | Tracking | Pakai |
|---|---|---|---|
| `display` | 56 / 1.05 (mobile 36) | -0.03em | hero landing saja |
| `h1` | 36 / 1.15 | -0.02em | judul halaman |
| `h2` | 28 / 1.2 | -0.02em | judul section |
| `h3` | 20 / 1.35 | -0.01em | judul kartu, sub-section |
| `body-lg` | 18 / 1.55 | 0 | paragraf pembuka |
| `body` | 16 / 1.55 | 0 | default |
| `body-sm` | 14 / 1.5 | 0 | tabel, metadata |
| `caption` | 13 / 1.45 | 0.01em | label, helper text |
| `micro` | 12 / 1.4 | 0.02em | badge, footer legal |

Aturan:
- Bobot maksimal 700. Tidak ada 800/900.
- Maksimal 2 ukuran heading berbeda per section.
- Panjang baris body maksimal **68ch**; paragraf panjang dipersempit.
- Sentence case di semua tempat. **Tidak ada ALL CAPS** untuk label, eyebrow, atau badge.
- Tidak ada satu kata di-bold/italic/warna lain di tengah headline.
- Tidak ada label kecil di atas heading ("EYEBROW"). Heading langsung.
- Angka uang: `Rp150.000` tanpa spasi dan tanpa desimal, tabular.

---

## 4. Layout & Spasi

- **Grid:** 12 kolom, container maks **1160px**, gutter 24px, margin halaman 20px (mobile) / 40px (tablet) / auto (desktop).
- **Skala spasi (basis 4):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Tidak ada `13px`, `27px`, `35px`.
- **Vertikal antar section:** 96px desktop / 64px mobile, dipisah **garis 1px** (`--line`) bila section berganti topik. Bukan background berganti-ganti.
- **Radius:** `6px` (input, badge kecil) · `10px` (kartu, dialog, panel) · `999px` (chip & pill saja). Tidak semua elemen satu radius.
- **Elevasi:** hanya garis + tint permukaan. Shadow **hanya** untuk layer mengambang: dialog, sheet, dropdown, popover, toast.
  ```
  --shadow-overlay: 0 1px 2px rgb(20 22 26 / 0.06), 0 12px 32px rgb(20 22 26 / 0.10);
  ```
- **Alignment:** semua rata kiri. Tidak ada heading center kecuali halaman error/empty state.
- **Zona aman:** sticky header 64px; sticky CTA mobile 72px + safe-area.

### Wireframe ringkas

```
LANDING
┌──────────────────────────────────────────────┐
│ logo   Discover  Untuk mitra   cari   [Masuk]│ 64px, hairline bawah
├──────────────────────────────────────────────┤
│                                              │
│  Temukan kelas yang                       56px
│  benar-benar ▓▓▓▓▓▓▓▓ (stabilo)            │
│  ─────────────────────────────────────      │
│  [ kata kunci        ] [kategori▾] [Cari]   │
│  14 event aktif · 6 mitra · 24 ulasan       │  mono, 13px, ink-soft
├──────────────────────────────────────────────┤ hairline
│  Course   Workshop   Seminar   Kompetisi    │ 4 tile, ikon garis + angka
├──────────────────────────────────────────────┤
│  Sedang ramai                    Lihat semua│
│  ┌────┐ ┌────┐ ┌────┐                       │
│  └────┘ └────┘ └────┘                       │ hairline, no shadow
├──────────────────────────────────────────────┤
│  ... value prop (3 baris, bukan 3 kartu)    │
└──────────────────────────────────────────────┘

DISCOVERY
┌───────────────┬──────────────────────────────┐
│ Filter        │ 14 hasil   [Terpopuler ▾]    │
│ ─────────     │ ┌────┐ ┌────┐ ┌────┐         │
│ Kategori      │ └────┘ └────┘ └────┘         │
│ Harga         │ ┌────┐ ┌────┐ ┌────┐         │
│ Tanggal       │ └────┘ └────┘ └────┘         │
└───────────────┴──────────────────────────────┘
```

---

## 5. Motion

- Durasi 120–180ms, `ease-out` untuk masuk, `ease-in` untuk keluar.
- Hanya untuk **respons aksi pengguna**: buka/tutup, hover, fokus, submit, perubahan status.
- **Dilarang:** fade-and-slide-up saat scroll, parallax, marquee, animasi masuk per section, hover lift + shadow di setiap kartu, animasi pada angka statistik.
- Satu-satunya animasi masuk halaman: hero landing (opacity 0→1, 240ms, sekali).
- `prefers-reduced-motion: reduce` → semua transisi jadi 0ms.

---

## 6. Komponen (anatomi & aturan)

### Button
| Varian | Tampilan | Pakai |
|---|---|---|
| `primary` | latar `--ink-blue`, teks putih, radius 6px, tinggi 40px (mobile 44px) | satu per layar/section |
| `secondary` | latar putih, border `--line`, teks `--ink` | aksi pendamping |
| `ghost` | tanpa latar/border, teks `--ink-blue` | aksi dalam tabel, tautan aksi |
| `destructive` | latar putih, border `--danger`, teks `--danger` | tolak, hapus |
| `highlight` | latar `--highlighter`, teks `--ink` | hanya untuk CTA daftar mitra |

- Label = kata kerja + objek: "Daftar sekarang", "Simpan perubahan", "Verifikasi pembayaran". Bukan "Submit", bukan "Kirim →".
- Tidak ada ikon panah ditambahkan ke semua tombol.
- State wajib: hover, active, focus-visible (ring 2px `--ink-blue` offset 2px), disabled (opacity 45%, cursor not-allowed), loading (spinner 14px + label tetap).

### Input & Field
- Tinggi 40px, radius 6px, border 1px `--line`, latar putih.
- Label di atas, selalu terlihat, 13px `--ink-soft`, `font-medium`.
- Helper/error di bawah, 13px. Error pakai `--danger` + ikon garis 14px, bukan hanya warna.
- Focus: border `--ink-blue` + ring 2px `rgba(29,63,209,0.18)`.
- Placeholder hanya contoh format, bukan pengganti label.

### Card (EventCard, PartnerCard)
- Latar putih, border 1px `--line`, radius 10px, **tanpa shadow**.
- Hover: border jadi `--line-strong`. Tidak ada translate, tidak ada shadow bertambah.
- Cover 16:9, radius atas mengikuti kartu, `object-fit: cover`.
- Isi: badge kategori (pill, `--paper-2`, teks `--ink-soft`) → judul (h3, clamp 2 baris) → mitra + verified → baris bawah: rating (mono) + harga (mono, `--ink`).
- Harga gratis: teks "Gratis" dengan latar `--highlighter` selebar teks, padding 2px 6px.

### Badge / Status
| Status | Tampilan |
|---|---|
| `active` / `paid` | teks `--success`, latar `#EAF5EF`, pill |
| `menunggu_verifikasi` | teks `--warning`, latar `#FDF4E3`, pill |
| `pending` | teks `--ink-soft`, latar `--paper-2`, pill |
| `ditolak` / `expired` | teks `--danger`, latar `#FBEDED`, pill |
| `Terverifikasi Ketemu` | ikon centang garis 12px `--success` + teks `--success`, tanpa latar |

### Tabel (dashboard mitra)
- Header: 13px `--ink-soft`, `font-medium`, border bawah 1px `--line-strong`.
- Baris: 52px, border bawah 1px `--line`, hover latar `--paper-2` (bukan biru).
- Angka & uang rata kanan, font mono, tabular.
- Di mobile: berubah jadi daftar kartu, bukan tabel yang di-scroll horizontal.

### Chart
- Satu seri utama: garis `--ink-blue` 2px, area fill `rgba(29,63,209,0.08)`.
- Seri pembanding (komisi): garis `--highlighter` 2px, tanpa fill.
- Tanpa gridline vertikal. Gridline horizontal 1px `--line` saja.
- Sumbu: mono 12px `--ink-soft`. Tooltip: putih, border `--line`, radius 6px, `--shadow-overlay`.

### Dialog / Sheet
- Latar putih, radius 10px, border 1px `--line`, `--shadow-overlay`.
- Overlay `rgb(20 22 26 / 0.32)` tanpa blur.
- Sheet mobile: dari kanan untuk filter, dari bawah untuk aksi.

---

## 7. Aturan per halaman

| Halaman | Aturan khusus |
|---|---|
| Landing | Satu stabilo di headline. Search bar adalah elemen terbesar kedua setelah headline. Statistik pakai mono. Tidak ada 3 kartu fitur identik — value prop disusun sebagai baris bernomor tipografis dengan garis pemisah. |
| Discovery | Filter di sidebar kiri (desktop) / Sheet (mobile). Chip filter aktif: latar `--ink-blue-soft`, teks `--ink-blue`, tombol hapus. Counter hasil pakai mono. |
| Detail event | Dua kolom 8/4. Sidebar CTA sticky. Silabus sebagai daftar bernomor karena memang berurutan. Ulasan: distribusi bintang sebagai bar horizontal, bukan donut. |
| Checkout | Satu kolom form (max 560px) + ringkasan sticky. Rincian komisi 5% ditampilkan terbuka, mono, rata kanan. Countdown mono. |
| Order / QRIS | QR di atas latar putih dengan border `--line` dan padding 16px (quiet zone). Status jelas dalam satu baris. |
| E-ticket | Kartu putih border 1px, garis putus-putus vertikal sebagai pembatas stub. Bisa dicetak (CSS print, tanpa warna latar). |
| Personal site | Header profil tanpa cover foto besar. Portfolio terverifikasi sebagai daftar baris dengan garis pemisah, bukan grid kartu. |
| Dashboard mitra | Panel putih, garis rambut. Warna hanya dipakai pada data (chart, badge status). Stat card tanpa ikon dekoratif. |
| Auth | Satu kolom, max 400px, tanpa ilustrasi. |

---

## 8. Copy & Microcopy

- Bahasa Indonesia, sapaan netral ("kamu" untuk user, "Anda" untuk mitra).
- Tombol = kata kerja persis: "Publish" → toast "Event dipublikasikan".
- Error menjelaskan apa yang salah dan cara memperbaiki. Tidak minta maaf, tidak samar.
  - Salah: "Terjadi kesalahan."
  - Benar: "Email sudah dipakai akun lain. Masuk atau pakai email berbeda."
- Empty state = ajakan bertindak.
  - Salah: "Belum ada data."
  - Benar: "Belum ada event yang cocok. Hapus filter harga atau lihat semua kategori."
- Angka jujur: tampilkan sisa kuota dan komisi apa adanya.
- Dilarang: "revolusioner", "seamless", "unlock potential", "di era digital", emoji dekoratif, tanda seru ganda.

---

## 9. Aksesibilitas

- Kontras teks minimal AA (4.5:1), teks besar 3:1. Semua pasangan di §2 sudah diverifikasi.
- Fokus terlihat di semua elemen interaktif: ring 2px `--ink-blue`, offset 2px, tidak pernah `outline: none` tanpa pengganti.
- Target klik minimal 44×44px di mobile.
- Semua input punya `<label>` terhubung. Ikon saja wajib `aria-label`.
- Rating bintang: `radiogroup` + `aria-checked`, bisa dioperasikan keyboard.
- Status tidak boleh hanya dibedakan warna — selalu ada teks atau ikon.
- Heading hierarkis (satu `h1` per halaman), skip link ke konten utama.
- `prefers-reduced-motion` dihormati.

---

## 10. Pemetaan ke shadcn / Tailwind

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-paper: #ffffff;
  --color-paper-2: #f6f7f8;
  --color-ink: #14161a;
  --color-ink-soft: #5b6470;
  --color-line: #e4e6e9;
  --color-line-strong: #c9ced6;
  --color-highlighter: #ffd43b;
  --color-ink-blue: #1d3fd1;
  --color-ink-blue-soft: #eef1fe;
  --color-success: #0f7b4f;
  --color-danger: #c02626;
  --color-warning: #9a5b00;

  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-sm: 6px;
  --radius-md: 10px;

  --shadow-overlay: 0 1px 2px rgb(20 22 26 / 0.06), 0 12px 32px rgb(20 22 26 / 0.10);
}

:root {
  --background: var(--color-paper);
  --foreground: var(--color-ink);
  --primary: var(--color-ink-blue);
  --primary-foreground: #ffffff;
  --secondary: var(--color-paper-2);
  --secondary-foreground: var(--color-ink);
  --muted: var(--color-paper-2);
  --muted-foreground: var(--color-ink-soft);
  --accent: var(--color-ink-blue-soft);
  --accent-foreground: var(--color-ink-blue);
  --destructive: var(--color-danger);
  --border: var(--color-line);
  --input: var(--color-line);
  --ring: var(--color-ink-blue);
  --radius: 10px;
}
```

- `shadcn init`: base color **neutral**, style `new-york`, CSS variables **on**.
- `Button` default → primary biru. Varian `outline` → secondary. Varian `ghost` → ghost.
- `Card` → hapus `shadow-sm` dari default shadcn, ganti `border-border`.
- `Badge` → override jadi pill + tint semantik di §6.
- Dark mode: **ditunda** untuk prototype. Token `--paper`/`--ink` dibalik nanti bila diperlukan; jangan buat dua tema sekarang.

---

## 11. Checklist anti-slop (review sebelum commit UI)

Tolak dan revisi bila ada:

- [ ] Latar cream/beige (`#F4F1EA`, `#FAF7F2`, dst.)
- [ ] Gradasi di mana pun, termasuk gradient text dan gradient border
- [ ] Ungu/indigo/violet sebagai warna utama atau aksen
- [ ] Semua kartu radius sama + shadow `rgba(0,0,0,.1)` identik
- [ ] Grid 3 kartu fitur identik dengan ikon di dalam lingkaran
- [ ] Eyebrow ALL-CAPS kecil di atas setiap heading
- [ ] Angka "01 / 02 / 03" pada konten yang bukan urutan
- [ ] Panah "→" ditempel di setiap tautan/tombol
- [ ] Satu kata di headline di-italic/di-bold/di-warnai berbeda
- [ ] Hero default: angka besar + label kecil + 3 statistik + gradient accent
- [ ] Glassmorphism, backdrop-blur, glow, noise texture
- [ ] Hover lift + shadow bertambah di setiap kartu
- [ ] Animasi masuk per section saat scroll
- [ ] Ikon emoji sebagai ikon UI
- [ ] Font default tanpa alasan (Inter/Poppins untuk semua peran)
- [ ] Lebih dari 2 keluarga font
- [ ] Teks abu-abu di atas putih di bawah 4.5:1
- [ ] Copy pujian diri ("platform terbaik", "revolusioner", "seamless")

Lolos bila: struktur terbaca tanpa warna, satu aksen kuat per layar, semua angka sejajar, setiap state punya tampilan.

---

## 12. Urutan penerapan

1. `@theme` + CSS variables (§10) → T-10
2. Font self-host + skala tipografi (§3) → T-11
3. Override `Button`, `Card`, `Badge`, `Input` sesuai §6 → T-24
4. Terapkan ke landing (§4, §7) → T-26…T-28
5. Terapkan ke discovery & detail → T-30…T-33
6. Terapkan ke checkout & dashboard → T-35…T-52
7. Audit §11 + kontras + 3 breakpoint → T-55…T-57

# Design Decisions — Ketemu Prototype

## Validasi §0–§4 (T-09)

### Konsep "Kertas kerja" (§0)
- Latar putih bersih, garis rambut 1px, hierarki tipografi — **diterapkan**
- Kuning = stabilo (blok penanda di belakang teks pendek, badge "baru") — **diterapkan**
- Biru = tinta (aksi, tautan, fokus, satu biru tanpa gradasi) — **diterapkan**
- Satu elemen berani per halaman (sapuan stabilo di hero) — **diterapkan**
- Tidak ada penyimpangan

### Palet (§2)
- 12 token warna diverifikasi sesuai tabel §2
- Kontras semua pasangan lolos (lihat §2 tabel rasio)
- **Larangan warna:** tidak ada gradasi, ungu, glassmorphism, cream, hitam murni — **dipatuhi**
- Tidak ada warna tambahan di luar tabel — **dipatuhi**

### Tipografi (§3)
- Instrument Sans (400/500/600/700) untuk UI & body — **diterapkan**
- JetBrains Mono (400/500) untuk angka tabular, order ID, harga, sumbu chart — **diterapkan**
- Skala 8 token (display, h1, h2, h3, body-lg, body, body-sm, caption, micro) — **diterapkan**
- Max bobot 700, max 2 ukuran heading per section, max baris 68ch, sentence case — **dipatuhi**
- Angka uang: Rp150.000 tanpa spasi dan tanpa desimal, tabular — **diterapkan**

### Layout & Spasi (§4)
- Grid 12 kolom, container max 1160px, gutter 24px, margin 20/40/auto — **diterapkan**
- Skala spasi basis 4: 4, 8, 12, 16, 24, 32, 48, 64, 96 — **diterapkan**
- Vertikal antar section 96px desktop / 64px mobile, dipisah garis 1px — **diterapkan**
- Radius: 6px (input, badge kecil), 10px (kartu, dialog, panel), 999px (chip & pill) — **diterapkan**
- Elevasi: hanya garis + tint permukaan, shadow hanya untuk overlay — **diterapkan**
- Alignment: semua rata kiri, tidak ada heading center kecuali error/empty state — **diterapkan**

### Review anti-default (§11)
- [x] Latar cream/beige — TIDAK ADA
- [x] Gradasi di mana pun — TIDAK ADA
- [x] Ungu/indigo/violet sebagai warna utama atau aksen — TIDAK ADA
- [x] Semua kartu radius sama + shadow identik — TIDAK ADA
- [x] Grid 3 kartu fitur identik — TIDAK ADA (value prop sebagai baris bernomor)
- [x] Eyebrow ALL-CAPS — TIDAK ADA
- [x] Angka "01 / 02 / 03" pada konten bukan urutan — TIDAK ADA
- [x] Panah "→" di setiap tautan/tombol — TIDAK ADA
- [x] Satu kata di headline di-italic/di-bold/di-warnai — TIDAK ADA
- [x] Hero default: angka besar + label kecil + 3 statistik + gradient accent — TIDAK ADA
- [x] Glassmorphism, backdrop-blur, glow, noise texture — TIDAK ADA
- [x] Hover lift + shadow bertambah di setiap kartu — TIDAK ADA
- [x] Animasi masuk per section saat scroll — TIDAK ADA
- [x] Ikon emoji sebagai ikon UI — TIDAK ADA
- [x] Font default tanpa alasan (Inter/Poppins) — TIDAK ADA
- [x] Lebih dari 2 keluarga font — TIDAK ADA
- [x] Teks abu-abu di atas putih di bawah 4.5:1 — TIDAK ADA
- [x] Copy pujian diri — TIDAK ADA

### Penyimpangan
Tidak ada penyimpangan. Semua token dan aturan diterapkan sesuai §0–§4.
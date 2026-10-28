# Design Decisions — Ketemu Prototype

## Validasi token (T-09)

Semua token di §2 `.agents/2-DESIGN.md` sudah diterapkan di `src/index.css` (T-10).
Tidak ada penyimpangan dari spec.

### Palet yang diverifikasi
- `--paper` = #FFFFFF (latar utama)
- `--paper-2` = #F6F7F8 (netral dingin, bukan cream)
- `--ink` = #14161A (bukan #000000 murni)
- `--ink-soft` = #5B6470 (6.0:1 — lolos AA)
- `--line` = #E4E6E9 (garis rambut)
- `--line-strong` = #C9CED6
- `--highlighter` = #FFD43B (teks di atasnya wajib --ink)
- `--ink-blue` = #1D3FD1 (7.8:1 — AAA)
- `--ink-blue-soft` = #EEF1FE
- `--success` = #0F7B4F
- `--danger` = #C02626
- `--warning` = #9A5B00

### Anti-slop review (§11)
- [x] Tidak ada latar cream/beige
- [x] Tidak ada gradasi
- [x] Tidak ada ungu/indigo/violet
- [x] Tidak ada glassmorphism/backdrop-blur
- [x] Tidak ada hover lift + shadow di setiap kartu
- [x] Tidak ada animasi masuk per section saat scroll
- [x] Tidak ada ikon emoji sebagai ikon UI
- [x] Tidak ada font default tanpa alasan

### Catatan
- shadcn base color: neutral (sesuai spec)
- shadcn style: new-york
- CSS variables: on
- Dark mode: ditunda (sesuai spec §10)

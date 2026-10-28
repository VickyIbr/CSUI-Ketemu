# Ketemu

Marketplace event edukasi — prototype frontend statis.

Dokumen acuan:

- `.agents/1-PRD.md` — requirement produk
- `.agents/2-DESIGN.md` — design system (palet, tipografi, komponen, aturan anti-slop)
- `.agents/3-TASKS/2026-10-28_ketemu-prototype.md` — task list eksekusi

## Status

Prototype. Tanpa backend, tanpa payment gateway nyata. Data statis + localStorage.

## Menjalankan

```bash
npm install
npm run dev
```

## Skills

- `design-taste-frontend` — taste-skill
- `frontend-design` — anthropics/skills
- `shadcn/ui` — shadcn/ui
- `webapp-testing` — anthropics/skills

## Akun Demo

_(placeholder — akan diisi di T-60)_

## Batasan Prototype

- Pembayaran simulasi (QRIS statis)
- Upload bukti lokal (localStorage)
- Auth mock (kredensial demo hardcoded)
- Tanpa backend, tanpa database
- Tanpa dark mode

Build produksi:

```bash
npm run build
npm run preview
```

## Akun demo

Akan diisi pada T-22.

| Peran | Email | Password |
|---|---|---|
| User | — | — |
| Mitra | — | — |

## Skills

Akan diisi pada T-08.

## Batasan prototype

- Pembayaran QRIS simulasi, verifikasi manual oleh mitra
- Upload bukti bayar hanya preview lokal (tidak ada server)
- Auth mock tanpa hash/OTP/JWT
- Tidak ada panel admin platform
- Tidak ada dark mode

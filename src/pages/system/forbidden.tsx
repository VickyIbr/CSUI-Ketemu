import { Link } from "react-router-dom"

export function ForbiddenPage() {
  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
      <h1 className="text-4xl font-bold text-ink">403</h1>
      <p className="mt-2 text-ink-soft">Anda tidak memiliki akses ke halaman ini.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-ink-blue px-4 py-2 text-sm font-medium text-white hover:bg-ink-blue/90 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}
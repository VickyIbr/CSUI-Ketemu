import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-ink-blue">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-ink">Halaman tidak ditemukan</h2>
        <p className="mt-2 text-ink-soft">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
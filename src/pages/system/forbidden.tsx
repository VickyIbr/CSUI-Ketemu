import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function ForbiddenPage() {
  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
      <h1 className="text-4xl font-bold text-ink">403</h1>
      <p className="mt-2 text-ink-soft">Anda tidak memiliki akses ke halaman ini.</p>
      <Button asChild className="mt-6 h-auto px-4 py-2 text-sm">
        <Link to="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  )
}
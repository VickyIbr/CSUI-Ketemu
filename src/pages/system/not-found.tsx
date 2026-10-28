import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb"

export function NotFoundPage() {
  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-ink">Halaman tidak ditemukan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-ink">404</h1>
        <p className="mt-2 text-ink-soft">Halaman yang Anda cari tidak ada.</p>
        <Button asChild className="mt-6 h-auto px-4 py-2 text-sm">
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  )
}
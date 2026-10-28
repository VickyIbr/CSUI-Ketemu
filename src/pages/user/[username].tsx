import { useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb"

export function PersonalSitePage() {
  const params = useParams()

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-ink">{params.username || "Profil"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold text-ink">Personal Site</h1>
        <p className="mt-2 text-ink-soft">Placeholder — username: {params.username}</p>
      </div>
    </div>
  )
}
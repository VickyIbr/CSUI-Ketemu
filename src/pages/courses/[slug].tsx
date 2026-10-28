import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCoursesStore } from "@/store/courses.store"
import { usePartnersStore } from "@/store/partners.store"
import { formatIDR, formatDateLong } from "@/lib/format"

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const getCourseBySlug = useCoursesStore((s) => s.getCourseBySlug)
  const getPartnerById = usePartnersStore((s) => s.getPartnerById)

  const course = slug ? getCourseBySlug(slug) : undefined
  const partner = course ? getPartnerById(course.partnerId) : undefined

  if (!course) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink">Course tidak ditemukan</h1>
        <Link to="/courses" className="mt-4 inline-block text-ink-blue underline">
          Kembali ke Course
        </Link>
      </div>
    )
  }

  const isSoldOut = course.filled >= course.quota

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={course.coverUrl}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{course.courseCategory}</Badge>
              {course.isFree && <Badge variant="default">Gratis</Badge>}
              {course.isOnline && <Badge variant="outline">Online</Badge>}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-ink">{course.title}</h1>
            <p className="mt-2 text-ink-soft">{course.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Tanggal Mulai</p>
                <p className="mt-1 font-medium text-ink">{formatDateLong(course.startDate)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Tanggal Selesai</p>
                <p className="mt-1 font-medium text-ink">{formatDateLong(course.endDate)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Lokasi</p>
                <p className="mt-1 font-medium text-ink">
                  {course.isOnline ? "Online" : course.location}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Kapasitas</p>
                <p className="mt-1 font-medium text-ink">
                  {course.filled}/{course.quota} peserta
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Tujuan Pembelajaran</h2>
            <ul className="mt-3 space-y-2">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-soft">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-blue" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Materi</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.syllabus.map((item, i) => (
                <Badge key={i} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {partner && (
            <div>
              <h2 className="text-xl font-bold text-ink">Diselenggarakan oleh</h2>
              <Card className="mt-3">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-12 w-12 rounded-lg bg-muted" />
                  <div>
                    <p className="font-medium text-ink">{partner.name}</p>
                    <p className="text-sm text-ink-soft">{partner.tagline}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-ink">
                {course.isFree ? "Gratis" : formatIDR(course.price)}
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                {isSoldOut ? "Sold out" : `${course.quota - course.filled} tiket tersisa`}
              </p>
              <Button
                className="mt-4 w-full"
                disabled={isSoldOut}
                asChild
              >
                <Link to={`/checkout/${course.id}`}>
                  {isSoldOut ? "Sold Out" : "Daftar Sekarang"}
                </Link>
              </Button>
              <div className="mt-4 space-y-2 text-sm text-ink-soft">
                <div className="flex justify-between">
                  <span>Kategori</span>
                  <span className="font-medium text-ink">{course.courseCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format</span>
                  <span className="font-medium text-ink">
                    {course.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
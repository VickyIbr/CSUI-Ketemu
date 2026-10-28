import { useState } from "react"
import { Link } from "react-router-dom"
import { useCoursesStore } from "@/store/courses.store"
import { CourseCategory } from "@/features/courses/types"
import { Search, Filter, X, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/seo"

export function CoursesDiscoveryPage() {
  const { courses, getCoursesByCategory, searchCourses } = useCoursesStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories: CourseCategory[] = [
    "IT",
    "Matematika",
    "Bisnis",
    "Desain",
    "Bahasa",
    "Sains",
    "Lainnya",
  ]

  const filteredCourses = searchQuery
    ? searchCourses(searchQuery, selectedCategory || undefined)
    : selectedCategory
    ? getCoursesByCategory(selectedCategory)
    : courses

  const trendingCourses = [...courses]
    .sort((a, b) => b.filled - a.filled)
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-8">
      <SEO title="Course" description="Temukan course online dan offline dari mitra terpercaya. Tingkatkan skill kamu dengan course yang relevan." />
      {/* Header */}
      <header>
        <div className="mx-auto max-w-[1160px] px-5 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink">
                Course & Diploma
              </h1>
              <p className="text-ink-soft mt-1">
                Program pendidikan dan pelatihan dari mitra terpercaya. Pilih yang pas buat kamu.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-soft" />
              <Input
                placeholder="Cari course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-line p-4">
            <div className="text-2xl font-bold text-ink">{courses.length}</div>
            <div className="text-xs text-ink-soft">Total Course</div>
          </div>
          <div className="rounded-xl border border-line p-4">
            <div className="text-2xl font-bold text-ink">
              {categories.filter((c) => courses.some((x) => x.courseCategory === c)).length}
            </div>
            <div className="text-xs text-ink-soft">Kategori</div>
          </div>
          <div className="rounded-xl border border-line p-4">
            <div className="text-2xl font-bold text-ink">
              {courses.filter((c) => c.isFree).length}
            </div>
            <div className="text-xs text-ink-soft">Gratis</div>
          </div>
          <div className="rounded-xl border border-line p-4">
            <div className="text-2xl font-bold text-ink">
              {courses.reduce((acc, c) => acc + c.filled, 0)}
            </div>
            <div className="text-xs text-ink-soft">Capsule Diisi</div>
          </div>
        </div>
      </div>

      {/* Trending Courses */}
      <section className="mx-auto max-w-[1160px] px-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="size-4 text-ink-blue" />
          <h2 className="text-xl font-semibold text-ink">Course Paling Populer</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingCourses.map((course) => {
            const progress = (course.filled / course.quota) * 100
            return (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={course.coverUrl}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          course.courseCategory === "IT"
                            ? "bg-ink-blue text-white"
                            : course.courseCategory === "Matematika"
                            ? "bg-green-500 text-white"
                            : course.courseCategory === "Bisnis"
                            ? "bg-purple-500 text-white"
                            : course.courseCategory === "Desain"
                            ? "bg-pink-500 text-white"
                            : "bg-ink-blue-soft text-ink-blue"
                        }`}
                      >
                        {course.courseCategory}
                      </Badge>
                    </div>
                    <Badge
                      variant={course.isFree ? "default" : "outline"}
                      className="text-xs"
                    >
                      {course.isFree ? "Gratis" : `${course.price.toLocaleString()} IDR`}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-ink">{course.title}</h3>
                  <p className="text-sm text-ink-soft line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      {course.filled}/{course.quota} diisi
                    </span>
                    <span>{progress.toFixed(0)}% dipenuhi</span>
                  </div>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-ink-blue hover:underline"
                  >
                    Lihat Detail <ArrowRight className="size-3" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Category Filter */}
      <section className="mx-auto max-w-[1160px] px-5">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="size-4 text-ink-soft" />
          <h2 className="text-xl font-semibold text-ink">Semua Category</h2>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className="capitalize"
            >
              {cat}
              {selectedCategory === cat && <X className="size-3 ml-1" />}
            </Button>
          ))}
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="mx-auto max-w-[1160px] px-5">
        <h2 className="text-xl font-semibold text-ink mb-4">
          {selectedCategory || searchQuery ? "Hasil Pencarian" : "Semua Course"}
        </h2>
        {filteredCourses.length === 0 ? (
          <div className="rounded-xl border border-line p-12 text-center">
            <p className="text-ink-soft">Tidak ada course yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={course.coverUrl}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        course.courseCategory === "IT"
                          ? "bg-ink-blue text-white"
                          : course.courseCategory === "Matematika"
                          ? "bg-green-500 text-white"
                          : course.courseCategory === "Bisnis"
                          ? "bg-purple-500 text-white"
                          : course.courseCategory === "Desain"
                          ? "bg-pink-500 text-white"
                          : "bg-ink-blue-soft text-ink-blue"
                      }`}
                    >
                      {course.courseCategory}
                    </Badge>
                    <Badge
                      variant={course.isFree ? "default" : "outline"}
                      className="text-xs ml-auto"
                    >
                      {course.isFree ? (
                        "Gratis"
                      ) : (
                        <span className="font-semibold">{course.price.toLocaleString()} IDR</span>
                      )}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-ink">{course.title}</h3>
                  <p className="text-sm text-ink-soft line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      {course.filled}/{course.quota} diisi
                    </span>
                    <span>
                      {((course.filled / course.quota) * 100).toFixed(0)}% dipenuhi
                    </span>
                  </div>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-ink-blue hover:underline"
                  >
                    Lihat Detail <ArrowRight className="size-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useEventsStore } from "@/store/events.store"
import { useCoursesStore } from "@/store/courses.store"
import { usePartnersStore } from "@/store/partners.store"
import { formatIDR } from "@/lib/format"
import { SEO } from "@/components/seo"
import { CheckCircle, FileText, Star } from "lucide-react"

export function LandingPage() {
  const events = useEventsStore((s) => s.events)
  const courses = useCoursesStore((s) => s.courses)
  const partners = usePartnersStore((s) => s.partners)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const featuredEvents = [
    events.find((e) => e.id === "event-10"), // Webinar
    events.find((e) => e.id === "event-3"),  // Seminar
    events.find((e) => e.id === "event-5"),  // Seminar
    events.find((e) => e.id === "event-7"),  // Kompetisi
  ].filter(Boolean) as typeof events

  const featuredCourses = [...courses]
    .sort((a, b) => b.filled - a.filled)
    .slice(0, 5)

  // Upcoming events sorted by startDate (nearest first)
  const upcomingEvents = [...events]
    .filter((e) => e.status === "published")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 6)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="min-h-screen">
      <SEO title="Beranda" description="Platform event dan kursus dari mitra terpercaya. Temukan event dan kursus yang sesuai dengan minat kamu." />

      {/* Hero + Cara Kerja */}
      <section className="bg-gradient-to-br from-ink-blue to-ink-blue-soft py-20">
        <div className="container mx-auto max-w-[1160px] px-5 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Temukan Event & Kursus yang Pas
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Platform event dan kursus dari mitra terpercaya. Yuk, belajar, berkembang, dan raih kesempatan baru.
          </p>

          {/* Cara Kerja */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
            {[
              { step: "1", title: "Daftar", desc: "Buat akun gratis, lengkapi profil dan portofolio kamu." },
              { step: "2", title: "Temukan", desc: "Eksplor event & kursus dari mitra terpercaya yang sesuai minat." },
              { step: "3", title: "Belajar & Raih", desc: "Ikuti event, dapatkan sertifikat, dan bangun kredibilitas." },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex items-center gap-0">
                <div className="flex flex-col items-center gap-2 w-[180px]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white backdrop-blur-sm">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-white/70 text-center">{item.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden sm:flex items-center justify-center px-2 pt-4">
                    <svg className="h-6 w-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured events */}
      <section className="py-16">
        <div className="container mx-auto max-w-[1160px] px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Event Paling Populer di Sekitar Kamu</h2>
            <Link to="/events" className="text-sm text-ink-blue underline">
              Lihat Semua
            </Link>
          </div>
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {featuredEvents.map((event) => {
              const isWebinar = event.category === "Webinar"
              return (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={event.coverUrl}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="mb-2 flex items-center gap-1 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${event.category === "Webinar" ? "bg-ink-blue-soft text-ink-blue" : ""}`}
                      >
                        {event.category}
                      </Badge>
                      {isWebinar && (
                        <Badge variant="outline" className="text-xs">
                          🌐 Online
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-ink line-clamp-2">{event.title}</h3>
                    <p className="mt-1 text-xs text-ink-soft line-clamp-1">{event.location}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-ink">
                        {event.isFree || event.price === 0 ? "Gratis" : formatIDR(event.price)}
                      </p>
                      <Button size="sm" variant="secondary" asChild className="text-xs px-2 py-1 h-7">
                        <Link to={`/events/${event.slug}`}>Detail</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-[1160px] px-5">
          <h2 className="text-2xl font-bold text-ink">Event Mendatang</h2>
          <p className="mt-1 text-sm text-ink-soft">Jangan sampai kelewatan event-event seru ini.</p>
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {upcomingEvents.slice(0, 8).map((event) => {
              const date = new Date(event.startDate)
              const day = date.getDate()
              const month = date.toLocaleDateString("id-ID", { month: "short" })
              return (
                <Link
                  key={event.id}
                  to={`/events/${event.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 transition-colors hover:bg-muted/50 flex-shrink-0 w-[280px]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-md bg-ink-blue text-white">
                    <span className="text-sm font-bold leading-none">{day}</span>
                    <span className="text-[10px] uppercase">{month}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-ink line-clamp-1">{event.title}</h3>
                    <p className="mt-0 text-xs text-ink-soft line-clamp-1">
                      {event.location} · {event.category}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {event.isFree || event.price === 0 ? "Gratis" : formatIDR(event.price)}
                    </Badge>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Terpopuler */}
      <section className="py-16">
        <div className="container mx-auto max-w-[1160px] px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Course Paling Populer</h2>
            <Link to="/courses" className="text-sm text-ink-blue underline">
              Lihat Semua
            </Link>
          </div>
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {featuredCourses.map((course) => {
              const catColor =
                course.courseCategory === "IT"
                  ? "bg-ink-blue text-white"
                  : course.courseCategory === "Matematika"
                  ? "bg-green-500 text-white"
                  : course.courseCategory === "Bisnis"
                  ? "bg-purple-500 text-white"
                  : course.courseCategory === "Desain"
                  ? "bg-pink-500 text-white"
                  : "bg-ink-blue-soft text-ink-blue"
              return (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={course.coverUrl}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="mb-2 flex items-center gap-1 flex-wrap">
                      <Badge variant="secondary" className={`text-xs ${catColor}`}>
                        {course.courseCategory}
                      </Badge>
                      {course.isOnline && (
                        <Badge variant="outline" className="text-xs">
                          🌐 Online
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-ink line-clamp-2">{course.title}</h3>
                    <p className="mt-1 text-xs text-ink-soft line-clamp-1">{course.location}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-ink">
                        {course.isFree || course.price === 0 ? "Gratis" : formatIDR(course.price)}
                      </p>
                      <Button size="sm" variant="secondary" asChild className="text-xs px-2 py-1 h-7">
                        <Link to={`/courses/${course.slug}`}>Detail</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Explanation */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-[1160px] px-5">
          <h2 className="text-2xl font-bold text-ink text-center">Kenapa KeTemu?</h2>
          <p className="mt-2 text-center text-ink-soft max-w-2xl mx-auto">
            Kami memastikan setiap mitra dan pengguna terverifikasi, sehingga kamu bisa belajar dengan tenang.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: CheckCircle, title: "Mitra Terverifikasi", desc: "Setiap mitra melalui proses validasi sebelum bisa memposting event atau kursus." },
              { icon: FileText, title: "Portofolio & Sertifikat", desc: "Mahasiswa menampilkan portofolio dan sertifikat yang bisa diverifikasi oleh mitra." },
              { icon: Star, title: "Review Transparan", desc: "Ulasan dari peserta asli, tanpa manipulasi, untuk membantu kamu memilih." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-blue-soft">
                    <Icon className="h-7 w-7 text-ink-blue" />
                  </div>
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-soft">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted py-16">
        <div className="container mx-auto max-w-[1160px] px-5">
          <h2 className="text-2xl font-bold text-ink">Mitra yang Udah Terpercaya</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="p-4">
                  <h3 className="font-bold text-ink">{partner.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{partner.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-ink">
                      ★ {partner.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-ink-soft">
                      ({partner.reviewCount} ulasan)
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-ink-blue">
        <div className="container mx-auto max-w-[600px] px-5 text-center">
          <h2 className="text-2xl font-bold text-white">Jangan Ketinggalan Info Event Baru</h2>
          <p className="mt-2 text-white/70">
            Daftar newsletter, dapatkan info event & kursus terbaru langsah di email kamu.
          </p>
          {subscribed ? (
            <p className="mt-6 text-white font-medium">Terima kasih! Kamu sudah terdaftar.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex gap-2">
              <Input
                type="email"
                placeholder="email@kamu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 text-white placeholder:text-white/50 border-white/20"
                required
              />
              <Button type="submit" variant="secondary">
                Daftar
              </Button>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
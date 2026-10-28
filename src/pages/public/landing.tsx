import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEventsStore } from "@/store/events-store"
import { formatCurrency } from "@/lib/format"

const CATEGORIES = [
  { name: "Course", icon: "📚", label: "Kursus" },
  { name: "Workshop", icon: "🛠️", label: "Workshop" },
  { name: "Seminar", icon: "🎤", label: "Seminar" },
  { name: "Competition", icon: "🏆", label: "Kompetisi" },
]

export function LandingPage() {
  const navigate = useNavigate()
  const events = useEventsStore((s) => s.events)
  const partners = useEventsStore((s) => s.partners)
  const featured = events.filter((e) => e.isFeatured).slice(0, 6)
  const topPartners = partners.slice(0, 5)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const q = (form.elements.namedItem("q") as HTMLInputElement).value
    navigate(`/events?q=${encodeURIComponent(q)}`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-paper px-4 py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-ink">
            Temukan Event <span className="bg-highlighter/30 px-1">Edukasi</span> Terbaik
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Marketplace event edukasi untuk mahasiswa dan profesional Indonesia.
          </p>
          <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-2xl gap-2">
            <Input name="q" placeholder="Cari event..." className="flex-1" />
            <Button type="submit">Cari</Button>
          </form>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild variant="secondary">
              <Link to="/events">Jelajahi Semua</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">Kategori</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const count = events.filter((e) => e.category === cat.name).length
            return (
              <Link
                key={cat.name}
                to={`/events?kategori=${cat.name}`}
                className="rounded-md border border-line bg-paper p-4 text-center transition-colors hover:bg-paper-2"
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="mt-2 font-medium text-ink">{cat.label}</p>
                <p className="text-sm text-ink-soft">{count} event</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular Events */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">Event Populer</h2>
          <Link to="/events" className="text-sm text-ink-blue hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((event) => (
            <div key={event.id} className="overflow-hidden rounded-md border border-line bg-paper">
              <img src={event.image} alt={event.title} className="aspect-[16/9] w-full object-cover" />
              <div className="p-4">
                <h3 className="text-body-sm font-semibold text-ink line-clamp-2">
                  {event.title}
                </h3>
                <p className="mt-1 text-caption text-ink-soft">{event.organizer}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-body-sm font-semibold text-ink-blue">
                    {formatCurrency(event.price)}
                  </span>
                  <Link
                    to={`/event/${event.slug}`}
                    className="text-sm text-ink-blue hover:underline"
                  >
                    Detail →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Partners */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-ink">Mitra Teratas</h2>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
          {topPartners.map((partner) => (
            <Link
              key={partner.id}
              to={`/mitra/${partner.slug}`}
              className="flex shrink-0 items-center gap-3 rounded-md border border-line bg-paper p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-2 text-sm font-bold text-ink">
                {partner.name[0]}
              </div>
              <div>
                <p className="font-medium text-ink">{partner.name}</p>
                <p className="text-sm text-ink-soft">{partner.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
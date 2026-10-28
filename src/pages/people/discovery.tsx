import { useState } from "react"
import { Link } from "react-router-dom"
import { usePeopleStore } from "@/store/people.store"
import { Search, ArrowRight, Award, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/seo"

export function PeopleDiscoveryPage() {
  const { people, searchPeople } = usePeopleStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPeople = searchQuery
    ? searchPeople(searchQuery)
    : people

  return (
    <div className="flex flex-col gap-8">
      <SEO title="People" description="Temukan mahasiswa dan profesional terverifikasi. Lihat profil, portfolio, dan skill mereka." />
      {/* Header */}
      <header>
        <div className="mx-auto max-w-[1160px] px-5 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink">People</h1>
              <p className="text-ink-soft mt-1">
                Temukan orang yang terverifikasi, dengan profil dan portfolio
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-soft" />
              <Input
                placeholder="Cari nama, skill, atau jurusan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </header>

      {/* People Grid */}
      <section className="mx-auto max-w-[1160px] px-5">
        <h2 className="text-xl font-semibold text-ink mb-4">
          {searchQuery ? "Hasil Pencarian" : "Semua People"}
        </h2>
        {filteredPeople.length === 0 ? (
          <div className="rounded-xl border border-line p-12 text-center">
            <p className="text-ink-soft">Gak ada orang yang ditemukan nih.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPeople.map((person) => (
              <Card key={person.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={person.avatarUrl}
                      alt={person.name}
                      className="h-12 w-12 rounded-full bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-ink truncate">{person.name}</h3>
                        {person.isVerified && (
                          <span className="text-ink-blue text-xs">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-ink-soft">{person.major} • {person.university}</p>
                      <p className="text-xs text-ink-soft">{person.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-ink-soft line-clamp-2">{person.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className={`text-xs ${skill.verified ? "bg-ink-blue-soft text-ink-blue" : ""}`}
                      >
                        {skill.name}
                        {skill.verified && " ✓"}
                      </Badge>
                    ))}
                    {person.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{person.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <Award className="size-3" />
                      {person.certificates.length} sertifikat
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="size-3" />
                      {person.coursesAttended.length} course
                    </span>
                  </div>
                  <Link
                    to={`/my/${person.username}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-ink-blue hover:underline"
                  >
                    Lihat Profil <ArrowRight className="size-3" />
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
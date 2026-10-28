import { useParams, Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { usePeopleStore } from "@/store/people.store"
import { useCoursesStore } from "@/store/courses.store"
import { useEventsStore } from "@/store/events.store"
import { formatDateLong } from "@/lib/format"
import { ArrowLeft, Award, BookOpen, Globe, Calendar, MapPin, GraduationCap } from "lucide-react"
import { SEO } from "@/components/seo"

export function PersonProfilePage() {
  const { username } = useParams<{ username: string }>()
  const getPersonByUsername = usePeopleStore((s) => s.getPersonByUsername)
  const courses = useCoursesStore((s) => s.courses)
  const events = useEventsStore((s) => s.events)

  const person = username ? getPersonByUsername(username) : undefined

  if (!person) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink">Profil tidak ditemukan</h1>
        <Link to="/people" className="mt-4 inline-block text-ink-blue underline">
          Kembali ke People
        </Link>
      </div>
    )
  }

  const attendedCourses = courses.filter((c) => person.coursesAttended.includes(c.id))
  const attendedEvents = events.filter((e) => person.eventsAttended.includes(e.id))

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <SEO title={`${person.name} - Profil`} description={person.bio} url={`/my/${person.username}`} />
      {/* Back link */}
      <Link to="/people" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-6">
        <ArrowLeft className="size-4" />
        Kembali ke People
      </Link>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={person.avatarUrl}
          alt={person.name}
          className="h-24 w-24 rounded-full bg-muted"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-ink">{person.name}</h1>
            {person.isVerified && (
              <Badge variant="default" className="text-xs">✓ Terverifikasi</Badge>
            )}
          </div>
          <p className="text-ink-soft mt-1">{person.bio}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-soft">
            <span className="flex items-center gap-1">
              <GraduationCap className="size-4" />
              {person.major} • {person.university}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              Lulus {person.graduationYear}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4" />
              {person.location}
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            {person.socialLinks.github && (
              <a href={person.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink text-sm">
                GitHub
              </a>
            )}
            {person.socialLinks.linkedin && (
              <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink text-sm">
                LinkedIn
              </a>
            )}
            {person.socialLinks.website && (
              <a href={person.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">
                <Globe className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className={`text-xs ${skill.verified ? "bg-ink-blue-soft text-ink-blue" : ""}`}
                  >
                    {skill.name} • {skill.level}
                    {skill.verified && " ✓"}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <Award className="size-5" />
                Sertifikat ({person.certificates.length})
              </h2>
              <div className="space-y-3">
                {person.certificates.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3 p-3 rounded-lg border border-line">
                    <div className="h-10 w-10 rounded-lg bg-ink-blue/10 flex items-center justify-center">
                      <Award className="size-5 text-ink-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-ink">{cert.title}</p>
                      <p className="text-sm text-ink-soft">{cert.issuer}</p>
                      <p className="text-xs text-ink-soft mt-1">
                        {formatDateLong(cert.issuedAt)}
                        {cert.verified && (
                          <Badge variant="default" className="ml-2 text-xs">✓ Terverifikasi</Badge>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                {person.certificates.length === 0 && (
                  <p className="text-sm text-ink-soft">Belum ada sertifikat</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Portfolio</h2>
              <div className="space-y-4">
                {person.portfolio.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border border-line">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-ink">{item.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">{item.type}</Badge>
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ink-blue hover:underline"
                        >
                          Lihat →
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-ink-soft mt-2">{item.description}</p>
                    <p className="text-xs text-ink-soft mt-2">{formatDateLong(item.date)}</p>
                  </div>
                ))}
                {person.portfolio.length === 0 && (
                  <p className="text-sm text-ink-soft">Belum ada portfolio</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Courses Attended */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <BookOpen className="size-5" />
                Courses ({attendedCourses.length})
              </h2>
              <div className="space-y-2">
                {attendedCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    className="block p-3 rounded-lg border border-line hover:bg-muted transition"
                  >
                    <p className="font-medium text-ink text-sm">{course.title}</p>
                    <p className="text-xs text-ink-soft">{course.courseCategory}</p>
                  </Link>
                ))}
                {attendedCourses.length === 0 && (
                  <p className="text-sm text-ink-soft">Belum ada course</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Events Attended */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-ink mb-4">Events ({attendedEvents.length})</h2>
              <div className="space-y-2">
                {attendedEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.slug}`}
                    className="block p-3 rounded-lg border border-line hover:bg-muted transition"
                  >
                    <p className="font-medium text-ink text-sm">{event.title}</p>
                    <p className="text-xs text-ink-soft">{event.category}</p>
                  </Link>
                ))}
                {attendedEvents.length === 0 && (
                  <p className="text-sm text-ink-soft">Belum ada event</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
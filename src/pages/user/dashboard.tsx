import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePeopleStore } from "@/store/people.store"
import { useCoursesStore } from "@/store/courses.store"
import { useEventsStore } from "@/store/events.store"
import { formatDateLong } from "@/lib/format"
import { User, Award, BookOpen, Settings, Edit3, Save, X } from "lucide-react"

export function UserDashboardPage() {
  const person = usePeopleStore((s) => s.people[0]) // demo: current user
  const courses = useCoursesStore((s) => s.courses)
  const events = useEventsStore((s) => s.events)
  const [activeTab, setActiveTab] = useState<"profile" | "portfolio" | "history" | "certificates" | "settings">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState(person.bio)

  const attendedCourses = courses.filter((c) => person.coursesAttended.includes(c.id))
  const attendedEvents = events.filter((e) => person.eventsAttended.includes(e.id))

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "portfolio", label: "Portfolio", icon: BookOpen },
    { id: "history", label: "Riwayat", icon: BookOpen },
    { id: "certificates", label: "Sertifikat", icon: Award },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ] as const

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-ink">Dashboard Saya</h1>
        <Link to={`/my/${person.username}`} className="text-sm text-ink-blue hover:underline">
          Lihat Profil Publik →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-ink-blue text-ink-blue"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-ink">Profil</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X className="size-4 mr-1" /> : <Edit3 className="size-4 mr-1" />}
                  {isEditing ? "Batal" : "Edit"}
                </Button>
              </div>
              <div className="flex items-start gap-4">
                <img
                  src={person.avatarUrl}
                  alt={person.name}
                  className="h-20 w-20 rounded-full bg-muted"
                />
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs text-ink-soft">Nama</label>
                    <p className="font-medium text-ink">{person.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-ink-soft">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full mt-1 p-2 border border-line rounded-lg text-sm"
                        rows={3}
                      />
                    ) : (
                      <p className="text-ink-soft">{bio}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-ink-soft">Jurusan</label>
                    <p className="text-ink">{person.major} • {person.university}</p>
                  </div>
                  <div>
                    <label className="text-xs text-ink-soft">Lokasi</label>
                    <p className="text-ink">{person.location}</p>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      <Save className="size-4 mr-1" />
                      Simpan
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

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
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-ink">Portfolio Saya</h2>
            <Button size="sm">
              <Edit3 className="size-4 mr-1" />
              Tambah Portfolio
            </Button>
          </div>
          {person.portfolio.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <Badge variant="outline" className="text-xs mt-1">{item.type}</Badge>
                  </div>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-blue hover:underline">
                      Lihat →
                    </a>
                  )}
                </div>
                <p className="text-sm text-ink-soft mt-2">{item.description}</p>
                <p className="text-xs text-ink-soft mt-2">{formatDateLong(item.date)}</p>
              </CardContent>
            </Card>
          ))}
          {person.portfolio.length === 0 && (
            <div className="rounded-xl border border-line p-12 text-center">
              <p className="text-ink-soft">Belum ada portfolio. Tambahkan portfolio Anda!</p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-ink mb-4">Course yang Diikuti</h2>
            <div className="space-y-2">
              {attendedCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">{course.title}</p>
                      <p className="text-xs text-ink-soft">{course.courseCategory}</p>
                    </div>
                    <Link to={`/courses/${course.slug}`} className="text-sm text-ink-blue hover:underline">
                      Lihat →
                    </Link>
                  </CardContent>
                </Card>
              ))}
              {attendedCourses.length === 0 && (
                <p className="text-sm text-ink-soft">Belum ada course yang diikuti.</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink mb-4">Event yang Diikuti</h2>
            <div className="space-y-2">
              {attendedEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">{event.title}</p>
                      <p className="text-xs text-ink-soft">{event.category}</p>
                    </div>
                    <Link to={`/events/${event.slug}`} className="text-sm text-ink-blue hover:underline">
                      Lihat →
                    </Link>
                  </CardContent>
                </Card>
              ))}
              {attendedEvents.length === 0 && (
                <p className="text-sm text-ink-soft">Belum ada event yang diikuti.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === "certificates" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-ink">Sertifikat Saya</h2>
          {person.certificates.map((cert) => (
            <Card key={cert.id}>
              <CardContent className="p-4 flex items-start gap-3">
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
              </CardContent>
            </Card>
          ))}
          {person.certificates.length === 0 && (
            <div className="rounded-xl border border-line p-12 text-center">
              <p className="text-ink-soft">Belum ada sertifikat.</p>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-ink">Pengaturan Akun</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-ink-soft">Email</label>
                  <Input value="user@ketemu.id" readOnly className="mt-1" />
                </div>
                <div>
                  <label className="text-xs text-ink-soft">Username</label>
                  <Input value={person.username} readOnly className="mt-1" />
                </div>
                <div>
                  <label className="text-xs text-ink-soft">Password</label>
                  <Input type="password" value="********" readOnly className="mt-1" />
                </div>
              </div>
              <div className="pt-4 border-t border-line">
                <Button variant="outline" size="sm">Ubah Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
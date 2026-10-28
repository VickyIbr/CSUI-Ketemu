import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usersSeed } from "@/features/profile/data/users.seed"

export function PersonalSitePage() {
  const { username } = useParams<{ username: string }>()
  const user = usersSeed.find((u) => u.username === username)

  if (!user) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink">Profil tidak ditemukan</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-ink">{user.name}</h1>
          <p className="text-ink-soft">{user.headline}</p>
          <p className="mt-1 text-sm text-ink-soft">{user.bio}</p>
        </div>
      </div>

      {/* Education */}
      {user.education.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink">Pendidikan</h2>
          <div className="mt-4 space-y-3">
            {user.education.map((edu) => (
              <Card key={edu.id}>
                <CardContent className="p-4">
                  <p className="font-medium text-ink">
                    {edu.degree} {edu.field}
                  </p>
                  <p className="text-sm text-ink-soft">{edu.institution}</p>
                  <p className="text-xs text-ink-soft">
                    {edu.startYear} – {edu.endYear ?? "Sekarang"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {user.skills.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-ink">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name} — {skill.level}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Posts / Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink">Aktivitas</h2>
        <Card className="mt-4">
          <CardContent className="p-6 text-center text-ink-soft">
            <p>Belum ada aktivitas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
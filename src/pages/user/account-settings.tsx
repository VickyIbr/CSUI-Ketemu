import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AccountSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Oscar Ryanda Putra",
    email: "oscar.ryanda@ui.ac.id",
    headline: "Mahasiswa Sistem Informasi Fasilkom UI",
    bio: "Mahasiswa Sistem Informasi angkatan 2023. Juara 1 Tecfest Global Business Case Competition 2025.",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <h1 className="text-3xl font-bold text-ink">Pengaturan Akun</h1>
      <p className="mt-1 text-ink-soft">Kelola profil dan preferensi akun Anda</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatars/rina.svg" />
                <AvatarFallback>RW</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 font-bold text-ink">{profile.name}</h2>
              <p className="text-sm text-ink-soft">{profile.headline}</p>
              <p className="mt-1 text-xs text-ink-soft">UI, Sistem Informasi</p>
            </CardContent>
          </Card>
        </div>

        {/* Settings tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
              <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      value={profile.headline}
                      onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-[80px]"
                    />
                  </div>
                  <Button onClick={handleSave}>
                    {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Keamanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Konfirmasi Kata Sandi Baru</Label>
                    <Input id="confirmNewPassword" type="password" />
                  </div>
                  <Button>Ubah Kata Sandi</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preferensi Notifikasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">Email Notifikasi</p>
                      <p className="text-sm text-ink-soft">Terima notifikasi event via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">Reminder Event</p>
                      <p className="text-sm text-ink-soft">Ingatkan 24 jam sebelum event</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">Promo & Update</p>
                      <p className="text-sm text-ink-soft">Info promo dan update platform</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                  <Button>Simpan Preferensi</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
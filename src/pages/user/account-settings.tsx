import { Button } from "@/components/ui/button"

export function AccountSettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-ink">Pengaturan Akun</h1>
      <p className="mt-2 text-ink-soft">
        Kelola profil dan pengaturan akun Anda.
      </p>
      <div className="mt-6 max-w-md space-y-4">
        <input type="text" placeholder="Nama" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
        <input type="email" placeholder="Email" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
        <Button>Simpan</Button>
      </div>
    </div>
  )
}
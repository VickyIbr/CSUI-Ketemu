import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePartnersStore } from "@/store/partners.store"

export function AdminUsersPage() {
  const partners = usePartnersStore((s) => s.partners)
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Pengguna</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-ink-soft">Daftar Mitra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {partners.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-sm text-ink-soft">{p.location}</p>
                </div>
                <span className="text-xs text-ink-soft">{p.websiteUrl}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
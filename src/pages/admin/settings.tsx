import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Pengaturan Admin</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-ink-soft">Konfigurasi Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Nama Platform</Label>
            <Input id="platform-name" defaultValue="KeTemu" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Komisi (%)</Label>
            <Input id="commission" type="number" defaultValue="5" />
          </div>
          <Button>Simpan</Button>
        </CardContent>
      </Card>
    </div>
  )
}
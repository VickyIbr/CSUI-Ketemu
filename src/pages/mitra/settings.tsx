import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { usePartnersStore } from "@/store/partners.store"

export default function PartnerSettings() {
  const updatePartner = usePartnersStore((s) => s.updatePartner)
  const partner = usePartnersStore((s) => s.partners[0])

  const [name, setName] = useState(partner?.name || "")
  const [tagline, setTagline] = useState(partner?.tagline || "")
  const [description, setDescription] = useState(partner?.description || "")
  const [websiteUrl, setWebsiteUrl] = useState(partner?.websiteUrl || "")
  const [location, setLocation] = useState(partner?.location || "")
  const [bankName, setBankName] = useState(partner?.rekening?.bankName || "")
  const [accountNumber, setAccountNumber] = useState(partner?.rekening?.accountNumber || "")
  const [accountHolder, setAccountHolder] = useState(partner?.rekening?.accountHolder || "")

  const handleSave = () => {
    if (!partner) return
    updatePartner(partner.id, {
      name,
      tagline,
      description,
      websiteUrl,
      location,
      rekening: {
        bankName,
        accountNumber,
        accountHolder,
      },
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-ink">Pengaturan Mitra</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Mitra</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website</Label>
          <Input id="websiteUrl" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Lokasi</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank</Label>
          <Input id="bankName" value={bankName} onChange={(e) => setBankName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNumber">No. Rekening</Label>
          <Input id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountHolder">Nama Pemilik Rekening</Label>
          <Input id="accountHolder" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
        </div>
        <Button onClick={handleSave} className="w-full">
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  )
}

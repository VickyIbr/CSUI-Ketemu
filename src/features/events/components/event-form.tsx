import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const KATEGORI = ["Course", "Workshop", "Seminar", "Kompetisi", "Bootcamp", "Webinar"]

interface EventFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel?: () => void
}

export function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [category, setCategory] = useState(initialData?.category || "Course")
  const [startDate, setStartDate] = useState(initialData?.startDate || "")
  const [endDate, setEndDate] = useState(initialData?.endDate || "")
  const [location, setLocation] = useState(initialData?.location || "")
  const [price, setPrice] = useState(initialData?.price || 0)
  const [quota, setQuota] = useState(initialData?.quota || 0)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ title, description, category, startDate, endDate, location, price: Number(price), quota: Number(quota) })
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Judul Event</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {KATEGORI.map((k) => (
              <SelectItem key={k} value={k}>
                {k}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Tanggal Mulai</Label>
          <Input id="startDate" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Tanggal Selesai</Label>
          <Input id="endDate" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Lokasi</Label>
        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Harga (IDR)</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} min={0} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quota">Kuota</Label>
          <Input id="quota" type="number" value={quota} onChange={(e) => setQuota(Number(e.target.value))} min={0} required />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Simpan</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Batal
          </Button>
        )}
      </div>
    </form>
  )
}

import { useState } from "react"
import { formatDateLong } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EventTableProps {
  events: any[]
  onEdit: (event: any) => void
}

const statusVariants = {
  draft: "secondary",
  published: "default",
  cancelled: "destructive",
} as const

export function EventTable({ events, onEdit }: EventTableProps) {
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "secondary"}
          onClick={() => setFilter("all")}
        >
          Semua
        </Button>
        <Button
          size="sm"
          variant={filter === "published" ? "default" : "secondary"}
          onClick={() => setFilter("published")}
        >
          Terbit
        </Button>
        <Button
          size="sm"
          variant={filter === "draft" ? "default" : "secondary"}
          onClick={() => setFilter("draft")}
        >
          Draft
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left py-3 px-2 font-medium text-ink-soft">Judul</th>
              <th className="text-left py-3 px-2 font-medium text-ink-soft">Kategori</th>
              <th className="text-left py-3 px-2 font-medium text-ink-soft">Tanggal</th>
              <th className="text-left py-3 px-2 font-medium text-ink-soft">Harga</th>
              <th className="text-left py-3 px-2 font-medium text-ink-soft">Status</th>
              <th className="text-right py-3 px-2 font-medium text-ink-soft">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((event) => (
              <tr key={event.id} className="hover:bg-muted/30 transition">
                <td className="py-3 px-2 font-medium text-ink">{event.title}</td>
                <td className="py-3 px-2 text-ink-soft">{event.category}</td>
                <td className="py-3 px-2 text-ink-soft">{formatDateLong(event.startDate)}</td>
                <td className="py-3 px-2 font-mono text-ink">
                  Rp {event.price.toLocaleString("id-ID")}
                </td>
                <td className="py-3 px-2">
                  <Badge variant={(statusVariants as any)[event.status] || "secondary"}>
                    {event.status}
                  </Badge>
                </td>
                <td className="py-3 px-2 text-right">
                  <Button size="sm" variant="secondary" onClick={() => onEdit(event)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-ink-soft">Tidak ada event</p>
        )}
      </div>
    </div>
  )
}

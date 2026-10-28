import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function PaymentPage() {
  const { id } = useParams()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-ink">Pembayaran</h1>
      <p className="mt-2 text-ink-soft">Event ID: {id}</p>
      <div className="mt-6 max-w-md space-y-4">
        <div className="rounded-lg border border-line bg-paper-2 p-4">
          <p className="text-sm text-ink-soft">Upload bukti pembayaran (QRIS)</p>
          <input type="file" accept="image/*" className="mt-2" />
        </div>
        <div className="flex gap-4">
          <Button asChild variant="secondary">
            <Link to={`/checkout/${id}`}>Kembali</Link>
          </Button>
          <Button>Upload Bukti</Button>
        </div>
      </div>
    </div>
  )
}
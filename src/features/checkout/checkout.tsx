import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function CheckoutPage() {
  const { id } = useParams()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-ink">Checkout</h1>
      <p className="mt-2 text-ink-soft">Event ID: {id}</p>
      <div className="mt-6 max-w-md space-y-4">
        <input type="text" placeholder="Nama lengkap" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
        <input type="email" placeholder="Email" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
        <input type="number" placeholder="Jumlah tiket" className="w-full rounded-md border border-line bg-paper px-3 py-2" min={1} defaultValue={1} />
        <div className="flex gap-4">
          <Button asChild variant="secondary">
            <Link to={`/event/${id}`}>Kembali</Link>
          </Button>
          <Button asChild>
            <Link to={`/payment/${id}`}>Lanjut ke Pembayaran</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
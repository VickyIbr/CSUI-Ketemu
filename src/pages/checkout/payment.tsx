import { useState } from "react"
import { Check } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatIDR } from "@/lib/format"

export function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<"bank" | "ewallet" | "qris">("bank")
  const [processing, setProcessing] = useState(false)
  const [paid, setPaid] = useState(false)

  const partner = { name: "Tech Academy", rekening: { bankName: "BCA", accountNumber: "1234567890", accountHolder: "Tech Academy" } }

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setPaid(true)
    }, 2000)
  }

  if (paid) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <div className="mx-auto max-w-md rounded-lg bg-muted p-8">
          <Check className="h-16 w-16 text-success mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-ink">Pembayaran Berhasil!</h1>
          <p className="mt-2 text-ink-soft">
            Pesanan Anda telah dikonfirmasi. Detail akan dikirim ke email.
          </p>
          <Button className="mt-8" asChild>
            <Link to="/orders">Lihat Pesanan</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <h1 className="text-3xl font-bold text-ink">Pembayaran</h1>
      <p className="mt-1 text-ink-soft">Pilih metode pembayaran</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Payment methods */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card
              className={`cursor-pointer transition-colors ${
                selectedMethod === "bank" ? "border-ink-blue bg-ink-blue-soft" : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedMethod("bank")}
            >
              <CardContent className="p-4 text-center">
                <p className="font-medium text-ink">Transfer Bank</p>
                <p className="text-xs text-ink-soft">BCA, Mandiri, BNI</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-colors ${
                selectedMethod === "ewallet" ? "border-ink-blue bg-ink-blue-soft" : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedMethod("ewallet")}
            >
              <CardContent className="p-4 text-center">
                <p className="font-medium text-ink">E-Wallet</p>
                <p className="text-xs text-ink-soft">GoPay, OVO, DANA</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-colors ${
                selectedMethod === "qris" ? "border-ink-blue bg-ink-blue-soft" : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedMethod("qris")}
            >
              <CardContent className="p-4 text-center">
                <p className="font-medium text-ink">QRIS</p>
                <p className="text-xs text-ink-soft">Semua bank & e-wallet</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment details */}
          {selectedMethod === "bank" && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-ink">Detail Rekening</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Bank</span>
                    <span className="font-medium text-ink">{partner.rekening.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">No. Rekening</span>
                    <span className="font-medium text-ink">{partner.rekening.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Atas Nama</span>
                    <span className="font-medium text-ink">{partner.rekening.accountHolder}</span>
                  </div>
                </div>
                <div className="rounded-md bg-ink-blue-soft p-3 text-sm text-ink-blue">
                  Transfer sesuai jumlah total. Upload bukti transfer untuk verifikasi.
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMethod === "ewallet" && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-ink">E-Wallet</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Pilih e-wallet favorit Anda dan selesaikan pembayaran.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Button variant="secondary" className="h-12">GoPay</Button>
                  <Button variant="secondary" className="h-12">OVO</Button>
                  <Button variant="secondary" className="h-12">DANA</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMethod === "qris" && (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-ink">Scan QRIS</h3>
                <div className="mx-auto mt-4 h-48 w-48 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-ink-soft text-sm">QR Code</span>
                </div>
                <p className="mt-4 text-sm text-ink-soft">
                  Scan QR code di atas menggunakan aplikasi bank atau e-wallet Anda.
                </p>
              </CardContent>
            </Card>
          )}

          <Button
            className="w-full"
            onClick={handlePay}
            disabled={processing}
          >
            {processing ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold text-ink">Ringkasan</h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Total Bayar</span>
                  <span className="font-bold text-ink">{formatIDR(175000)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
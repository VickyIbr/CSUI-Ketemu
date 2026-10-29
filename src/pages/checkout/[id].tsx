import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useEventsStore } from "@/store/events.store"
import { usePartnersStore } from "@/store/partners.store"
import { useCartStore } from "@/store/cart.store"
import { useOrdersStore } from "@/store/orders.store"
import { useAuthStore } from "@/store/auth.store"
import { formatIDR, formatDateLong } from "@/lib/format"

const commissionRate = 0.05

export function CheckoutPage() {
  const { id: eventId } = useParams<{ id: string }>()
  const getEventById = useEventsStore((s) => s.getEventById)
  const getPartnerById = usePartnersStore((s) => s.getPartnerById)
  const items = useCartStore((s) => s.items)
  const addOrder = useOrdersStore((s) => s.addOrder)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const event = eventId ? getEventById(eventId) : undefined
  const partner = event ? getPartnerById(event?.partnerId) : undefined
  const eventQty = items.find((i) => i.eventId === eventId)
  const qty = eventQty?.quantity ?? 0

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!event || !partner) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink">Event tidak ditemukan</h1>
        <Link to="/discover" className="mt-4 inline-block text-ink-blue underline">
          Kembali ke Discovery
        </Link>
      </div>
    )
  }

  const totalAmount = event.price * qty
  const commission = totalAmount * commissionRate

  const steps = [
    { num: 1, label: "Data Peserta" },
    { num: 2, label: "Pengiriman" },
    { num: 3, label: "Pembayaran" },
    { num: 4, label: "Konfirmasi" },
    { num: 5, label: "Selesai" },
  ]

  const validateStep = (stepNum: number) => {
    const newErrors: Record<string, string> = {}
    if (stepNum === 1) {
      if (!formData.name.trim()) newErrors.name = "Nama wajib diisi"
      if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Format email tidak valid"
      if (!formData.phone.trim()) newErrors.phone = "No. HP wajib diisi"
      else if (!/^[0-9]{10,13}$/.test(formData.phone))
        newErrors.phone = "Format no. HP tidak valid"
    }
    if (stepNum === 2) {
      if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi"
      if (!formData.city.trim()) newErrors.city = "Kota wajib diisi"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goToStep = (next: number) => {
    if (step === 4) {
      if (!validateStep(3)) return
      setTimeout(() => {
        addOrder({
          id: `order-${Date.now()}`,
          eventId: event.id,
          userId: "user-demo",
          status: qty > 0 ? "waiting_verification" : "pending",
          quantity: qty,
          totalAmount,
          commission,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          paymentProof: null,
          paidAt: null,
        })
        setSubmitted(true)
      }, 800)
      return
    }
    if (step > step && step !== 4) {
      if (!validateStep(step)) return
    }
    setStep(next)
  }

  const handleBack = () => {
    if (step > 1) {
      if (step === 4 && !validateStep(3)) return
      setStep(step - 1)
    }
  }

  const handleDemoLogin = () => {
    // Simulate demo account
    console.log("Demo login")
  }

  return submitted ? (
    <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
      <div className="mx-auto max-w-md rounded-lg bg-muted p-8">
        <div className="text-6xl font-bold text-success">✓</div>
        <h1 className="mt-4 text-2xl font-bold text-ink">Pemesanan Berhasil!</h1>
        <p className="mt-2 text-ink-soft">
          Terima kasih {formData.name}. Kami telah mengirim konfirmasi ke email Anda.
        </p>
        <div className="mt-6 space-y-2 text-sm text-ink-soft">
          <p>Total: {formatIDR(totalAmount)}</p>
          <p>Status: {partner.name} — Verifikasi pembayaran</p>
        </div>
        <Button
          className="mt-8"
          onClick={() => {
            setStep(1)
            setSubmitted(false)
            setFormData({ name: "", email: "", phone: "", address: "", city: "" })
            setErrors({})
            useCartStore.getState().clearCart()
          }}
        >
          Keranjang Lainnya
        </Button>
      </div>
    </div>
  ) : (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Checkout</h1>
          <p className="text-ink-soft">{event.title}</p>
        </div>
        {!isAuthenticated && (
          <Button variant="secondary" onClick={handleDemoLogin}>
            Login (demo)
          </Button>
        )}
      </div>

      {/* Progress steps */}
      <div className="mt-8 flex gap-2">
        {steps.map((s) => (
          <div
            key={s.num}
            className={`flex-1 flex flex-col items-center gap-2 rounded-md py-3 ${
              step >= s.num ? "text-ink-blue" : "text-ink-soft"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                step > s.num
                  ? "bg-success text-white"
                  : step === s.num
                  ? "bg-ink-blue text-white"
                  : "bg-muted text-ink-soft"
              }`}
            >
              {s.num}
            </div>
            <span className="text-xs text-center leading-tight">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {steps.map((s) => (
            <Card
              key={s.num}
              className={`transition-opacity ${
                step === s.num ? "opacity-100" : "opacity-40 pointer-events-none"
              }`}
            >
              <CardContent className="p-6">
                {s.num === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-ink">Data Peserta</h2>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone">No. HP</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {s.num === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-ink">Alamat Pengiriman</h2>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="address">Alamat</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="city">Kota</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {s.num === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-ink">Pembayaran</h2>
                    <Card className="border-muted">
                      <CardContent className="p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Jumlah Event</span>
                            <span className="font-medium text-ink">{qty} x {formatIDR(event.price)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total</span>
                            <span className="font-bold text-ink">{formatIDR(totalAmount)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <p className="text-xs text-ink-soft">
                      Aplikasikan gerbang pra-verifikasi, lakukan transaksi pembayaran, dan upload bukti pembayaran.
                    </p>
                  </div>
                )}
                {s.num === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-ink">Ringkasan Pembayaran</h2>
                    <Card className="border-muted">
                      <CardContent className="p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-ink-soft">Event</span>
                            <span className="font-medium text-ink">{event.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink-soft">Tanggal</span>
                            <span className="font-medium text-ink">{formatDateLong(event.startDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink-soft">Peserta</span>
                            <span className="font-medium text-ink">{qty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink-soft">Total</span>
                            <span className="font-bold text-ink">{formatIDR(totalAmount)}</span>
                          </div>
                          <div className="border-t mt-2 pt-2 flex justify-between font-bold text-ink">
                            <span>Total Bayar</span>
                            <span>{formatIDR(totalAmount)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                {s.num === 5 && (
                  <div className="text-center">
                    <div className="text-6xl font-bold text-success">✓</div>
                    <h2 className="mt-4 text-xl font-bold text-ink">Pembayaran Berhasil!</h2>
                    <p className="mt-2 text-ink-soft">
                      Terima kasih {formData.name}. Pesanan telah masuk dan akan diproses.
                    </p>
                    <p className="mt-2 text-sm text-ink-soft">
                      © {new Date().getFullYear()} {partner.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {step <= 4 && (
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={step === 1}
              >
                Kembali
              </Button>
              <Button
                onClick={() => goToStep(step + 1)}
              >
                {step === 4 ? "Konfirmasi & Bayar" : "Lanjutkan"}
              </Button>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold text-ink">Ringkasan Pesanan</h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Event</span>
                  <span className="font-medium text-ink">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Harga</span>
                  <span className="font-medium text-ink">{event.isFree || event.price === 0 ? "Gratis" : formatIDR(event.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Qty</span>
                  <span className="font-medium text-ink">{qty}</span>
                </div>
                <div className="border-t my-2" />
                <div className="flex justify-between">
                  <span className="text-ink-soft">Total</span>
                  <span className="font-bold text-ink">{formatIDR(totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {partner && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-ink mb-2">Penyedia</h3>
                <p className="text-sm text-ink-soft">{partner.name}</p>
                <p className="text-xs text-ink-soft">{partner.tagline}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
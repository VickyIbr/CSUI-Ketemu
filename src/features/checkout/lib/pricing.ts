export interface PricingResult {
  subtotal: number
  biayaLayanan: number
  total: number
  komisi: number
  netMitra: number
}

export function calculatePricing(price: number, quantity: number): PricingResult {
  const subtotal = price * quantity
  const isFree = price === 0
  const biayaLayanan = isFree ? 0 : 5000
  const total = subtotal + biayaLayanan
  const komisi = Math.round(subtotal * 0.05)
  const netMitra = subtotal - komisi

  return {
    subtotal,
    biayaLayanan,
    total,
    komisi,
    netMitra,
  }
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
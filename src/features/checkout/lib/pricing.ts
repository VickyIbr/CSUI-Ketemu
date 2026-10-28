export const COMMISSION_RATE = 0.05

export interface PricingResult {
  subtotal: number
  biayaLayanan: number
  total: number
  commission: number
  netMitra: number
}

export function calculatePricing(
  price: number,
  quantity: number,
  biayaLayananRate: number = 0
): PricingResult {
  const subtotal = price * quantity
  const biayaLayanan = Math.round(subtotal * biayaLayananRate)
  const total = subtotal + biayaLayanan
  const commission = Math.round(total * COMMISSION_RATE)
  const netMitra = total - commission

  return {
    subtotal,
    biayaLayanan,
    total,
    commission,
    netMitra,
  }
}

export function formatPricingBreakdown(result: PricingResult): string {
  const lines = [`Subtotal: Rp${result.subtotal.toLocaleString("id-ID")}`]
  if (result.biayaLayanan > 0) {
    lines.push(`Biaya Layanan: Rp${result.biayaLayanan.toLocaleString("id-ID")}`)
  }
  lines.push(`Total: Rp${result.total.toLocaleString("id-ID")}`)
  lines.push(`Komisi (5%): Rp${result.commission.toLocaleString("id-ID")}`)
  lines.push(`Netto Mitra: Rp${result.netMitra.toLocaleString("id-ID")}`)
  return lines.join("\n")
}
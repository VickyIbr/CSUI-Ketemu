export const a11y = {
  skipLink: "skip-to-main",
  ariaLabels: {
    search: "Cari event",
    filter: "Filter kategori",
    cart: "Keranjang",
    menu: "Menu utama",
    close: "Tutup",
    previous: "Sebelumnya",
    next: "Selanjutnya",
  },
  focusVisible: "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-blue focus-visible:ring-offset-2",
  srOnly: "sr-only",
  liveRegions: {
    polite: "aria-live='polite'",
    assertive: "aria-live='assertive'",
  },
}

export function trapFocus(element: HTMLElement) {
  const focusable = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0] as HTMLElement
  const last = focusable[focusable.length - 1] as HTMLElement

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }

  element.addEventListener("keydown", handleKeyDown)
  return () => element.removeEventListener("keydown", handleKeyDown)
}

export function announceToScreenReader(message: string) {
  const el = document.createElement("div")
  el.setAttribute("aria-live", "polite")
  el.setAttribute("aria-atomic", "true")
  el.className = "sr-only"
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => document.body.removeChild(el), 1000)
}

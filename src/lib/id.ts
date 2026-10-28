export function generateId(prefix?: string): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12))
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return prefix ? `${prefix}_${hex}` : hex
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function generateSlug(text: string, maxLength = 60): string {
  const base = slugify(text)
  return base.slice(0, maxLength)
}

export function nanoid(size = 10): string {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let id = ""
  for (let i = 0; i < size; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return id
}
const STORAGE_VERSION = 1
const PREFIX = "ketemu:"

export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${PREFIX}${key}`)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    if (parsed?._v !== STORAGE_VERSION) return fallback
    return parsed.data as T
  } catch {
    return fallback
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify({ _v: STORAGE_VERSION, data: value }))
  } catch {
    // ignore quota errors
  }
}

export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(`${PREFIX}${key}`)
  } catch {
    // ignore
  }
}
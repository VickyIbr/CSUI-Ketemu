let counter = 0

export function generateId(prefix: string): string {
  counter++
  const timestamp = Date.now().toString(36)
  const seq = counter.toString(36).padStart(4, "0")
  return `${prefix}_${timestamp}_${seq}`
}

export function generateOrderId(): string {
  return generateId("order")
}

export function generateEventId(): string {
  return generateId("event")
}
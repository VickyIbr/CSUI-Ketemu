import { useEffect, useState } from "react"
import { formatDateRelative } from "./format"

export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}

export function useTimeAgo(date: Date | string | null | undefined, updateInterval = 30_000) {
  const [text, setText] = useState(() => formatDateRelative(date ?? new Date()))

  useEffect(() => {
    if (!date) return
    const id = setInterval(() => setText(formatDateRelative(date)), updateInterval)
    return () => clearInterval(id)
  }, [date, updateInterval])

  return text
}

export function useCountdown(target: Date | string, intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  const diff = Math.max(0, +new Date(target) - +now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, total: diff }
}

export function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [locked])
}
import { useEffect } from "react"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article" | "event"
  noindex?: boolean
}

const SITE_NAME = "KeTemu"
const DEFAULT_TITLE = "KeTemu - Marketplace Event Edukasi"
const DEFAULT_DESCRIPTION = "Marketplace event edukasi untuk mahasiswa dan profesional. Temukan event dan kursus terbaik dari mitra terpercaya."
const DEFAULT_IMAGE = "/icon/pwa-icon-512.png"
const SITE_URL = "https://ketemu.vicky.id"

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`

  // Dev mode: always noindex
  const isDev = !import.meta.env.PROD
  const shouldNoindex = noindex || isDev

  // Update document head
  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name"
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    setMeta("description", description)
    setMeta("og:title", fullTitle, true)
    setMeta("og:description", description, true)
    setMeta("og:image", fullImage, true)
    setMeta("og:url", fullUrl, true)
    setMeta("og:type", type, true)
    setMeta("og:site_name", SITE_NAME, true)
    setMeta("twitter:card", "summary_large_image")
    setMeta("twitter:title", fullTitle)
    setMeta("twitter:description", description)
    setMeta("twitter:image", fullImage)

    if (shouldNoindex) {
      setMeta("robots", "noindex, nofollow")
    } else {
      setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", fullUrl)
  }, [fullTitle, description, fullImage, fullUrl, type, shouldNoindex])

  return null
}
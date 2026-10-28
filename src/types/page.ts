export type PageBlockType = "hero" | "text" | "event-list" | "about" | "cta" | "gallery" | "contact"

export interface PageBlock {
  id: string
  type: PageBlockType
  content: Record<string, unknown>
  order: number
}

export interface Page {
  id: string
  userId: string
  title: string
  slug: string
  blocks: PageBlock[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface PageVersion {
  id: string
  pageId: string
  version: number
  blocks: PageBlock[]
  createdAt: string
}

export interface Revision {
  id: string
  pageId: string
  version: number
  description: string
  createdAt: string
}
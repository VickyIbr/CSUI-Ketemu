import { create } from "zustand"
import { Partner } from "@/features/partners/types"
import { partnersSeed } from "@/features/partners/data/partners.seed"

interface PartnersState {
  partners: Partner[]
  setPartners: (partners: Partner[]) => void
  getPartnerById: (id: string) => Partner | undefined
  getPartnerBySlug: (slug: string) => Partner | undefined
  addPartner: (partner: Partner) => void
  updatePartner: (id: string, updates: Partial<Partner>) => void
}

export const usePartnersStore = create<PartnersState>((set, get) => ({
  partners: partnersSeed,
  setPartners: (partners) => set({ partners }),
  getPartnerById: (id) => get().partners.find((p) => p.id === id),
  getPartnerBySlug: (slug) => get().partners.find((p) => p.slug === slug),
  addPartner: (partner) => set({ partners: [...get().partners, partner] }),
  updatePartner: (id, updates) =>
    set({
      partners: get().partners.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }),
}))
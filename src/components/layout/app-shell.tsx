import { Outlet } from "react-router-dom"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-ink-blue">
        Lompat ke konten utama
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
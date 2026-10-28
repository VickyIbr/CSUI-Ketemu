import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/events", label: "Event" },
  { href: "/courses", label: "Course" },
  { href: "/people", label: "People" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-paper">
      <div className="container mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <img src="/icon/favicon-32x32.png" alt="KeTemu" className="h-8 w-8 rounded-full" />
          <span className="text-xl font-bold text-ink-blue">KeTemu</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-ink-soft hover:text-ink transition-colors",
                  isActive && "text-ink"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Masuk</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile nav — simple inline, no Sheet dropdown */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-line bg-paper">
          <div className="flex items-center justify-between px-5 py-3">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Tutup"
            >
              <X className="h-4 w-4 text-ink-soft" />
            </button>
          </div>
          <div className="px-5 pb-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium text-ink-soft hover:text-ink",
                      isActive && "text-ink"
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
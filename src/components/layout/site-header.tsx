import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { SheetContent, Sheet } from "@/components/ui/sheet"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/event", label: "Event" },
  { href: "/blog", label: "Blog" },
  { href: "/mitra", label: "Mitra" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-paper">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-ink-blue">Ketemu</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
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

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Keranjang">
            <ShoppingCart className="h-4 w-4" />
          </Button>

          {user ? (
            <Button variant="ghost" size="icon" asChild aria-label="Profil">
              <Link to="/account">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Masuk</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[240px]">
          <nav className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "block text-sm font-medium text-ink-soft hover:text-ink transition-colors",
                    isActive && "text-ink"
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  cn(
                    "block text-sm font-medium text-ink-soft hover:text-ink transition-colors",
                    isActive && "text-ink"
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                Akun
              </NavLink>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
import { Link, Outlet, useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, Users, Settings, BarChart3, Calendar } from "lucide-react"

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/users", label: "Pengguna", icon: Users },
  { path: "/admin/events", label: "Event", icon: Calendar },
  { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/admin/settings", label: "Pengaturan", icon: Settings },
]

export function AdminLayout() {
  const location = useLocation()

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0">
          <Card>
            <CardContent className="p-4 space-y-1">
              <div className="px-3 py-2 mb-2">
                <span className="text-xs font-bold uppercase text-ink-soft">Admin Panel</span>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-ink-blue text-paper"
                        : "text-ink-soft hover:bg-muted"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
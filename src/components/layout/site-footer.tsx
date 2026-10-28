import { Link } from "react-router-dom"
import { GitBranch, AtSign, X, Globe } from "lucide-react"

const socials = [
  { icon: GitBranch, href: "https://github.com/VickyIbr/CSUI-Ketemu", label: "GitHub" },
  { icon: AtSign, href: "https://instagram.com", label: "Instagram" },
  { icon: X, href: "https://x.com", label: "X" },
  { icon: Globe, href: "https://linkedin.com", label: "LinkedIn" },
]

const footerLinks = [
  {
    title: "Produk",
    items: [
      { label: "Event", href: "/events" },
      { label: "Course", href: "/courses" },
      { label: "People", href: "/people" },
      { label: "Dashboard", href: "/my" },
    ],
  },
  {
    title: "Perusahaan",
    items: [
      { label: "Tentang kami", href: "#" },
      { label: "Mitra", href: "/mitra" },
      { label: "Karir", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Dukungan",
    items: [
      { label: "Bantuan", href: "#" },
      { label: "Kontak", href: "#" },
      { label: "Kebijakan privasi", href: "#" },
      { label: "Syarat & ketentuan", href: "#" },
    ],
  },
]

const mobileFooterLinks = [
  {
    title: "Legal",
    items: [
      { label: "Kebijakan privasi", href: "#" },
      { label: "Syarat & ketentuan", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="container mx-auto max-w-[1160px] px-5 py-12">
        {/* Brand + socials — always visible */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-ink-blue">
              <img src="/icon/favicon-32x32.png" alt="KeTemu" className="h-6 w-6 rounded-full" />
              KeTemu
            </Link>
            <p className="mt-3 text-sm text-ink-soft max-w-xs">
              Marketplace event edukasi untuk mahasiswa dan profesional.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-ink-soft transition-colors hover:text-ink-blue"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: 3 link columns side by side */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-sm font-semibold text-ink">{group.title}</p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink-blue">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: show links directly (no dropdown) */}
        <div className="mt-6 sm:hidden">
          <div className="grid grid-cols-1 gap-4">
            {mobileFooterLinks.map((group) => (
              <div key={group.title} className="space-y-2">
                <p className="text-sm font-semibold text-ink">{group.title}</p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink-blue">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-sm text-ink-soft">
          © {new Date().getFullYear()} KeTemu. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

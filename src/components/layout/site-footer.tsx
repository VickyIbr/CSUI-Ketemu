import { Link } from "react-router-dom"

const columns = [
  {
    title: "Produk",
    links: [
      { label: "Event", href: "/event" },
      { label: "Workshop", href: "/event?category=workshop" },
      { label: "Seminar", href: "/event?category=seminar" },
      { label: "Kompetisi", href: "/event?category=kompetisi" },
    ],
  },
  {
    title: "Tentang",
    links: [
      { label: "Kebijakan", href: "/blog" },
      { label: "Kontak", href: "/blog" },
      { label: "Karier", href: "/mitra" },
      { label: "Mitra", href: "/mitra" },
    ],
  },
  {
    title: "Hukum",
    links: [
      { label: "Syarat & Ketentuan", href: "/blog" },
      { label: "Privacy", href: "/blog" },
      { label: "Disclaimer", href: "/blog" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="text-lg font-bold text-ink-blue">
              Ketemu
            </Link>
            <p className="text-sm text-ink-soft">
              Marketplace event edukasi untuk mahasiswa dan profesional.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink-soft">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-line text-center text-sm text-ink-soft">
          &copy; {new Date().getFullYear()} Ketemu. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
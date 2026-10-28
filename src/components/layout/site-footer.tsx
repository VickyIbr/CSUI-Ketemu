import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="container mx-auto max-w-[1160px] px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-ink-blue">
                        <img src="/icon/favicon-32x32.png" alt="KeTemu" className="h-6 w-6 rounded-full" />
                        KeTemu
                      </Link>
            <p className="text-sm text-ink-soft">
              Marketplace event edukasi untuk mahasiswa dan profesional.
            </p>
          </div>
          <div className="text-center text-sm text-ink-soft md:text-right">
            &copy; {new Date().getFullYear()} KeTemu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-ink">Masuk</h1>
        <p className="text-ink-soft">Masuk ke akun Ketemu Anda.</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
          <input type="password" placeholder="Kata sandi" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
          <Button className="w-full">Masuk</Button>
        </div>
        <p className="text-center text-sm text-ink-soft">
          Belum punya akun?{" "}
          <Link to="/register" className="text-ink-blue hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}
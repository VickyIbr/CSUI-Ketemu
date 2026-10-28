import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function RegisterPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-ink">Daftar</h1>
        <p className="text-ink-soft">Buat akun Ketemu baru.</p>
        <div className="space-y-4">
          <input type="text" placeholder="Nama lengkap" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
          <input type="email" placeholder="Email" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
          <input type="password" placeholder="Kata sandi" className="w-full rounded-md border border-line bg-paper px-3 py-2" />
          <Button className="w-full">Daftar</Button>
        </div>
        <p className="text-center text-sm text-ink-soft">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-ink-blue hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
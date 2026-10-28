import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/features/auth/hooks/use-auth"

const GOOGLE_ACCOUNTS = [
  { email: "user@ketemu.id", name: "Oscar Ryanda Putra", role: "User", avatar: "O" },
  { email: "partner@ketemu.id", name: "BEM Fasilkom UI", role: "Mitra", avatar: "B" },
  { email: "admin@ketemu.id", name: "Admin KeTemu", role: "Admin", avatar: "A" },
]

export function RegisterPage() {
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [showPicker, setShowPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleSignIn = () => {
    setShowPicker(true)
    setError("")
  }

  const handleAccountSelect = (account: (typeof GOOGLE_ACCOUNTS)[0]) => {
    setLoading(true)
    const session = loginWithGoogle(account.email, account.name)
    if (session) {
      setShowPicker(false)
      setLoading(false)
      if (session.accountType === "mitra") {
        navigate("/mitra")
      } else if (session.accountType === "admin") {
        navigate("/admin")
      } else {
        navigate("/my")
      }
    } else {
      setError("Gagal daftar dengan Google. Coba lagi.")
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-5">
        <Card className="w-[420px] border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-ink">Daftar</CardTitle>
            <CardDescription>
              Sudah punya akun?{" "}
              <Link to="/login" className="text-ink-blue underline underline-offset-2">
                Masuk di sini
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <p className="text-center text-sm text-ink-soft">
              Daftar menggunakan akun Google Anda
            </p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.19 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {loading ? "Memproses..." : "Daftar dengan Google"}
            </button>
          </CardContent>
        </Card>
      </div>

      {showPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="w-[360px] rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-ink">Pilih akun Google</h3>
            <p className="mb-4 text-sm text-ink-soft">
              Pilih akun untuk daftar di KeTemu
            </p>
            <div className="space-y-2">
              {GOOGLE_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleAccountSelect(account)}
                  disabled={loading}
                  className="flex w-full items-center gap-3 rounded-md border border-line p-3 text-left transition-colors hover:bg-muted disabled:opacity-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-blue text-sm font-bold text-white">
                    {account.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{account.name}</p>
                    <p className="text-xs text-ink-soft">{account.email}</p>
                  </div>
                  <span className="text-xs text-ink-soft">{account.role}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="mt-4 w-full text-center text-sm text-ink-soft hover:text-ink"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  )
}
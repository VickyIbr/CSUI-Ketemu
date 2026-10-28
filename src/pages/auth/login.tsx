import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const demoAccounts = [
  { email: "rina@example.com", password: "rahasia123", role: "User biasa" },
  { email: "budi@example.com", password: "rahasia123", role: "Software Engineer" },
]

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const account = demoAccounts.find(
      (a) => a.email === email && a.password === password
    )
    if (account) {
      console.log("Login successful:", account)
    } else {
      setError("Email atau kata sandi salah. Coba ulang.")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-5">
      <Card className="w-[420px] border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-ink">Masuk</CardTitle>
          <CardDescription>
            Belum punya akun?{" "}
            <Link to="/register" className="text-ink-blue underline underline-offset-2">
              Daftar di sini
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                placeholder="Kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              Masuk
            </Button>
          </form>
          <div className="mt-6 rounded-md bg-muted p-4 text-xs text-ink-soft">
            <p className="font-medium">Akun Demo:</p>
            <ul className="mt-2 space-y-1">
              <li>rina@example.com / rahasia123 (User biasa)</li>
              <li>budi@example.com / rahasia123 (Software Engineer)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
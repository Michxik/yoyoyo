"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Hasło do panelu administracyjnego (w rzeczywistym projekcie powinno być przechowywane bezpiecznie na serwerze)
const ADMIN_PASSWORD = "golden123"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Sprawdź, czy użytkownik jest już zalogowany
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true"
    if (isLoggedIn) {
      router.push("/admin/dashboard")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      // Zapisz stan zalogowania w localStorage
      localStorage.setItem("admin_logged_in", "true")
      // Przekieruj do panelu administracyjnego
      router.push("/admin/dashboard")
    } else {
      setError("Nieprawidłowe hasło. Spróbuj ponownie.")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Panel Administracyjny</h1>
          <p className="mt-2 text-gray-600 font-sans">Zaloguj się, aby zarządzać rezerwacjami</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Hasło</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wprowadź hasło"
                className="pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Lock className="mr-2 h-4 w-4" /> Zaloguj się
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 font-sans">
          <p>Dostęp tylko dla autoryzowanego personelu</p>
        </div>
      </div>
    </main>
  )
}

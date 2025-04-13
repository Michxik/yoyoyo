"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true"

    if (isLoggedIn) {
      // Jeśli jest zalogowany, przekieruj do dashboardu
      router.push("/admin/dashboard")
    } else {
      // Jeśli nie jest zalogowany, przekieruj do strony logowania
      router.push("/admin/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Przekierowywanie...</p>
    </div>
  )
}

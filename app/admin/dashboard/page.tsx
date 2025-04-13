"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { LogOut, Car } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { allVehicles } from "@/lib/vehicles"

// Interfejs dla rezerwacji
interface Reservation {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleId: string
  date: string
  pickupTime: {
    hour: string
    minute: string
  }
  pickupLocation: string
  additionalInfo?: string
  createdAt: string
  status: "pending" | "confirmed" | "cancelled"
}

export default function AdminDashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true"

    if (!isLoggedIn) {
      // Jeśli nie jest zalogowany, przekieruj do strony logowania
      router.push("/admin/login")
      return
    }

    // Pobierz rezerwacje z localStorage
    const storedReservations = localStorage.getItem("goldencar_reservations")

    if (storedReservations) {
      const parsedReservations = JSON.parse(storedReservations)
      // Sortuj rezerwacje od najnowszych do najstarszych
      parsedReservations.sort(
        (a: Reservation, b: Reservation) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setReservations(parsedReservations)
    }

    setIsLoading(false)
  }, [router])

  const handleStatusChange = (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === id ? { ...reservation, status: newStatus } : reservation,
    )

    setReservations(updatedReservations)
    localStorage.setItem("goldencar_reservations", JSON.stringify(updatedReservations))
  }

  const handleLogout = () => {
    // Usuń stan zalogowania z localStorage
    localStorage.removeItem("admin_logged_in")
    // Przekieruj do strony logowania
    router.push("/admin/login")
  }

  const handleManageVehicles = () => {
    router.push("/admin/vehicles")
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Panel Administracyjny</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Zarządzanie Rezerwacjami</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Przeglądaj i zarządzaj rezerwacjami klientów
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut size={16} /> Wyloguj się
              </Button>
              <Button onClick={handleManageVehicles} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Car size={16} /> Zarządzaj pojazdami
              </Button>
            </div>
          </div>

          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableCaption>Lista wszystkich rezerwacji</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Data utworzenia</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Samochód</TableHead>
                  <TableHead>Data ślubu</TableHead>
                  <TableHead>Godzina odbioru</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Ładowanie rezerwacji...
                    </TableCell>
                  </TableRow>
                ) : reservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Brak rezerwacji do wyświetlenia
                    </TableCell>
                  </TableRow>
                ) : (
                  reservations.map((reservation) => {
                    const vehicle = allVehicles.find((v) => v.id === reservation.vehicleId)
                    const reservationDate = new Date(reservation.date)

                    return (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          {format(new Date(reservation.createdAt), "dd.MM.yyyy HH:mm", { locale: pl })}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {reservation.firstName} {reservation.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">{reservation.email}</div>
                          <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                        </TableCell>
                        <TableCell>{vehicle?.name || reservation.vehicleId}</TableCell>
                        <TableCell>{format(reservationDate, "dd.MM.yyyy", { locale: pl })}</TableCell>
                        <TableCell>
                          {reservation.pickupTime.hour}:{reservation.pickupTime.minute}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reservation.status === "confirmed"
                                ? "default"
                                : reservation.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {reservation.status === "pending" && "Oczekująca"}
                            {reservation.status === "confirmed" && "Potwierdzona"}
                            {reservation.status === "cancelled" && "Anulowana"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusChange(reservation.id, "confirmed")}
                              className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                            >
                              Potwierdź
                            </button>
                            <button
                              onClick={() => handleStatusChange(reservation.id, "cancelled")}
                              className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                            >
                              Anuluj
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  )
}

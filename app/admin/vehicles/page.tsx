"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Edit, Trash2, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { allVehicles } from "@/lib/vehicles"
import type { Vehicle } from "@/lib/vehicles"

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
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

    // Pobierz pojazdy z localStorage lub z domyślnej listy
    const storedVehicles = localStorage.getItem("goldencar_vehicles")

    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles))
    } else {
      // Jeśli nie ma pojazdów w localStorage, użyj domyślnej listy
      setVehicles(allVehicles)
      // Zapisz domyślną listę do localStorage
      localStorage.setItem("goldencar_vehicles", JSON.stringify(allVehicles))
    }

    setIsLoading(false)
  }, [router])

  const handleAddVehicle = () => {
    router.push("/admin/vehicles/add")
  }

  const handleEditVehicle = (id: string) => {
    router.push(`/admin/vehicles/edit/${id}`)
  }

  const handleDeleteVehicle = (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten pojazd?")) {
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id)
      setVehicles(updatedVehicles)
      localStorage.setItem("goldencar_vehicles", JSON.stringify(updatedVehicles))
    }
  }

  const handleBackToDashboard = () => {
    router.push("/admin/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2">
              <ArrowLeft size={16} /> Powrót do panelu
            </Button>
            <Button onClick={handleAddVehicle} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Plus size={16} /> Dodaj nowy pojazd
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Panel Administracyjny</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Zarządzanie Pojazdami</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Dodawaj, edytuj i usuwaj pojazdy w swojej ofercie
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zdjęcie</TableHead>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Rok</TableHead>
                    <TableHead>Cena</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Ładowanie pojazdów...
                      </TableCell>
                    </TableRow>
                  ) : vehicles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Brak pojazdów do wyświetlenia
                      </TableCell>
                    </TableRow>
                  ) : (
                    vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <Image
                              src={vehicle.image || "/placeholder.svg"}
                              alt={vehicle.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{vehicle.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{vehicle.description}</div>
                        </TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.pricePerDay} PLN</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {vehicle.featured && <Badge variant="default">Wyróżniony</Badge>}
                            {vehicle.homePage && <Badge variant="default">Strona Główna</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditVehicle(vehicle.id)}
                              className="h-8 px-2"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                              className="h-8 px-2 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getAllVehicles } from "@/lib/vehicles-service"
import type { Vehicle } from "@/lib/vehicles"

export default function ReservationPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const router = useRouter()

  useEffect(() => {
    // Pobierz wszystkie pojazdy
    setVehicles(getAllVehicles())
  }, [])

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId)
  }

  const handleContinue = () => {
    if (selectedVehicle) {
      router.push(`/vehicles/${selectedVehicle}`)

      // Opóźnienie, aby dać czas na załadowanie strony
      setTimeout(() => {
        const headerHeight = 80 // Przybliżona wysokość nagłówka
        window.scrollTo(0, headerHeight)
      }, 100)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Rezerwacja</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Dokonaj Rezerwacji</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Wybierz wymarzony samochód ślubny, aby rozpocząć proces rezerwacji
            </p>
          </div>

          <Card className="border rounded-lg p-6 bg-card">
            <CardContent className="p-0 pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Wybierz samochód</Label>
                  <Select value={selectedVehicle} onValueChange={handleVehicleSelect}>
                    <SelectTrigger className="border-gray-300 focus:ring-primary">
                      <SelectValue placeholder="Wybierz samochód" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!selectedVehicle}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Kontynuuj rezerwację
                </Button>

                <div className="text-center text-sm text-muted-foreground font-sans">
                  <p>Po wybraniu samochodu zostaniesz przekierowany do formularza rezerwacji</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

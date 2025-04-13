"use client"

import { useEffect, useState } from "react"
import { VehicleCard } from "@/components/vehicle-card"
import { getAllVehicles } from "@/lib/vehicles-service"
import type { Vehicle } from "@/lib/vehicles"

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    // Pobierz wszystkie pojazdy
    const allVehicles = getAllVehicles()

    // Sortuj pojazdy tak, aby wyróżnione były na górze
    const sortedVehicles = [...allVehicles].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    setVehicles(sortedVehicles)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Nasza Flota</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nasza Luksusowa Flota</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Przeglądaj naszą kolekcję ekskluzywnych pojazdów dostępnych na Twój dzień ślubu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

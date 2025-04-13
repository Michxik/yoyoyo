"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Vehicle } from "@/lib/vehicles"

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter()

  const navigateWithScroll = (path: string) => {
    router.push(path)

    // Jeśli to strona główna, przewijamy na samą górę
    // W przeciwnym razie przewijamy nieco niżej, aby uniknąć dużej przerwy
    if (path === "/") {
      window.scrollTo(0, 0)
    } else {
      // Opóźnienie, aby dać czas na załadowanie strony
      setTimeout(() => {
        const headerHeight = 80 // Przybliżona wysokość nagłówka
        window.scrollTo(0, headerHeight)
      }, 100)
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg elegant-shadow elegant-border group">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={vehicle.name}
          fill
          className="object-cover object-center transition-transform group-hover:scale-105 duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {vehicle.featured && (
          <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90 font-sans">Polecany</Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{vehicle.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 font-sans">{vehicle.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-semibold text-primary">
            {vehicle.pricePerDay} PLN
            <span className="text-xs text-muted-foreground font-sans"> / dzień</span>
          </div>
          <div className="text-sm text-muted-foreground font-sans">
            {vehicle.year} • {vehicle.color}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          variant="outline"
          className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary font-sans"
          onClick={() => navigateWithScroll(`/vehicles/${vehicle.id}`)}
        >
          Szczegóły
        </Button>
      </CardFooter>
    </Card>
  )
}

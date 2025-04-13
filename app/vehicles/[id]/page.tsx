"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, Info, Users, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReservationForm } from "@/components/reservation-form"
import { getVehicleById } from "@/lib/vehicles-service"
import type { Vehicle } from "@/lib/vehicles"

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allImages, setAllImages] = useState<string[]>([])

  useEffect(() => {
    const fetchVehicle = () => {
      const foundVehicle = getVehicleById(params.id)
      if (foundVehicle) {
        setVehicle(foundVehicle)

        // Przygotuj tablicę wszystkich zdjęć (główne + galeria)
        const images = [foundVehicle.image]
        if (foundVehicle.gallery && foundVehicle.gallery.length > 0) {
          images.push(...foundVehicle.gallery)
        }
        setAllImages(images)
      } else {
        notFound()
      }
      setIsLoading(false)
    }

    fetchVehicle()
    setCurrentImageIndex(0) // Reset indeksu zdjęcia przy zmianie pojazdu
  }, [params.id])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Ładowanie...</p>
      </main>
    )
  }

  if (!vehicle) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {/* Główne zdjęcie z nawigacją */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg group">
                <Image
                  src={allImages[currentImageIndex] || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Strzałki nawigacyjne */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Poprzednie zdjęcie"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Następne zdjęcie"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Miniatury galerii */}
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-md cursor-pointer ${
                      currentImageIndex === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${vehicle.name} - Zdjęcie ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{vehicle.name}</h1>
                <div className="flex items-center mt-2 text-amber-500">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  <span className="ml-2 text-gray-600">({vehicle.reviewCount} opinii)</span>
                </div>
              </div>

              <p className="text-xl font-semibold">
                {vehicle.pricePerDay} PLN <span className="text-base font-normal text-muted-foreground">za dzień</span>
              </p>

              <div className="prose max-w-none">
                <p>{vehicle.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>Rok: {vehicle.year}</span>
                </div>
                <div className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  <span>Kolor: {vehicle.color}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span>Miejsca: {vehicle.seats}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <span>Dostępność: Na zapytanie</span>
                </div>
              </div>

              <Tabs defaultValue="reservation">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="reservation">Zarezerwuj</TabsTrigger>
                  <TabsTrigger value="features">Wyposażenie</TabsTrigger>
                </TabsList>
                <TabsContent value="reservation" className="p-4 border rounded-md mt-2">
                  <ReservationForm vehicleId={vehicle.id} vehicleName={vehicle.name} />
                </TabsContent>
                <TabsContent value="features" className="p-4 border rounded-md mt-2">
                  <ul className="space-y-2">
                    {vehicle.features?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 mr-2 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { allVehicles } from "@/lib/vehicles"
import type { Vehicle } from "@/lib/vehicles"

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Vehicle>>({})
  const [isLoading, setIsLoading] = useState(true)

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
    let vehicles: Vehicle[] = []

    if (storedVehicles) {
      vehicles = JSON.parse(storedVehicles)
    } else {
      vehicles = allVehicles
    }

    // Znajdź pojazd o podanym ID
    const vehicle = vehicles.find((v) => v.id === params.id)

    if (vehicle) {
      setFormData(vehicle)
    } else {
      // Jeśli nie znaleziono pojazdu, przekieruj do listy pojazdów
      alert("Nie znaleziono pojazdu o podanym ID")
      router.push("/admin/vehicles")
    }

    setIsLoading(false)
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "seats" || name === "pricePerDay" || name === "reviewCount"
          ? Number.parseInt(value, 10)
          : value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleGalleryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedGallery = [...(prev.gallery || [])]
      updatedGallery[index] = value
      return {
        ...prev,
        gallery: updatedGallery,
      }
    })
  }

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedFeatures = [...(prev.features || [])]
      updatedFeatures[index] = value
      return {
        ...prev,
        features: updatedFeatures,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Walidacja podstawowych pól
    if (!formData.name || !formData.description || !formData.image) {
      alert("Wypełnij wszystkie wymagane pola (nazwa, opis, zdjęcie główne)")
      return
    }

    // Filtrowanie pustych wartości z galerii i funkcji
    const gallery = formData.gallery?.filter((img) => img.trim() !== "") || []
    const features = formData.features?.filter((feature) => feature.trim() !== "") || []

    // Aktualizacja pojazdu
    const updatedVehicle: Vehicle = {
      id: params.id,
      name: formData.name || "",
      description: formData.description || "",
      year: formData.year || new Date().getFullYear(),
      color: formData.color || "",
      seats: formData.seats || 4,
      pricePerDay: formData.pricePerDay || 0,
      image: formData.image || "",
      gallery,
      features,
      available: true,
      featured: formData.featured ?? false,
      homePage: formData.homePage ?? false,
      reviewCount: formData.reviewCount || 0,
    }

    // Pobierz istniejące pojazdy z localStorage
    const storedVehicles = localStorage.getItem("goldencar_vehicles")
    let vehicles: Vehicle[] = []

    if (storedVehicles) {
      vehicles = JSON.parse(storedVehicles)
    } else {
      vehicles = [...allVehicles]
    }

    // Znajdź indeks pojazdu do aktualizacji
    const vehicleIndex = vehicles.findIndex((v) => v.id === params.id)

    if (vehicleIndex !== -1) {
      // Aktualizuj pojazd
      vehicles[vehicleIndex] = updatedVehicle
    } else {
      // Jeśli nie znaleziono pojazdu, dodaj nowy
      vehicles.push(updatedVehicle)
    }

    // Zapisz zaktualizowaną listę pojazdów
    localStorage.setItem("goldencar_vehicles", JSON.stringify(vehicles))

    // Przekieruj do listy pojazdów
    router.push("/admin/vehicles")
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Ładowanie...</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/vehicles")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Powrót do listy pojazdów
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Panel Administracyjny</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Edytuj Pojazd</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Zaktualizuj informacje o pojeździe
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nazwa pojazdu*</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder="np. Rolls-Royce Phantom"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Główne zdjęcie (URL)*</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image || ""}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Opis*</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder="Opis pojazdu..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Rok produkcji</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year || ""}
                      onChange={handleInputChange}
                      min={1900}
                      max={new Date().getFullYear()}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Kolor</Label>
                    <Input
                      id="color"
                      name="color"
                      value={formData.color || ""}
                      onChange={handleInputChange}
                      placeholder="np. Czarny"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seats">Liczba miejsc</Label>
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      value={formData.seats || ""}
                      onChange={handleInputChange}
                      min={1}
                      max={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerDay">Cena za dzień (PLN)</Label>
                    <Input
                      id="pricePerDay"
                      name="pricePerDay"
                      type="number"
                      value={formData.pricePerDay || ""}
                      onChange={handleInputChange}
                      min={0}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Galeria zdjęć (URL)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[0, 1, 2].map((index) => (
                        <Input
                          key={index}
                          value={formData.gallery?.[index] || ""}
                          onChange={(e) => handleGalleryChange(index, e.target.value)}
                          placeholder={`URL zdjęcia ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Wyposażenie i funkcje</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <Input
                          key={index}
                          value={formData.features?.[index] || ""}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Funkcja ${index + 1}, np. Klimatyzacja`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewCount">Liczba opinii</Label>
                    <Input
                      id="reviewCount"
                      name="reviewCount"
                      type="number"
                      value={formData.reviewCount || ""}
                      onChange={handleInputChange}
                      min={0}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured ?? false}
                        onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                      />
                      <Label htmlFor="featured">Wyróżniony (na górze listy)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="homePage"
                        checked={formData.homePage ?? false}
                        onCheckedChange={(checked) => handleSwitchChange("homePage", checked)}
                      />
                      <Label htmlFor="homePage">Strona Główna</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/vehicles")}>
                    Anuluj
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Zapisz zmiany
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CalendarIcon, Check, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { getAllVehicles } from "@/lib/vehicles-service"
import type { Vehicle } from "@/lib/vehicles"

interface ReservationFormProps {
  vehicleId?: string
  vehicleName?: string
}

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

// Interfejs dla danych formularza
interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupLocation: string
  additionalInfo: string
}

export function ReservationForm({ vehicleId, vehicleName }: ReservationFormProps) {
  // Stan dla danych formularza, które chcemy zachować między zakładkami
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    additionalInfo: "",
  })

  const [date, setDate] = useState<Date | undefined>()
  const [hour, setHour] = useState<string>("")
  const [minute, setMinute] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const router = useRouter()

  useEffect(() => {
    // Pobierz wszystkie pojazdy
    setVehicles(getAllVehicles())
  }, [])

  // Funkcja do aktualizacji danych formularza
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name === "first-name"
        ? "firstName"
        : name === "last-name"
          ? "lastName"
          : name === "pickup-location"
            ? "pickupLocation"
            : name === "additional-info"
              ? "additionalInfo"
              : name]: value,
    }))
  }

  const handleVehicleChange = (value: string) => {
    if (value !== vehicleId) {
      router.push(`/vehicles/${value}`)

      // Dodajemy opóźnienie, aby dać czas na załadowanie strony
      setTimeout(() => {
        // Przewijamy stronę nieco niżej, aby uniknąć dużej przerwy
        const headerHeight = 80 // Przybliżona wysokość nagłówka
        window.scrollTo({
          top: headerHeight,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      // Zbierz dane z formularza
      const formDataObj = new FormData(e.currentTarget)

      // Walidacja danych
      const firstName = formDataObj.get("first-name") as string
      const lastName = formDataObj.get("last-name") as string
      const email = formDataObj.get("email") as string
      const phone = formDataObj.get("phone") as string
      const selectedVehicleId = (formDataObj.get("vehicle") as string) || vehicleId
      const pickupLocation = formDataObj.get("pickup-location") as string
      const additionalInfo = formDataObj.get("additional-info") as string

      // Podstawowa walidacja
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !selectedVehicleId ||
        !date ||
        !hour ||
        !minute ||
        !pickupLocation
      ) {
        setFormStatus({
          success: false,
          message: "Wszystkie wymagane pola muszą być wypełnione",
        })
        setIsSubmitting(false)
        return
      }

      // Walidacja email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setFormStatus({
          success: false,
          message: "Podaj prawidłowy adres email",
        })
        setIsSubmitting(false)
        return
      }

      // Walidacja numeru telefonu (podstawowa)
      const phoneRegex = /^\+?[0-9\s-]{9,15}$/
      if (!phoneRegex.test(phone)) {
        setFormStatus({
          success: false,
          message: "Podaj prawidłowy numer telefonu",
        })
        setIsSubmitting(false)
        return
      }

      // Generuj unikalny ID
      const id = Date.now().toString()

      // Tworzenie nowej rezerwacji
      const newReservation: Reservation = {
        id,
        firstName,
        lastName,
        email,
        phone,
        vehicleId: selectedVehicleId,
        date: date?.toISOString() || new Date().toISOString(),
        pickupTime: {
          hour,
          minute,
        },
        pickupLocation,
        additionalInfo: additionalInfo || "",
        createdAt: new Date().toISOString(),
        status: "pending",
      }

      // Pobierz istniejące rezerwacje z localStorage
      let reservations: Reservation[] = []
      const storedReservations = localStorage.getItem("goldencar_reservations")

      if (storedReservations) {
        reservations = JSON.parse(storedReservations)
      }

      // Dodaj nową rezerwację
      reservations.push(newReservation)

      // Zapisz zaktualizowane rezerwacje w localStorage
      localStorage.setItem("goldencar_reservations", JSON.stringify(reservations))

      // Ustaw status sukcesu
      setFormStatus({
        success: true,
        message:
          "Dziękujemy za Twoją prośbę o rezerwację! Skontaktujemy się z Tobą wkrótce, aby potwierdzić szczegóły.",
      })

      // Zresetuj formularz
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        pickupLocation: "",
        additionalInfo: "",
      })
      setDate(undefined)
      setHour("")
      setMinute("")
    } catch (error) {
      console.error("Błąd podczas dodawania rezerwacji:", error)
      setFormStatus({
        success: false,
        message: "Wystąpił błąd podczas przetwarzania rezerwacji. Spróbuj ponownie później.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="first-name">Imię</Label>
          <Input
            id="first-name"
            name="first-name"
            placeholder="Wpisz swoje imię"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Nazwisko</Label>
          <Input
            id="last-name"
            name="last-name"
            placeholder="Wpisz swoje nazwisko"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Wpisz swój email"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Wpisz swój numer telefonu"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vehicle">Samochód</Label>
        <Select defaultValue={vehicleId} name="vehicle" onValueChange={handleVehicleChange}>
          <SelectTrigger className="border-gray-300 focus:ring-primary">
            <SelectValue placeholder={vehicleName || "Wybierz samochód"} />
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

      <div className="space-y-2">
        <Label>Data Ślubu</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-gray-300",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {date ? format(date, "PPP", { locale: pl }) : "Wybierz datę ślubu"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
              className="rounded-md border"
              locale={pl}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="pickup-time">Godzina Odbioru</Label>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="border-gray-300 focus:ring-primary">
                  <SelectValue placeholder="Godz." />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const hourValue = i + 8 // Godziny od 8 do 16
                    return (
                      <SelectItem key={hourValue} value={hourValue.toString().padStart(2, "0")}>
                        {hourValue.toString().padStart(2, "0")}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Select value={minute} onValueChange={setMinute}>
                <SelectTrigger className="border-gray-300 focus:ring-primary">
                  <SelectValue placeholder="Min." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="00">00</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pickup-location">Miejsce Odbioru</Label>
          <Input
            id="pickup-location"
            name="pickup-location"
            placeholder="Wpisz adres odbioru"
            required
            className="border-gray-300 focus:border-primary focus:ring-primary"
            value={formData.pickupLocation}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-info">Dodatkowe Informacje</Label>
        <Textarea
          id="additional-info"
          name="additional-info"
          placeholder="Specjalne prośby lub dodatkowe informacje"
          className="min-h-[100px] border-gray-300 focus:border-primary focus:ring-primary"
          value={formData.additionalInfo}
          onChange={handleInputChange}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Wysyłanie..." : "Wyślij Prośbę o Rezerwację"}
      </Button>

      {/* Informacja o niezobowiązującym charakterze rezerwacji */}
      <p className="text-sm text-muted-foreground text-center mt-2">
        Złożenie rezerwacji nie jest wiążące — skontaktujemy się z Tobą, by potwierdzić dostępność.
      </p>

      {/* Komunikat o statusie rezerwacji przeniesiony pod przycisk */}
      {formStatus && (
        <Alert variant={formStatus.success ? "default" : "destructive"} className="mt-4">
          <div className="flex items-center gap-2">
            {formStatus.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{formStatus.success ? "Sukces" : "Błąd"}</AlertTitle>
          </div>
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}

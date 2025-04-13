"use server"

import { revalidatePath } from "next/cache"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import type { Reservation } from "@/lib/types"

// Ścieżka do pliku JSON z rezerwacjami (w prawdziwym projekcie użylibyśmy bazy danych)
const dataFilePath = path.join(process.cwd(), "data", "reservations.json")

// Funkcja pomocnicza do odczytu rezerwacji
const getReservations = (): Reservation[] => {
  try {
    // Sprawdź czy katalog istnieje, jeśli nie - utwórz go
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Sprawdź czy plik istnieje, jeśli nie - utwórz go z pustą tablicą
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]))
      return []
    }

    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Błąd podczas odczytu rezerwacji:", error)
    return []
  }
}

// Funkcja pomocnicza do zapisu rezerwacji
const saveReservations = (reservations: Reservation[]) => {
  try {
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(reservations, null, 2))
  } catch (error) {
    console.error("Błąd podczas zapisu rezerwacji:", error)
    throw new Error("Nie udało się zapisać rezerwacji")
  }
}

// Funkcja do dodawania nowej rezerwacji
export async function addReservation(formData: FormData) {
  try {
    // Walidacja danych
    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const vehicleId = formData.get("vehicle") as string
    const date = formData.get("date") as string
    const hour = formData.get("hour") as string
    const minute = formData.get("minute") as string
    const pickupLocation = formData.get("pickup-location") as string
    const additionalInfo = formData.get("additional-info") as string

    // Podstawowa walidacja
    if (!firstName || !lastName || !email || !phone || !vehicleId || !date || !hour || !minute || !pickupLocation) {
      return { success: false, message: "Wszystkie wymagane pola muszą być wypełnione" }
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: "Podaj prawidłowy adres email" }
    }

    // Walidacja numeru telefonu (podstawowa)
    const phoneRegex = /^\+?[0-9\s-]{9,15}$/
    if (!phoneRegex.test(phone)) {
      return { success: false, message: "Podaj prawidłowy numer telefonu" }
    }

    // Tworzenie nowej rezerwacji
    const newReservation: Reservation = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phone,
      vehicleId,
      date,
      pickupTime: {
        hour,
        minute,
      },
      pickupLocation,
      additionalInfo: additionalInfo || "",
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    // Odczyt istniejących rezerwacji
    const reservations = getReservations()

    // Dodanie nowej rezerwacji
    reservations.push(newReservation)

    // Zapis zaktualizowanych rezerwacji
    saveReservations(reservations)

    // Odświeżenie ścieżki, aby pokazać aktualne dane
    revalidatePath("/reservation")

    return {
      success: true,
      message: "Dziękujemy za Twoją prośbę o rezerwację! Skontaktujemy się z Tobą wkrótce, aby potwierdzić szczegóły.",
    }
  } catch (error) {
    console.error("Błąd podczas dodawania rezerwacji:", error)
    return {
      success: false,
      message: "Wystąpił błąd podczas przetwarzania rezerwacji. Spróbuj ponownie później.",
    }
  }
}

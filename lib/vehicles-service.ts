import { allVehicles, type Vehicle } from "./vehicles"

// Funkcja do pobierania wszystkich pojazdów
export function getAllVehicles(): Vehicle[] {
  // Sprawdź, czy są pojazdy w localStorage
  const storedVehicles = localStorage.getItem("goldencar_vehicles")

  if (storedVehicles) {
    return JSON.parse(storedVehicles)
  }

  // Jeśli nie ma pojazdów w localStorage, użyj domyślnej listy
  return allVehicles
}

// Funkcja do pobierania wyróżnionych pojazdów
export function getFeaturedVehicles(): Vehicle[] {
  const vehicles = getAllVehicles()
  return vehicles.filter((vehicle) => vehicle.featured)
}

// Funkcja do pobierania pojazdów na stronę główną
export function getHomePageVehicles(): Vehicle[] {
  const vehicles = getAllVehicles()
  return vehicles.filter((vehicle) => vehicle.homePage)
}

// Funkcja do pobierania pojazdu po ID
export function getVehicleById(id: string): Vehicle | undefined {
  const vehicles = getAllVehicles()
  return vehicles.find((vehicle) => vehicle.id === id)
}

// Funkcja do dodawania nowego pojazdu
export function addVehicle(vehicle: Vehicle): void {
  const vehicles = getAllVehicles()
  vehicles.push(vehicle)
  localStorage.setItem("goldencar_vehicles", JSON.stringify(vehicles))
}

// Funkcja do aktualizacji pojazdu
export function updateVehicle(id: string, updatedVehicle: Vehicle): void {
  const vehicles = getAllVehicles()
  const index = vehicles.findIndex((vehicle) => vehicle.id === id)

  if (index !== -1) {
    vehicles[index] = updatedVehicle
    localStorage.setItem("goldencar_vehicles", JSON.stringify(vehicles))
  }
}

// Funkcja do usuwania pojazdu
export function deleteVehicle(id: string): void {
  const vehicles = getAllVehicles()
  const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id)
  localStorage.setItem("goldencar_vehicles", JSON.stringify(updatedVehicles))
}

export interface Vehicle {
  id: string
  name: string
  description: string
  year: number
  color: string
  seats: number
  pricePerDay: number
  image: string
  gallery?: string[]
  features?: string[]
  available: boolean
  featured?: boolean
  homePage?: boolean
  reviewCount: number
}

export const allVehicles: Vehicle[] = [
  {
    id: "rolls-royce-wraith",
    name: "Rolls-Royce Wraith",
    description: "Kwintesencja luksusu i elegancji, idealny do efektownego wjazdu w dniu ślubu.",
    year: 2022,
    color: "Biały",
    seats: 4,
    pricePerDay: 3500,
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
    ],
    features: [
      "Profesjonalny kierowca",
      "Czerwony dywan",
      "Szampan gratis",
      "Niestandardowa dekoracja",
      "Klimatyzacja",
      "System audio premium",
    ],
    available: true,
    featured: true,
    homePage: true,
    reviewCount: 48,
  },
  {
    id: "rolls-royce-phantom",
    name: "Rolls-Royce Phantom",
    description:
      "Idealne połączenie sportowego charakteru i luksusu, Rolls-Royce Phantom oferuje wyrafinowaną jazdę na Twój ślub.",
    year: 2021,
    color: "Czarny",
    seats: 4,
    pricePerDay: 2800,
    image: "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
    ],
    features: [
      "Profesjonalny kierowca",
      "Niestandardowa dekoracja",
      "Klimatyzacja",
      "System audio premium",
      "Skórzane wnętrze",
    ],
    available: true,
    featured: true,
    homePage: true,
    reviewCount: 36,
  },
  {
    id: "mercedes-s-class",
    name: "Mercedes Klasy S",
    description: "Elegancki i wyrafinowany, Mercedes Klasy S zapewnia komfortowe i luksusowe doświadczenie.",
    year: 2023,
    color: "Czarny",
    seats: 4,
    pricePerDay: 1800,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
    ],
    features: [
      "Profesjonalny kierowca",
      "Niestandardowa dekoracja",
      "Klimatyzacja",
      "System audio premium",
      "Panoramiczny dach",
    ],
    available: true,
    featured: true,
    homePage: true,
    reviewCount: 52,
  },
  {
    id: "vintage-jaguar",
    name: "Zabytkowy Jaguar MK2",
    description:
      "Klasyczny wybór na ponadczasowy ślub, ten zabytkowy Jaguar dodaje nutę nostalgii do Twojego wyjątkowego dnia.",
    year: 1965,
    color: "Czarny",
    seats: 4,
    pricePerDay: 2200,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BFRzvkLQDhcbcN028uuTm6f4IMSBHu.png",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BFRzvkLQDhcbcN028uuTm6f4IMSBHu.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BFRzvkLQDhcbcN028uuTm6f4IMSBHu.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BFRzvkLQDhcbcN028uuTm6f4IMSBHu.png",
    ],
    features: [
      "Profesjonalny kierowca",
      "Niestandardowa dekoracja",
      "Skórzane wnętrze",
      "Klasyczny design",
      "Możliwości fotograficzne",
    ],
    available: true,
    reviewCount: 29,
  },
  {
    id: "audi-r8",
    name: "Audi R8",
    description: "Nowoczesny luksus z najnowocześniejszą technologią, Audi R8 oferuje wyrafinowaną i komfortową jazdę.",
    year: 2022,
    color: "Czarny",
    seats: 2,
    pricePerDay: 1600,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2669&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2669&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2669&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2669&auto=format&fit=crop",
    ],
    features: [
      "Profesjonalny kierowca",
      "Niestandardowa dekoracja",
      "Klimatyzacja",
      "System audio premium",
      "Oświetlenie ambientowe",
    ],
    available: true,
    reviewCount: 41,
  },
  {
    id: "classic-mercedes",
    name: "Klasyczny Mercedes 300SL",
    description: "Ikoniczny klasyczny samochód, który dodaje nutę vintage glamour do Twojego dnia ślubu.",
    year: 1957,
    color: "Srebrny",
    seats: 2,
    pricePerDay: 2500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IXBilI9Bbbd8p2Ifvsk9b5FDJ6JZE.png",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IXBilI9Bbbd8p2Ifvsk9b5FDJ6JZE.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IXBilI9Bbbd8p2Ifvsk9b5FDJ6JZE.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IXBilI9Bbbd8p2Ifvsk9b5FDJ6JZE.png",
    ],
    features: [
      "Profesjonalny kierowca",
      "Niestandardowa dekoracja",
      "Skórzane wnętrze",
      "Klasyczny design",
      "Możliwości fotograficzne",
    ],
    available: true,
    reviewCount: 33,
  },
]

export const featuredVehicles = allVehicles.filter((vehicle) => vehicle.featured)

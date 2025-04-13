"use client"

import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VehicleCard } from "@/components/vehicle-card"
import { HeroSection } from "@/components/hero-section"
import { TestimonialCard } from "@/components/testimonial-card"
import { ReservationCta } from "@/components/reservation-cta"
import { getHomePageVehicles } from "@/lib/vehicles-service"
import { useEffect, useState } from "react"
import type { Vehicle } from "@/lib/vehicles"

// Dodaj komponent ClientButton dla przycisku "Zobacz Wszystkie Samochody"
function ClientButton() {
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
    <Button
      className="group bg-primary hover:bg-primary/90 text-white font-sans"
      onClick={() => navigateWithScroll("/vehicles")}
    >
      Zobacz Wszystkie Samochody
      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  )
}

export default function Home() {
  const [homePageVehicles, setHomePageVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    // Pobierz pojazdy oznaczone do wyświetlenia na stronie głównej
    setHomePageVehicles(getHomePageVehicles())
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Featured Vehicles Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Nasza Luksusowa Flota</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Wyjątkowe Pojazdy na Twój Szczególny Dzień
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Wybierz spośród naszej kolekcji ekskluzywnych pojazdów, aby uczynić swój dzień ślubu naprawdę
              niezapomnianym
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {homePageVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <ClientButton />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 wedding-bg-pattern">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Usługi Premium</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Wyjątkowe Usługi Ślubne</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Oferujemy więcej niż tylko piękne samochody na Twój dzień ślubu
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg elegant-shadow elegant-border">
              <div className="rounded-full bg-primary/10 p-5 mb-6">
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
                  className="h-6 w-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Punktualność</h3>
              <p className="text-muted-foreground font-sans">
                Gwarantujemy punktualne przybycie w Twoim szczególnym dniu, zapewniając bezstresowe doświadczenie.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg elegant-shadow elegant-border">
              <div className="rounded-full bg-primary/10 p-5 mb-6">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Spersonalizowana Dekoracja</h3>
              <p className="text-muted-foreground font-sans">
                Niestandardowe dekoracje samochodu dopasowane do motywu i kolorystyki Twojego ślubu.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg elegant-shadow elegant-border">
              <div className="rounded-full bg-primary/10 p-5 mb-6">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Profesjonalni Kierowcy</h3>
              <p className="text-muted-foreground font-sans">
                Doświadczeni, elegancko ubrani kierowcy zapewniający wyjątkową obsługę podczas całej podróży.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Opinie</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Co Mówią Nasi Klienci</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Przeczytaj opinie od naszych zadowolonych par
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <TestimonialCard
              quote="GOLDEN CAR uczynił nasz dzień ślubu idealnym. Rolls-Royce był nieskazitelny, a nasz kierowca był bardzo profesjonalny. Nie mogliśmy prosić o lepsze doświadczenie."
              author="Anna i Marek"
              location="Warszawa"
            />
            <TestimonialCard
              quote="Zabytkowy Mercedes był spełnieniem marzeń dla naszych ślubnych zdjęć. Dziękujemy za wyjątkową obsługę i uczynienie naszego dnia tak wyjątkowym!"
              author="Katarzyna i Piotr"
              location="Kraków"
            />
            <TestimonialCard
              quote="Od rezerwacji do wielkiego dnia, wszystko było perfekcyjne. Bentley był oszałamiający i sprawił, że nasze wejście było niezapomniane. Gorąco polecamy!"
              author="Magdalena i Tomasz"
              location="Gdańsk"
            />
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <ReservationCta />
    </main>
  )
}

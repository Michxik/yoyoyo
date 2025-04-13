"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ReservationCta() {
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
    <section className="w-full py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-block mx-auto">
            <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">
              Zarezerwuj Wymarzony Samochód
            </div>
            <div className="h-0.5 w-12 bg-primary mx-auto"></div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Gotowy, by Uczynić Swój Dzień Ślubu Niezapomnianym?
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed font-sans">
            Dokonaj rezerwacji już teraz i zapewnij sobie idealny luksusowy pojazd na swój wyjątkowy dzień.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-sans"
              onClick={() => navigateWithScroll("/reservation")}
            >
              Zarezerwuj
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-sans"
              onClick={() => navigateWithScroll("/contact")}
            >
              Skontaktuj się
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

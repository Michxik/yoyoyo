"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  // Dodaj hook useRouter
  const router = useRouter()

  // Dodaj funkcję do nawigacji z przewijaniem do góry
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
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding-cars-for-hire.jpg-z0OzTbRfr9DUQaVGWyF0AJeJbwhB1n.jpeg"
          alt="Luksusowe samochody ślubne z panną młodą"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-[1]"></div>
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-block mx-auto">
            <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">
              Luksusowy Transport Ślubny
            </div>
            <div className="h-0.5 w-12 bg-primary mx-auto"></div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Przybądź z <span className="text-primary">Klasą</span> w Swoim Wyjątkowym Dniu
          </h1>
          <p className="mx-auto max-w-[700px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
            Ekskluzywny wynajem samochodów ślubnych z profesjonalnymi kierowcami na Twój idealny dzień ślubu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Zamień Link na Button z onClick */}
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-sans"
              onClick={() => navigateWithScroll("/vehicles")}
            >
              Zobacz Nasze Samochody
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 font-sans"
              onClick={() => navigateWithScroll("/reservation")}
            >
              Zarezerwuj
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-[1]"></div>
    </section>
  )
}

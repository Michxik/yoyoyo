"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

    if (isOpen) setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent",
      )}
    >
      <div className="container relative flex h-20 items-center px-4 md:px-6">
        {/* Logo po lewej stronie */}
        <div className="absolute left-4 md:left-6 cursor-pointer" onClick={() => navigateWithScroll("/")}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6d08fc5b-ef93-48f1-8d70-a39d657f1661_removalai_preview-YHX84hRFW4siRY2mSe475oaEeGUs2Q.png"
            alt="GOLDEN CAR Logo"
            width={250}
            height={165}
            className="w-[250px] h-[165px] object-contain"
          />
        </div>

        {/* Nawigacja wyśrodkowana */}
        <div className="hidden md:flex items-center justify-center w-full">
          <nav className="flex items-center space-x-8 text-sm font-medium font-sans">
            <span
              className="transition-colors hover:text-primary cursor-pointer"
              onClick={() => navigateWithScroll("/")}
            >
              Strona Główna
            </span>
            <span
              className="transition-colors hover:text-primary cursor-pointer"
              onClick={() => navigateWithScroll("/vehicles")}
            >
              Samochody
            </span>
            <span
              className="transition-colors hover:text-primary cursor-pointer"
              onClick={() => navigateWithScroll("/about")}
            >
              O Nas
            </span>
            <span
              className="transition-colors hover:text-primary cursor-pointer"
              onClick={() => navigateWithScroll("/contact")}
            >
              Kontakt
            </span>
          </nav>
        </div>

        {/* Przycisk rezerwacji po prawej stronie */}
        <div className="absolute right-4 md:right-6 hidden md:flex items-center space-x-4">
          <Button
            className="bg-primary hover:bg-primary/90 text-white font-sans"
            onClick={() => navigateWithScroll("/reservation")}
          >
            Zarezerwuj
          </Button>
        </div>

        {/* Menu mobilne */}
        <div className="absolute right-4 md:right-6 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8 font-sans">
                <span
                  className="text-lg font-medium transition-colors hover:text-primary cursor-pointer"
                  onClick={() => navigateWithScroll("/")}
                >
                  Strona Główna
                </span>
                <span
                  className="text-lg font-medium transition-colors hover:text-primary cursor-pointer"
                  onClick={() => navigateWithScroll("/vehicles")}
                >
                  Samochody
                </span>
                <span
                  className="text-lg font-medium transition-colors hover:text-primary cursor-pointer"
                  onClick={() => navigateWithScroll("/about")}
                >
                  O Nas
                </span>
                <span
                  className="text-lg font-medium transition-colors hover:text-primary cursor-pointer"
                  onClick={() => navigateWithScroll("/contact")}
                >
                  Kontakt
                </span>
                <div className="pt-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => navigateWithScroll("/reservation")}
                  >
                    Zarezerwuj
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div onClick={() => navigateWithScroll("/")} className="inline-block cursor-pointer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6d08fc5b-ef93-48f1-8d70-a39d657f1661_removalai_preview-YHX84hRFW4siRY2mSe475oaEeGUs2Q.png"
                alt="GOLDEN CAR Logo"
                width={150}
                height={50}
                className="h-auto w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 font-sans">Ekskluzywny wynajem samochodów na Twój wyjątkowy dzień.</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574254179023"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/auta_slubne_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Szybkie Linki</h3>
            <ul className="space-y-2 font-sans">
              <li>
                <span
                  onClick={() => navigateWithScroll("/")}
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Strona Główna
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigateWithScroll("/vehicles")}
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Samochody
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigateWithScroll("/about")}
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  O Nas
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigateWithScroll("/contact")}
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Kontakt
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigateWithScroll("/reservation")}
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Zarezerwuj
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigateWithScroll("/admin")}
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Panel Administracyjny
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Usługi</h3>
            <ul className="space-y-2 font-sans">
              <li className="text-gray-300">Wynajem Samochodów Ślubnych</li>
              <li className="text-gray-300">Usługi Szoferskie</li>
              <li className="text-gray-300">Dekoracja Samochodu</li>
              <li className="text-gray-300">Sesje Fotograficzne</li>
              <li className="text-gray-300">Specjalne Okazje</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Kontakt</h3>
            <ul className="space-y-3 font-sans">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-gray-300">
                  ul. Weselna 123
                  <br />
                  00-001 Warszawa
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-300">+48 536 891 855</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-300">golldenevent@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-sans">
          <p>&copy; {new Date().getFullYear()} GOLDEN CAR. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Nasza Historia</div>
                <div className="h-0.5 w-12 bg-primary"></div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">O GOLDEN CAR</h1>
              <div className="space-y-4 text-muted-foreground font-sans">
                <p>
                  Golden Car to marka stworzona z myślą o wyjątkowych chwilach. Oferujemy wynajem luksusowych i
                  klasycznych samochodów na śluby oraz inne uroczyste okazje, zapewniając stylową i komfortową oprawę
                  transportową.
                </p>
                <p>
                  Nasza pasja do motoryzacji w połączeniu z dbałością o każdy detal sprawia, że każda podróż z nami
                  staje się niezapomnianym doświadczeniem. Starannie wyselekcjonowana flota oraz profesjonalna obsługa
                  to gwarancja najwyższego standardu i elegancji.
                </p>
                <p>
                  Wierzymy, że ślub to nie tylko cel, ale również droga – i że warto ją pokonać z klasą.
                  <br />
                  Golden Car to więcej niż transport – to wyjątkowa oprawa najważniejszych momentów.
                </p>

                {/* Dodane odnośniki do mediów społecznościowych */}
                <div className="flex space-x-4 pt-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61574254179023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <Facebook className="h-7 w-7 mr-2" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/auta_slubne_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <Instagram className="h-7 w-7 mr-2" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kuu06owd1ZHkGEiAhcRrZkueiKRTr2.png"
                alt="Mercedes ślubny z dekoracją Just Married"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8 text-center">Dlaczego Warto Wybrać GOLDEN CAR?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
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
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Pasja do Doskonałości</h3>
                <p className="text-muted-foreground mt-2 font-sans">
                  Jesteśmy pasjonatami dostarczania wyjątkowych usług i tworzenia niezapomnianych doświadczeń dla
                  naszych klientów.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
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
                <h3 className="text-xl font-bold">Niezawodność</h3>
                <p className="text-muted-foreground mt-2 font-sans">
                  Rozumiemy znaczenie punktualności i niezawodności, szczególnie w dniu Twojego ślubu.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Dbałość o Szczegóły</h3>
                <p className="text-muted-foreground mt-2 font-sans">
                  Od stanu naszych pojazdów po profesjonalizm naszych kierowców, zwracamy uwagę na każdy szczegół.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

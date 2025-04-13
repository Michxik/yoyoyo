import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "GOLDEN CAR - Luksusowy Wynajem Samochodów do Ślubu",
  description:
    "Ekskluzywny wynajem samochodów na ślub. Wybierz z naszej floty eleganckich pojazdów, aby uczynić Twój dzień ślubu niezapomnianym.",
  keywords:
    "samochód do ślubu, wynajem luksusowych aut, transport ślubny, dzień ślubu, ekskluzywne samochody, usługi szoferskie",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} wedding-bg-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
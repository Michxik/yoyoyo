"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block mx-auto">
              <div className="text-xs uppercase tracking-widest text-primary font-sans mb-2">Kontakt</div>
              <div className="h-0.5 w-12 bg-primary mx-auto"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Skontaktuj się z Nami</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
              Masz pytania lub chcesz dokonać rezerwacji? Skontaktuj się z nami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię i Nazwisko</Label>
                    <Input id="name" placeholder="Twoje imię i nazwisko" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Twój email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" placeholder="Twój numer telefonu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Wiadomość</Label>
                    <Textarea id="message" placeholder="Twoja wiadomość" className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full">
                    Wyślij Wiadomość
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Informacje Kontaktowe</h2>
                <p className="text-muted-foreground font-sans">
                  Skontaktuj się z nami za pomocą dowolnego z poniższych kanałów.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Adres</h3>
                    <p className="text-muted-foreground font-sans">
                      ul. Weselna 123
                      <br />
                      00-001 Warszawa
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Telefon</h3>
                    <p className="text-muted-foreground font-sans">+48 536 891 855</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground font-sans">golldenevent@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold mb-2">Godziny Otwarcia</h3>
                <div className="space-y-1 text-muted-foreground font-sans">
                  <p className="flex justify-between">
                    <span>Poniedziałek - Piątek:</span>
                    <span>9:00 - 18:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sobota:</span>
                    <span>10:00 - 16:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Niedziela:</span>
                    <span>Zamknięte</span>
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold mb-2">Obserwuj Nas</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61574254179023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/auta_slubne_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

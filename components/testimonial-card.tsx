import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  location: string
}

export function TestimonialCard({ quote, author, location }: TestimonialCardProps) {
  return (
    <Card className="elegant-shadow elegant-border">
      <CardContent className="p-8 relative">
        <QuoteIcon className="h-10 w-10 text-primary/20 mb-6 absolute top-4 left-4 opacity-50" />
        <div className="pt-4">
          <p className="mb-6 italic font-sans leading-relaxed">{quote}</p>
          <div className="flex items-center">
            <div className="h-0.5 w-8 bg-primary/30 mr-3"></div>
            <div className="text-sm font-semibold">
              {author}
              <span className="ml-2 text-muted-foreground font-normal font-sans">• {location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import type * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function CustomBreadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex flex-wrap items-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function CustomBreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 sm:gap-2.5", className)} {...props} />
}

export function CustomBreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
}

export function CustomBreadcrumbLink({
  href,
  children,
  className,
}: { href: string; children: React.ReactNode; className?: string }) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log(`Navigating to: ${href}`) // Dodajmy log dla debugowania

    router.push(href)

    // Jeśli to strona główna, przewijamy na samą górę
    // W przeciwnym razie przewijamy nieco niżej, aby uniknąć dużej przerwy
    if (href === "/") {
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
    <a
      href={href}
      onClick={handleClick}
      className={cn("hover:text-foreground transition-colors cursor-pointer", className)}
    >
      {children}
    </a>
  )
}

export function CustomBreadcrumbSeparator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("opacity-50", className)} {...props}>
      /
    </span>
  )
}

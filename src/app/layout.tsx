import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import AnimatedBackground from "@/components/background/animated-background"
import Navigation from "@/components/nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MomentumFI - AI AgenT ckBTC",
  description: "A modern Next.js starter with theme support",
  icons: [{ rel: "icon", url: "/logo.png" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import AnimatedBackground from "@/components/background/animated-background"
import Navigation from "@/components/nav"
import Footer from "@/components/footer"
import Providers from "@/components/provider/rainbow-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MomentumFI",
  description: "A modern Next.js starter wi th theme support",
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
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navigation />
            <AnimatedBackground />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
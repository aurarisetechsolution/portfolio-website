import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "aurarise Tech Solutions - Enterprise Technology Powerhouse",
  description:
    "aurarise Tech Solutions delivers enterprise-grade technology solutions, digital transformation, and innovative IT services across Ethiopia and beyond.",
  keywords:
    "enterprise technology solutions, IT consulting, software development, digital transformation, ERP systems, cloud solutions, cybersecurity, Ethiopia, business technology",
  authors: [{ name: "aurarise Tech Solutions" }],
  creator: "aurarise Tech Solutions",
  publisher: "aurarise Tech Solutions",
  openGraph: {
    title: "aurarise Tech Solutions - Enterprise Technology Powerhouse",
    description: "Enterprise-grade technology solutions and digital transformation services for businesses",
    url: "https://aurarisetechsolutions.com",
    siteName: "aurarise Tech Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aurarise Tech Solutions - Enterprise Technology Powerhouse",
    description: "Enterprise-grade technology solutions and digital transformation services for businesses",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

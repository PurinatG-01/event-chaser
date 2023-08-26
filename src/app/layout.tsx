import "./globals.css"
import { Inter } from "next/font/google"
import React from "react"
import AuthProvider from "~/provider/useAuth"
const inter = Inter({ subsets: ["latin"] })
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Chaser | Chofongsua",
  description: `Your Ultimate Event Ticket Seller! Experience the thrill of concerts, sports, and live performances. Simple, secure booking, and unparalleled selection. Join the chase today!.`,
  keywords: ["event", "ticket", "demo", "chofongsua"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

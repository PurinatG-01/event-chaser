"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import React from "react"

import AuthProvider from "~/provider/useAuth"
import MainLayout from "~/layouts/MainLayout"
import { AnimatePresence } from "framer-motion"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <AuthProvider>
            <MainLayout>
              <AnimatePresence mode="wait">{children}</AnimatePresence>
            </MainLayout>
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}

"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import React from "react"
import AuthProvider from "~/provider/useAuth"
import { AnimatePresence } from "framer-motion"
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </AuthProvider>
      </body>
    </html>
  )
}

"use client"
import React from "react"
import MainLayout from "~/layouts/MainLayout"

export default function IndexGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}

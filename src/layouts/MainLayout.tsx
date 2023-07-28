import React from "react"
import MainNavbar from "~/components/MainNavbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <MainNavbar />
      <main className="main-container">{children}</main>
    </>
  )
}

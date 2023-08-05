import React from "react"
import MainNavbar from "~/components/MainNavbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <marquee>
        Please don't mind UX/UI design... I didn't plan it just want to make all
        of the flows complete... 😢
      </marquee> */}
      <MainNavbar />
      <main className="main-container pt-12 ">{children}</main>
    </>
  )
}

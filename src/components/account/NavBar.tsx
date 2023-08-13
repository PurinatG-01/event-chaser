"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export enum TAB {
  PROFILE = "profile",
  TICKETS = "tickets",
  HISTORY = "history",
}

const TabList = [
  {
    id: TAB.PROFILE,
    title: "Profile",
    link: "/account/profile",
  },
  {
    id: TAB.TICKETS,
    title: "Tickets",
    link: "/account/tickets",
  },
  {
    id: TAB.HISTORY,
    title: "History",
    link: "/account/history",
  },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className="flex">
      <div className="flex-grow border-b border-base-300"></div>
      <div className="tabs">
        {TabList.map((tab, index) => (
          <Link
            key={index}
            href={tab.link}
            className={`tab tab-lifted ${
              pathname?.includes(tab.id) ? "tab-active" : ""
            }`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
      <div className="flex-grow border-b border-base-300"></div>
    </div>
  )
}

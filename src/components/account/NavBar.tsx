"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TabList } from "~/config/account"

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

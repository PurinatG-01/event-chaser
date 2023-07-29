import React from "react"
import { Button, Navbar, Link, Text, Avatar } from "@nextui-org/react"
import { useRouter, usePathname } from "next/navigation"
import useUser from "~/hooks/useUser"

export default function MainNavbar() {
  const path = usePathname()
  const { username, isLogin, avatarUrl } = useUser()
  return path?.includes("/login") ? null : (
    <Navbar className="!shadow-none" variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit">
          Event Chaser
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs"></Navbar.Content>
      <Navbar.Content>
        {isLogin ? (
          <Navbar.Link href="#">
            <Avatar src={avatarUrl} size="sm" className="!mr-2" /> {username}
          </Navbar.Link>
        ) : (
          <Navbar.Link color="inherit" href="/login">
            Login
          </Navbar.Link>
        )}
      </Navbar.Content>
    </Navbar>
  )
}

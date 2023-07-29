import React from "react"
import { Button, Navbar, Link, Text, Avatar } from "@nextui-org/react"
import { useRouter, usePathname } from "next/navigation"
import useUser from "~/hooks/useUser"

const navList = [
  { title: "Home", link: "/" },
  { title: "List", link: "/list" },
]
export default function MainNavbar() {
  const path = usePathname()
  const { username, isLogin, avatarUrl } = useUser()
  return path?.includes("/login") ? null : (
    <Navbar bordered variant="sticky" className="!shadow-none">
      <Navbar.Brand>
        <Navbar.Toggle
          showIn="xs"
          css={{
            marginRight: "0.5rem",
          }}
          aria-label="toggle navigation"
        />
        <Text b color="inherit">
          Event Chaser
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        {navList.map((item, index) => (
          <Navbar.Link key={index} href={item.link}>
            {item.title}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Collapse className="!mr-4">
        {navList.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={item.link}
            >
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      <Navbar.Content>
        {isLogin ? (
          <Navbar.Link href="#">
            <Avatar
              color="gradient"
              src={avatarUrl}
              size="sm"
              className="!mr-2"
            />{" "}
            {username}
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

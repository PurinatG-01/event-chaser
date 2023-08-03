import React from "react"
import { Navbar, Text, Avatar, Link as NLink } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import useUser from "~/hooks/useUser"
import Link from "next/link"

const navList = [
  { title: "Home", link: "/" },
  { title: "List", link: "/list" },
]
const NextLink = Link
export default function MainNavbar() {
  const path = usePathname()
  const { username, isLogin, avatarUrl } = useUser()
  return (
    <Navbar variant="sticky" className="!shadow-none">
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
          <Link
            className={`${
              path == item.link ? "font-bold border-black" : ""
            } text-black`}
            key={index}
            href={item.link}
          >
            {item.title}
          </Link>
        ))}
      </Navbar.Content>
      <Navbar.Collapse showIn="xs" className="!mr-4">
        {navList.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <NLink
              isActive={path == item.link}
              className={`!text-black`}
              href={item.link}
            >
              {item.title}
            </NLink>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      <Navbar.Content>
        {isLogin ? (
          <NextLink href="#" className="text-black flex gap-1">
            <Avatar
              color="gradient"
              src={avatarUrl}
              size="sm"
              className="!mr-2"
            />{" "}
            {username}
          </NextLink>
        ) : (
          <NextLink className="text-black" href="/login">
            Login
          </NextLink>
        )}
      </Navbar.Content>
    </Navbar>
  )
}

import React from "react"
import { Button, Navbar, Link, Text } from "@nextui-org/react"

export default function MainNavbar() {
  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit">
          Event Chaser
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/login">
          Login
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  )
}

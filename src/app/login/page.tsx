"use client"
import React from "react"
import { Button, Input } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function LoginPage() {
  return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <motion.section
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="login flex flex-col gap-4 rounded-xl p-4 border max-w-[400px] w-full"
      >
        <form action="" className="login__form flex flex-col gap-4 ">
          <h1 className="text-xl">Event Chaser</h1>
          <Input label="Username" />
          <Input label="Password" />
          <div className="form__action flex gap-4 flex-col">
            <Button color="primary" className="grow" auto>
              Sign in
            </Button>
            <Button color="primary" className="grow" bordered auto>
              Sign up
            </Button>
          </div>
        </form>
      </motion.section>
    </div>
  )
}

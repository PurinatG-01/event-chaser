"use client"
import React, { useState } from "react"
import { Button, Input } from "@nextui-org/react"
import { motion } from "framer-motion"
import useLogin from "~/hooks/useLogin"

export default function LoginPage() {
  const { login, jwt } = useLogin()
  const [formValue, setFormValue] = useState<{
    username: string
    password: string
  }>({
    username: "",
    password: "",
  })

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formValue.username && formValue.password) {
      login(formValue.username, formValue.password)
    }
  }

  const onSetFormValue = (key: "username" | "password", value: string) => {
    setFormValue({
      ...formValue,
      [key]: value,
    })
  }

  return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <motion.section
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="login flex flex-col gap-4 rounded-xl p-4 border max-w-[400px] w-full"
      >
        <form
          onSubmit={onSubmitLogin}
          className="login__form flex flex-col gap-4 "
        >
          <h1 className="text-xl">Event Chaser</h1>
          <Input
            clearable
            onChange={(e) => {
              onSetFormValue("username", e.target.value)
            }}
            label="Username"
          />
          <Input
            clearable
            type="password"
            onChange={(e) => {
              onSetFormValue("password", e.target.value)
            }}
            label="Password"
          />
          <div className="form__action flex gap-4 flex-col">
            <Button type="submit" color="primary" className="grow" auto>
              Sign in
            </Button>
            <Button color="primary" className="grow" bordered auto>
              Sign up
            </Button>
          </div>
        </form>
        <div>jwt : `{jwt}`</div>
      </motion.section>
    </div>
  )
}

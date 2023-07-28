"use client"
import React, { useState } from "react"
import { Button, Input, Loading } from "@nextui-org/react"
import { motion } from "framer-motion"
import useLogin from "~/hooks/useLogin"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { login, jwt, isLoginLoading, loginError } = useLogin()
  const router = useRouter()
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
      login(formValue.username, formValue.password).then((res) => {
        router.push("/")
      })
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
            <Button
              disabled={isLoginLoading}
              type="submit"
              color="primary"
              className="grow"
              auto
            >
              {isLoginLoading && <Loading size="xs" className="!mr-4" />} Sign
              in
            </Button>
            <Button
              disabled={isLoginLoading}
              color="primary"
              className="grow"
              bordered
              auto
            >
              Sign up
            </Button>
          </div>
          {loginError && (
            <div className="text-white text-sm text-center mt-4 rounded-xl bg-red-400 p-2">
              {loginError}
            </div>
          )}
        </form>
      </motion.section>
    </div>
  )
}

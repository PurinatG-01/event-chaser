"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import useLogin from "~/hooks/useLogin"
import { useParams, useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const { login, isLoginLoading, loginError } = useLogin()
  const router = useRouter()
  const referrer = useSearchParams()?.get("referrer")
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
        referrer ? router.push(referrer) : router.push("/")
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
        className="login flex flex-col gap-4 shadow-2xl border border-base-200 bg-base-100 card rounded-xl p-4 max-w-[400px] w-full"
      >
        <form
          onSubmit={onSubmitLogin}
          className="login__form flex flex-col gap-4 "
        >
          <h1 className="text-xl font-bold">
            <button
              className="p-2 py-0 hover:bg-base-300 transition-all rounded-md"
              onClick={() => router.back()}
            >
              {" "}
              «{" "}
            </button>
            Event Chaser
          </h1>
          <input
            type="text"
            onChange={(e) => {
              onSetFormValue("username", e.target.value)
            }}
            placeholder="Username"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            onChange={(e) => {
              onSetFormValue("password", e.target.value)
            }}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <div className="form__action flex gap-4 flex-col">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoginLoading}
            >
              {" "}
              {isLoginLoading && (
                <span className="loading loading-dots loading-md mr-4"></span>
              )}{" "}
              Sign in
            </button>
            <button
              onClick={() => {
                router.push("/signup")
              }}
              className="btn btn-outline"
              disabled={isLoginLoading}
            >
              Sign up
            </button>
          </div>
          {loginError && (
            <div className=" text-sm text-center mt-4 rounded-xl bg-red-400 p-2">
              {loginError}
            </div>
          )}
        </form>
      </motion.section>
    </div>
  )
}

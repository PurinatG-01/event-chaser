"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { FORM_INPUT_FIELD, UserForm } from "~/models/User"
import useSignUp from "~/hooks/useSignUp"

interface SignUpUserForm extends UserForm {
  confirmPassword: string
}

export default function SignUpPage() {
  const { signUp, isLoading, error } = useSignUp()
  const router = useRouter()
  const [formValue, setFormValue] = useState<SignUpUserForm>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    displayImageUrl: "",
    displayName: "",
  })

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let validator = true
    for (const [key, value] of Object.entries(formValue)) {
      validator = validator && !!value
      console.log(value)
      if (!validator) break
    }
    if (formValue.password !== formValue.confirmPassword) {
      validator = false
    }
    if (validator) {
      signUp(formValue).then(() => {
        router.push("/")
      })
    } else {
      // TODO: trigger validator
      console.log(formValue)
    }
  }

  const onSetFormValue = (key: FORM_INPUT_FIELD, value: string) => {
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
          <h1 className="text-xl font-bold flex gap-4 items-center">
            <button
              className="p-2 py-0 hover:bg-base-300 transition-all rounded-md"
              onClick={() => router.back()}
            >
              {" "}
              «{" "}
            </button>
            Sign up
          </h1>
          <input
            type="text"
            onChange={(e) => {
              onSetFormValue(FORM_INPUT_FIELD.USERNAME, e.target.value)
            }}
            placeholder="Username"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            onChange={(e) => {
              onSetFormValue(FORM_INPUT_FIELD.PASSWORD, e.target.value)
            }}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            onChange={(e) => {
              onSetFormValue(FORM_INPUT_FIELD.CONFIRM_PASSWORD, e.target.value)
            }}
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            onChange={(e) => {
              onSetFormValue(FORM_INPUT_FIELD.EMAIL, e.target.value)
            }}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            onChange={(e) => {
              onSetFormValue(FORM_INPUT_FIELD.DISPLAY_IMAGE_URL, e.target.value)
            }}
            placeholder="Display Image Url"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            onChange={(e) => {
              onSetFormValue(FORM_INPUT_FIELD.DISPLAY_NAME, e.target.value)
            }}
            placeholder="Display Name"
            className="input input-bordered w-full"
          />
          <div className="form__action flex gap-4 flex-col">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {" "}
              {isLoading && (
                <span className="loading loading-dots loading-md mr-4"></span>
              )}{" "}
              Sign Up
            </button>
          </div>
          {error && (
            <div className=" text-sm text-center mt-4 rounded-xl bg-red-400 p-2">
              {error}
            </div>
          )}
        </form>
      </motion.section>
    </div>
  )
}

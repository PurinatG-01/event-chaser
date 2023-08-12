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
    displayImgUrl: "",
    displayName: "",
  })

  const inputList = [
    {
      id: FORM_INPUT_FIELD.USERNAME,
      name: "Username",
      type: "text",
      placeholder: "Username",
      key: FORM_INPUT_FIELD.USERNAME,
      errorMessage:
        "Username should be 3-16 characters and sholudn't include any special characters",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: FORM_INPUT_FIELD.DISPLAY_NAME,
      name: "Display Name",
      type: "text",
      placeholder: "Display Name",
      errorMessage: "Should contain at least 3-10 characters",
      key: FORM_INPUT_FIELD.DISPLAY_NAME,
      required: true,
      pattern: "^[A-Za-z0-9]{3,10}$",
    },
    {
      id: FORM_INPUT_FIELD.EMAIL,
      name: "Email",
      type: "email",
      placeholder: "Email",
      key: FORM_INPUT_FIELD.EMAIL,
      errorMessage: "It should be valid email address",
      required: true,
    },
    {
      id: FORM_INPUT_FIELD.PASSWORD,
      name: "Password",
      type: "password",
      placeholder: "Password",
      key: FORM_INPUT_FIELD.PASSWORD,
      errorMessage:
        "Password shold be 8-20 characters and include at least 1 letterm 1 number and 1 special character",
      required: true,
      pattern: "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{8,20}$",
    },
    {
      id: FORM_INPUT_FIELD.CONFIRM_PASSWORD,
      name: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      key: FORM_INPUT_FIELD.CONFIRM_PASSWORD,
      errorMessage: "Password dont't match",
      required: true,
      pattern: formValue.password,
    },
    {
      id: FORM_INPUT_FIELD.DISPLAY_IMAGE_URL,
      name: "Display Image Url",
      type: "text",
      placeholder: "Display Image Url",
      key: FORM_INPUT_FIELD.DISPLAY_IMAGE_URL,
      errorMessage: "It should be valid url",
      required: true,
      pattern: "^(https?://[^s/$.?#]+)[^s]*$",
    },
  ]

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signUp(formValue).then(() => {
      router.push("/")
    })
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
          {inputList.map((input, index) => (
            <div className="flex flex-col" key={input.key}>
              <label className="text-sm font-bold mb-2" htmlFor={input.id}>
                {input.name}
              </label>
              <input
                {...input}
                className="input input-bordered w-full peer invalid:[&:not(:placeholder-shown):not(:focus)]:input-error"
                onChange={(e) => {
                  onSetFormValue(input.key, e.target.value)
                }}
              />
              <span className="text-xs hidden mt-2 text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {input.errorMessage}
              </span>
            </div>
          ))}
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

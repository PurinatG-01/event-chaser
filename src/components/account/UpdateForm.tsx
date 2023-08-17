"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import useUpdateUser from "~/hooks/useUpdateUser"
import { UpdateUserForm } from "~/models/User"

enum DISPLAY_INPUT_FIELD {
  DISPLAY_NAME = "displayName",
  EMAIL = "email",
  DISPLAY_IMAGE_URL = "displayImgUrl",
}

export default function UpdateForm(props: { displayForm: UpdateUserForm }) {
  const { displayForm } = props
  const { updateUser, isLoading, error } = useUpdateUser()
  const [formValue, setFormValue] = useState<UpdateUserForm>({
    email: displayForm.email,
    displayImgUrl: displayForm.displayImgUrl,
    displayName: displayForm.displayName,
  })
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    setFormValue(displayForm)
  }, [displayForm])
  const inputList = [
    {
      id: DISPLAY_INPUT_FIELD.DISPLAY_NAME,
      name: "Display Name",
      type: "text",
      placeholder: "Display Name",
      errorMessage: "Should contain at least 3-10 characters",
      key: DISPLAY_INPUT_FIELD.DISPLAY_NAME,
      required: true,
      pattern: "^[A-Za-z0-9]{3,10}$",
      value: formValue[DISPLAY_INPUT_FIELD.DISPLAY_NAME]
    },
    {
      id: DISPLAY_INPUT_FIELD.EMAIL,
      name: "Email",
      type: "email",
      placeholder: "Email",
      key: DISPLAY_INPUT_FIELD.EMAIL,
      errorMessage: "It should be valid email address",
      value: formValue[DISPLAY_INPUT_FIELD.EMAIL]
    },
    {
      id: DISPLAY_INPUT_FIELD.DISPLAY_IMAGE_URL,
      name: "Display Image Url",
      type: "text",
      placeholder: "Display Image Url",
      key: DISPLAY_INPUT_FIELD.DISPLAY_IMAGE_URL,
      errorMessage: "It should be valid url",
      required: true,
      pattern: "^(https?://[^s/$.?#]+)[^s]*$",
      value: formValue[DISPLAY_INPUT_FIELD.DISPLAY_IMAGE_URL]
    },
  ]

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser(formValue).then(() => {
      setIsEdit(false)
      setFormValue({
        email: displayForm.email,
        displayImgUrl: displayForm.displayImgUrl,
        displayName: displayForm.displayName,
      })
    })
  }

  const onSetFormValue = (key: DISPLAY_INPUT_FIELD, value: string) => {
    setFormValue({
      ...formValue,
      [key]: value,
    })
  }

  return (
    <div className="p-4 flex items-center justify-center w-full">
      <motion.section
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col gap-4 w-full"
      >
        <div className="avatar mx-auto relative">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={formValue.displayImgUrl} />
          </div>
          <button
            className="btn btn-xs rounded-[50%] w-8 h-8 z-10 absolute right-0 bottom-0"
            onClick={() => {
              setIsEdit(!isEdit)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
            </svg>
          </button>
        </div>
        {!isEdit ? (
          <div className="flex flex-col gap-4 w-full">
            {inputList.map((input, index) => (
              <div className="flex flex-col" key={input.key}>
                <label className="text-sm font-bold mb-2" htmlFor={input.id}>
                  {input.name}
                </label>
                <input
                  {...input}
                  className="input w-full pointer-events-none"
                  value={formValue[input.key]}
                />
              </div>
            ))}
          </div>
        ) : (
          <form
            onSubmit={onSubmitLogin}
            className="login__form flex flex-col gap-4 w-full"
          >
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
                Save changes
              </button>
            </div>
            {error && (
              <div className=" text-sm text-center mt-4 rounded-xl bg-red-400 p-2">
                {error}
              </div>
            )}
          </form>
        )}
      </motion.section>
    </div>
  )
}

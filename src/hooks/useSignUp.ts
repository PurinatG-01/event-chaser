import React from "react"
import { UserForm } from "~/models/User"

export default function useSignUp() {
  const signUp = async (formValue: UserForm) => {}
  return {
    signUp,
  }
}

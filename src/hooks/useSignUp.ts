import React, { useState } from "react"
import { UserForm } from "~/models/User"
import useQuery from "./useQuery"
import { useAuth } from "~/provider/useAuth"

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setAuthCookie } = useAuth()
  const [error, setError] = useState<string>("")
  const query = useQuery()
  const signUp = async (formValue: UserForm) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      for (const [key, value] of Object.entries(formValue)) {
        formData.append(key, value)
      }
      const { data } = await query<{ acknowledged: boolean; token: string }>(
        "/signup",
        {
          method: "POST",
          data: formData,
        }
      )
      if (data.data.acknowledged) {
        setAuthCookie(data.data.token)
        setError("")
        return Promise.resolve()
      } else {
        throw new Error("Sign up failed")
      }
    } catch (error) {
      setError((error as Error).message)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    signUp,
    isLoading,
    error,
  }
}

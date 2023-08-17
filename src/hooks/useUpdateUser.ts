import React, { useState } from "react"
import { UpdateUserForm } from "~/models/User"
import useQuery from "./useQuery"
import { useAuth } from "~/provider/useAuth"

export default function useUpdateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setAuthCookie } = useAuth()
  const [error, setError] = useState<string>("")
  const query = useQuery()
  const updateUser = async (formValue: UpdateUserForm) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      for (const [key, value] of Object.entries(formValue)) {
        formData.append(key, value)
      }
      const { data } = await query<{ acknowledged: boolean; token: string }>(
        "/user/update",
        {
          method: "PUT",
          data: formData,
        }
      )
      if (data.data.acknowledged) {
        setAuthCookie(data.data.token)
        setError("")
        return Promise.resolve(data.data)
      } else {
        throw new Error("Update failed")
      }
    } catch (error) {
      setError((error as Error).message)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    updateUser,
    isLoading,
    error,
  }
}

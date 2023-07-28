import React, { useState } from "react"
import { useAuth } from "~/provider/useAuth"
import useQuery from "./useQuery"

interface LoginResponseData {
  token: string
}

export default function useLogin() {
  const { jwt, removeAuthCookie, setAuthCookie } = useAuth()
  const query = useQuery()
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false)
  const [isLoginError, setIsLoginError] = useState<string>("")

  const login = async (username: string, password: string) => {
    setIsLoginLoading(true)
    try {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)
      const { data } = await query<LoginResponseData>("/login", {
        method: "POST",
        data: formData,
      })
      if (data.data) {
        const token = data.data.token ?? ""
        if (!token) {
          throw new Error("Token not found")
        } else {
          setAuthCookie(token)
        }
      }
    } catch (error) {
      console.error("> error : ", error)
      setIsLoginError((error as Error).message || "[POST] Login error")
      return Promise.reject(error)
    } finally {
      setIsLoginLoading(false)
    }
  }
  const logout = () => {
    removeAuthCookie()
  }
  return { jwt, login, logout, isLoginError, isLoginLoading }
}

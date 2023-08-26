"use client"
import { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { COOKIES_JWT_NAME } from "~/models/General"

interface AuthContextType {
  jwt: string | null
  setAuthCookie: (token: string) => void
  removeAuthCookie: () => void
}

const AuthContext = createContext<AuthContextType>({
  jwt: null,
  setAuthCookie: () => {},
  removeAuthCookie: () => {},
})
export const useAuth = (): AuthContextType => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [jwt, setJWT] = useState<string | null>(null)

  // Function to set the JWT in cookies
  const setAuthCookie = (token: string) => {
    Cookies.set(COOKIES_JWT_NAME, token, { expires: 7 }) // Expiry set to 7 days
    setJWT(token)
  }

  // Function to remove the JWT from cookies
  const removeAuthCookie = () => {
    Cookies.remove(COOKIES_JWT_NAME)
    setJWT(null)
  }

  useEffect(() => {
    // On component mount, retrieve the JWT from cookies (if available)
    const token = Cookies.get(COOKIES_JWT_NAME)
    if (token) {
      setJWT(token)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ jwt, setAuthCookie, removeAuthCookie }}>
      {children}
    </AuthContext.Provider>
  )
}

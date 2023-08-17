import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react"
import { useAuth } from "~/provider/useAuth"

interface JWT_DECODED {
  id: number
  username: string
  displayName: string
  displayImgUrl: string
  email: string
  exp: number
  iat: number
  iss: string
}

export default function useUser() {
  const { jwt } = useAuth()
  const [username, setUserName] = useState<string>("")
  const [userId, setUserId] = useState<number>(0)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  useEffect(() => {
    if (jwt) {
      const { username, id, displayImgUrl, displayName, email } =
        jwt_decode<JWT_DECODED>(jwt) ?? {
          username: "",
          userId: "",
        }
      setUserName(username)
      setUserId(id)
      setAvatarUrl(displayImgUrl)
      setIsLogin(!!jwt)
      setDisplayName(displayName)
      setEmail(email)
    } else {
      setUserName("")
      setUserId(0)
      setAvatarUrl("")
      setIsLogin(false)
      setDisplayName("")
      setEmail("")
    }
  }, [jwt])
  return { username, userId, isLogin, avatarUrl, displayName, email }
}

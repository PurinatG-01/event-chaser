import jwt_decode from "jwt-decode"
import { use, useEffect, useState } from "react"
import { useAuth } from "~/provider/useAuth"

interface JWT_DECODED {
  id: number
  username: string
  displayName: string
  displayImgUrl: string
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
  useEffect(() => {
    if (jwt) {
      const { username, id, displayImgUrl } = jwt_decode<JWT_DECODED>(jwt) ?? {
        username: "",
        userId: "",
      }
      setUserName(username)
      setUserId(id)
      setAvatarUrl(displayImgUrl)
      setIsLogin(!!jwt)
    }
  }, [jwt])
  return { username, userId, isLogin, avatarUrl }
}

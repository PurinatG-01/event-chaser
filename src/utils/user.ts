import { cookies } from "next/headers"
import { COOKIES_JWT_NAME } from "~/models/General"

export default function userUtils() {
  const cookieStore = cookies()
  const jwt = cookieStore.get(COOKIES_JWT_NAME)

  return {
    isLogin: !!jwt,
    jwt,
  }
}

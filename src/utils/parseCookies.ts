import { serialize, parse } from "cookies"
import { NextApiResponse } from "next"

interface CookieOptions {
  maxAge?: number
  expires?: Date | string
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: "strict" | "lax" | "none"
}

export function setCookie(
  res: NextApiResponse,
  name: string,
  value: string | object,
  options: CookieOptions = {}
) {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value)

  if ("maxAge" in options) {
    const maxAge = options.maxAge || 1000
    options.expires = new Date(Date.now() + maxAge)
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options))
}

export function parseCookies(req: any) {
  return parse(req.headers.cookie || "")
}

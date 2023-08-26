import { NextRequest, NextResponse } from "next/server"
import { COOKIES_JWT_NAME } from "~/models/General"

const pathList = ["/account", "/purchase"]

function handler(req: NextRequest) {
  const jwt = req.cookies.get(COOKIES_JWT_NAME)
  const pathname = req.nextUrl.pathname
  if (!jwt) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("referrer", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

const authenRouteMiddleware = {
  handler,
  pathList,
}

export default authenRouteMiddleware

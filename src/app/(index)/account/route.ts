import { NextResponse } from "next/server"

export function GET(req: Request) {
  const redirectUrl = new URL("/account/profile", req.url)
  return NextResponse.redirect(redirectUrl)
}

import { NextRequest, NextResponse } from "next/server"
import authenRouteMiddleware from "./middleware/authenRoute"

export type MiddlewareHandler = {
  handler: (req: NextRequest) => void | NextResponse
  pathList: string[]
}

const middlewareList: MiddlewareHandler[] = [authenRouteMiddleware]

export default function middleware(req: NextRequest) {
  let response = null
  middlewareList.forEach(({ handler, pathList }) => {
    pathList.forEach((path) => {
      if (req.nextUrl.pathname.startsWith(path)) {
        response = handler(req)
      }
    })
  })

  return response
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request:NextRequest) {

    let isAuth = request.cookies.get('token')
    const requestHeaders = new Headers(request.headers)

    if (!isAuth) { 
        if (request.nextUrl.pathname == "/home") return NextResponse.rewrite(new URL("/signup", request.url))
    } else {
        if (request.nextUrl.pathname == "/signin") return NextResponse.redirect(new URL("/home", request.url))
    }

    return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
}

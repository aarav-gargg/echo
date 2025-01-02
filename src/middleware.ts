import { NextResponse, NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {

    const token = await getToken({req : request})
    const url = request.nextUrl

    if(token && (
        url.pathname.startsWith('/signIn') ||
        url.pathname.startsWith('/signUp') ||
        url.pathname.startsWith('/verify') ||
        url.pathname.startsWith('/') 
    )){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: ['/signIn', '/signUp', '/', '/dasboard/:path*'],
}
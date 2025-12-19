import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const PUBLIC_ROUTES = ['/login', '/api/auth/login']

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  const authToken = request.cookies.get('auth_token')

  if (!authToken || authToken.value !== 'authenticated') {
    // Redirect unauthenticated users to login page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

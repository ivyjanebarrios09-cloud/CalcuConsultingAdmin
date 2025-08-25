import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('firebase-session')?.value

  if (!session) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()
  }

  // TODO: Verify session cookie with Firebase Admin SDK
  // For now, we'll just check if it exists

  if (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

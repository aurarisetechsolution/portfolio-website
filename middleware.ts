import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the request is for admin routes
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    // Get the user agent and IP for basic security
    const userAgent = request.headers.get("user-agent") || ""
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // Log admin access attempts
    console.log(`Admin access attempt: ${path} from ${ip}`)

    // Add security headers for admin routes
    const response = NextResponse.next()
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

    return response
  }

  // For secure admin portal, add extra security
  if (path.startsWith("/secure-admin-portal")) {
    const response = NextResponse.next()
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    response.headers.set("Referrer-Policy", "no-referrer")

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

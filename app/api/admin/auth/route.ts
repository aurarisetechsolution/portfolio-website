import { type NextRequest, NextResponse } from "next/server"

// Allowed IP addresses for admin access (in production, use environment variables)
const ALLOWED_IPS = [
  "127.0.0.1",
  "::1",
  "localhost",
  // Add your production IPs here
]

// Admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
  admin: "aurarise2024@secure",
  manager: "aurarise2024@manager",
}

// Failed login attempts tracking
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>()

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return "127.0.0.1"
}

function isIPAllowed(ip: string): boolean {
  // For development, allow all IPs
  if (process.env.NODE_ENV === "development") {
    return true
  }
  return ALLOWED_IPS.includes(ip)
}

function isIPBlocked(ip: string): boolean {
  const attempts = failedAttempts.get(ip)
  if (!attempts) return false

  const now = Date.now()
  const blockDuration = 15 * 60 * 1000 // 15 minutes

  if (attempts.count >= 5 && now - attempts.lastAttempt < blockDuration) {
    return true
  }

  // Reset if block duration has passed
  if (now - attempts.lastAttempt >= blockDuration) {
    failedAttempts.delete(ip)
    return false
  }

  return false
}

function recordFailedAttempt(ip: string) {
  const attempts = failedAttempts.get(ip) || { count: 0, lastAttempt: 0 }
  attempts.count += 1
  attempts.lastAttempt = Date.now()
  failedAttempts.set(ip, attempts)
}

export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request)

  return NextResponse.json({
    ip: clientIP,
    allowed: isIPAllowed(clientIP),
    blocked: isIPBlocked(clientIP),
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const { username, password } = await request.json()

    // Check IP allowlist
    if (!isIPAllowed(clientIP)) {
      return NextResponse.json({ error: "IP not authorized", ip: clientIP }, { status: 403 })
    }

    // Check if IP is blocked
    if (isIPBlocked(clientIP)) {
      return NextResponse.json({ error: "IP temporarily blocked due to failed attempts" }, { status: 429 })
    }

    // Validate credentials
    if (!username || !password) {
      recordFailedAttempt(clientIP)
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    const validPassword = ADMIN_CREDENTIALS[username as keyof typeof ADMIN_CREDENTIALS]
    if (!validPassword || validPassword !== password) {
      recordFailedAttempt(clientIP)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Clear failed attempts on successful login
    failedAttempts.delete(clientIP)

    // Generate session token (in production, use proper JWT)
    const sessionToken = Buffer.from(`${username}:${Date.now()}:${clientIP}`).toString("base64")

    return NextResponse.json({
      success: true,
      user: {
        username,
        role: username === "admin" ? "Administrator" : "Manager",
        lastLogin: new Date().toISOString(),
        ip: clientIP,
      },
      token: sessionToken,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

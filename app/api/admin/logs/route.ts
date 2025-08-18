import { type NextRequest, NextResponse } from "next/server"

// In-memory log storage (in production, use a proper database)
let activityLogs: Array<{
  id: string
  timestamp: string
  action: string
  user: string
  details: string
  ip: string
  userAgent: string
}> = []

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  const logs = activityLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(offset, offset + limit)

  return NextResponse.json({
    logs,
    total: activityLogs.length,
    limit,
    offset,
  })
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get("user-agent") || "Unknown"
    const { action, user, details } = await request.json()

    const logEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      action,
      user: user || "Anonymous",
      details: details || "",
      ip: clientIP,
      userAgent,
    }

    activityLogs.push(logEntry)

    // Keep only last 1000 logs to prevent memory issues
    if (activityLogs.length > 1000) {
      activityLogs = activityLogs.slice(-1000)
    }

    console.log(`Activity logged: ${action} by ${user} from ${clientIP}`)

    return NextResponse.json({
      success: true,
      logId: logEntry.id,
      timestamp: logEntry.timestamp,
    })
  } catch (error) {
    console.error("Logging error:", error)
    return NextResponse.json({ error: "Failed to log activity" }, { status: 500 })
  }
}

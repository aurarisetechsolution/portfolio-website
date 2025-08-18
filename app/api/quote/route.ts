import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, projectDetails, budget, timeline } = body

    // Validate required fields
    if (!name || !email || !service) {
      return NextResponse.json({ error: "Name, email, and service are required" }, { status: 400 })
    }

    // Log the quote request
    console.log("Quote request:", {
      name,
      email,
      phone,
      service,
      projectDetails,
      budget,
      timeline,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification to sales team
    // 3. Send auto-reply with quote reference
    // 4. Calculate preliminary pricing

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate quote reference
    const quoteRef = `KTS-Q-${Date.now()}`

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully! Our team will contact you within 2 business hours.",
      data: {
        quoteReference: quoteRef,
        submittedAt: new Date().toISOString(),
        estimatedResponse: "2 business hours",
      },
    })
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Failed to submit quote request. Please try again." }, { status: 500 })
  }
}

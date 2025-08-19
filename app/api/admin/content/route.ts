import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In production, this would be a database
let contentData = {
  hero: {
    title: "aurarise Tech Solutions",
    subtitle: "Your Technology Guiding Star",
    ctaText: "Explore Our Universe",
    secondaryCtaText: "Free Constellation Reading",
  },
  about: {
    title: "About aurarise Tech Solutions",
    description:
      "Named after the Amharic word for 'star,' aurarise Tech Solutions serves as your guiding light in the vast universe of technology, illuminating the path to digital transformation.",
    mission:
      "To empower Ethiopian businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation, while providing exceptional service and support throughout their digital transformation journey.",
    vision:
      "To be the leading technology solutions provider in Ethiopia, recognized for our innovation, reliability, and commitment to helping businesses shine brightly in the digital landscape.",
  },
  services: [
    {
      id: 1,
      title: "ERP System Implementation",
      description:
        "Comprehensive Enterprise Resource Planning solutions tailored to streamline your business operations and improve efficiency.",
      features: ["Custom ERP Development", "System Integration", "Data Migration", "Training & Support"],
      icon: "Settings",
      color: "from-orange-400 to-red-400",
    },
    {
      id: 2,
      title: "Management Systems",
      description:
        "Custom CRM, HRMS, and other management systems designed to optimize your business processes and data management.",
      features: ["CRM Solutions", "HRMS Development", "Inventory Management", "Reporting Systems"],
      icon: "Database",
      color: "from-blue-400 to-cyan-400",
    },
  ],
  contact: {
          phone: "+251 919 312 589",
            email: "info@aurarisetechsolutions.com",
        supportEmail: "support@aurarisetechsolutions.com",
    address: "Megenagna Shola Traffic Light, Lelmi Merkato Building Office 141, 3rd Floor",
  },
  stats: {
    projects: 30,
    clients: 20,
    years: 5,
    satisfaction: 98,
  },
  lastUpdated: new Date().toISOString(),
  updatedBy: "System",
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: contentData,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch content",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, data, user } = body

    if (!section || !data) {
      return NextResponse.json(
        {
          success: false,
          error: "Section and data are required",
        },
        { status: 400 },
      )
    }

    // Update the content
    if (contentData[section as keyof typeof contentData]) {
      contentData = {
        ...contentData,
        [section]: {
          ...contentData[section as keyof typeof contentData],
          ...data,
        },
        lastUpdated: new Date().toISOString(),
        updatedBy: user?.username || "Unknown",
      }
    }

    return NextResponse.json({
      success: true,
      data: contentData,
      message: `${section} updated successfully`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update content",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, id, data, user } = body

    if (!section || !data) {
      return NextResponse.json(
        {
          success: false,
          error: "Section and data are required",
        },
        { status: 400 },
      )
    }

    // Update specific item in array (like services, testimonials)
    if (Array.isArray(contentData[section as keyof typeof contentData])) {
      const items = contentData[section as keyof typeof contentData] as any[]
      const itemIndex = items.findIndex((item) => item.id === id)

      if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...data }
        contentData = {
          ...contentData,
          lastUpdated: new Date().toISOString(),
          updatedBy: user?.username || "Unknown",
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: contentData,
      message: `${section} item updated successfully`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update content item",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, id, user } = body

    if (!section || !id) {
      return NextResponse.json(
        {
          success: false,
          error: "Section and ID are required",
        },
        { status: 400 },
      )
    }

    // Delete specific item from array
    if (Array.isArray(contentData[section as keyof typeof contentData])) {
      const items = contentData[section as keyof typeof contentData] as any[]
      const filteredItems = items.filter((item) => item.id !== id)

      contentData = {
        ...contentData,
        [section]: filteredItems,
        lastUpdated: new Date().toISOString(),
        updatedBy: user?.username || "Unknown",
      }
    }

    return NextResponse.json({
      success: true,
      data: contentData,
      message: `${section} item deleted successfully`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete content item",
      },
      { status: 500 },
    )
  }
}

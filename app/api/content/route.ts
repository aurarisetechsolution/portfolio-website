import { type NextRequest, NextResponse } from "next/server"

// In-memory content store (replace with database in production)
const contentStore = {
  stats: [
    {
      label: "Projects Completed",
      value: "30",
    },
    {
      label: "Happy Clients",
      value: "20",
    },
    {
      label: "Years Experience",
      value: "5+",
    },
    {
      label: "Client Satisfaction",
      value: "98%",
    },
  ],
  services: [
    {
      id: 1,
      title: "ERP System Implementation",
      description:
        "Comprehensive Enterprise Resource Planning solutions tailored to streamline your business operations and improve efficiency.",
      features: ["Custom ERP Development", "System Integration", "Data Migration", "Training & Support"],
      icon: "Settings",
      color: "from-orange-400 to-red-400",
      animationType: "erp-system",
    },
    {
      id: 2,
      title: "Management Systems",
      description:
        "Custom CRM, HRMS, and other management systems designed to optimize your business processes and data management.",
      features: ["CRM Solutions", "HRMS Development", "Inventory Management", "Reporting Systems"],
      icon: "Database",
      color: "from-blue-400 to-cyan-400",
      animationType: "management",
    },
    {
      id: 3,
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications that deliver exceptional user experiences and drive business growth.",
      features: ["Custom Websites", "E-commerce Platforms", "Web Portals", "Progressive Web Apps"],
      icon: "Globe",
      color: "from-green-400 to-emerald-400",
      animationType: "web-development",
    },
    {
      id: 4,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android that engage users and expand your reach.",
      features: ["iOS Development", "Android Development", "Cross-platform Apps", "App Store Optimization"],
      icon: "Smartphone",
      color: "from-purple-400 to-pink-400",
      animationType: "mobile-app",
    },
    {
      id: 5,
      title: "IT Support & Maintenance",
      description:
        "Comprehensive IT support services to keep your systems running smoothly and your business operations uninterrupted.",
      features: ["24/7 Support", "System Maintenance", "Network Management", "Security Updates"],
      icon: "Headphones",
      color: "from-indigo-400 to-blue-400",
      animationType: "support",
    },
    {
      id: 6,
      title: "CCTV & Surveillance",
      description:
        "Advanced security camera systems and surveillance solutions to protect your business premises and assets.",
      features: ["IP Camera Systems", "Remote Monitoring", "Video Analytics", "Access Control"],
      icon: "Camera",
      color: "from-red-400 to-pink-400",
      animationType: "cctv-camera",
    },
    {
      id: 7,
      title: "Attendance Systems",
      description:
        "Modern time and attendance tracking solutions including biometric systems and mobile-based check-ins.",
      features: ["Biometric Systems", "Mobile Attendance", "Payroll Integration", "Reporting Dashboard"],
      icon: "Clock",
      color: "from-yellow-400 to-orange-400",
      animationType: "attendance",
    },
    {
      id: 8,
      title: "Tech Consulting",
      description:
        "Strategic technology consulting services including cloud solutions, cybersecurity, and digital transformation.",
      features: ["Cloud Migration", "Cybersecurity Audit", "Digital Strategy", "Technology Roadmap"],
      icon: "Shield",
      color: "from-teal-400 to-green-400",
      animationType: "consulting",
    },
  ],
  leadership: [
    {
      id: 1,
      name: "Amanuel Getachew",
      position: "Chief Executive Officer & AI Trainee Software Developer",
      department: "Executive Leadership",
      bio: "Leading aurarise Tech Solutions with a vision to transform the Ethiopian technology landscape and guide businesses toward digital excellence. As both CEO and AI Trainee Software Developer, combining strategic leadership with hands-on technical expertise in emerging technologies.",
      expertise: [
        "Strategic Planning",
        "Business Development",
        "Technology Vision",
        "Team Leadership",
        "AI Development",
        "Software Development",
      ],
      experience: "5+ years",
              email: "amanuel@aurarisetechsolutions.com",
              phone: "+251919312589",
    },
    {
      id: 2,
      name: "Admasu Edlu",
      position: "Chief Technology Officer",
      department: "Technology Leadership",
      bio: "Driving technical innovation and overseeing all technology initiatives at aurarise Tech Solutions. Expert in software development and emerging technologies with a passion for creating scalable solutions that meet modern business needs.",
      expertise: ["Software Development", "Technical Strategy", "Project Management", "Team Coordination"],
      experience: "5+ years",
              email: "admasu@aurarisetechsolutions.com",
      phone: "+251996168990",
    },
    {
      id: 3,
      name: "Abrham Kebede",
      position: "Business Advisor",
      department: "Strategic Advisory",
      bio: "Providing strategic business guidance and market insights to drive growth and expansion in the Ethiopian market.",
      expertise: ["Business Strategy", "Market Analysis", "Growth Planning", "Partnership Development"],
      experience: "12+ years",
              email: "abrham@aurarisetechsolutions.com",
      phone: "+251939447263",
    },
  ],
  about: {
    title: "About aurarise Tech Solutions",
    description:
      'Named after the Amharic word for "star," aurarise Tech Solutions serves as your guiding light in the vast universe of technology, illuminating the path to digital transformation.',
    mission:
      "To empower Ethiopian businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation, while providing exceptional service and support throughout their digital transformation journey.",
    vision:
      "To be the leading technology solutions provider in Ethiopia, recognized for our innovation, reliability, and commitment to helping businesses shine brightly in the digital landscape.",
  },
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: contentStore,
    })
  } catch (error) {
    console.error("Error fetching content:", error)
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
    const { type, data } = body

    switch (type) {
      case "stats":
        contentStore.stats = data
        break
      case "services":
        contentStore.services = data
        break
      case "leadership":
        contentStore.leadership = data
        break
      case "about":
        contentStore.about = data
        break
      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid content type",
          },
          { status: 400 },
        )
    }

    return NextResponse.json({
      success: true,
      message: `${type} updated successfully`,
      data: contentStore,
    })
  } catch (error) {
    console.error("Error updating content:", error)
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
    const { type, id, data } = body

    switch (type) {
      case "service":
        const serviceIndex = contentStore.services.findIndex((s) => s.id === id)
        if (serviceIndex !== -1) {
          contentStore.services[serviceIndex] = { ...contentStore.services[serviceIndex], ...data }
        }
        break
      case "leader":
        const leaderIndex = contentStore.leadership.findIndex((l) => l.id === id)
        if (leaderIndex !== -1) {
          contentStore.leadership[leaderIndex] = { ...contentStore.leadership[leaderIndex], ...data }
        }
        break
      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid content type for update",
          },
          { status: 400 },
        )
    }

    return NextResponse.json({
      success: true,
      message: `${type} updated successfully`,
      data: contentStore,
    })
  } catch (error) {
    console.error("Error updating content item:", error)
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
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const id = searchParams.get("id")

    if (!type || !id) {
      return NextResponse.json(
        {
          success: false,
          error: "Type and ID are required",
        },
        { status: 400 },
      )
    }

    switch (type) {
      case "service":
        contentStore.services = contentStore.services.filter((s) => s.id !== Number.parseInt(id))
        break
      case "leader":
        contentStore.leadership = contentStore.leadership.filter((l) => l.id !== Number.parseInt(id))
        break
      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid content type for deletion",
          },
          { status: 400 },
        )
    }

    return NextResponse.json({
      success: true,
      message: `${type} deleted successfully`,
      data: contentStore,
    })
  } catch (error) {
    console.error("Error deleting content item:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete content item",
      },
      { status: 500 },
    )
  }
}

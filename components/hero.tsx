"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Sparkles, Zap, Code, Camera, Smartphone, Settings, Phone, Mail, Play, Shield, Cloud, Database } from "lucide-react"
import { useContent } from "@/hooks/use-content"
import LottieAnimation from "./lottie-animation"
// ...existing code...

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Get content from backend
  const { content, loading } = useContent()
  const hero = content?.about

  // Detect device type
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      if (width < 768) setDeviceType("mobile")
      else if (width < 1024) setDeviceType("tablet")
      else setDeviceType("desktop")
    }

    detectDevice()
    window.addEventListener("resize", detectDevice)
    return () => window.removeEventListener("resize", detectDevice)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Enhanced mouse tracking with interaction zones
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Check if mouse is near interactive elements
      const rect = document.getElementById("home")?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
        setIsInteracting(distance < 300)
      }
    }

    if (deviceType !== "mobile") {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [deviceType])

  // Cycle through different work animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Interactive button handlers
  const handleExploreClick = useCallback(() => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [])

  const handleConsultationClick = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [])

  const handleServiceClick = useCallback((serviceIndex: number) => {
    setCurrentAnimation(serviceIndex)
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }
  }, [])

  const handleCallClick = useCallback(() => {
    window.location.href = "tel:+251919312589"
  }, [])

  const handleEmailClick = useCallback(() => {
    window.location.href = "mailto:info@aurarisetechsolutions.com"
  }, [])

  const workAnimations = [
    {
      id: "web",
      title: "Web Development",
      description: "Enterprise web applications",
      icon: Code,
      color: "from-primary-400 to-accent-400",
      position: "left-4 lg:left-16 top-16 lg:top-20",
      animationType: "web-development" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "cctv",
      title: "CCTV Installation",
      description: "Security solutions",
      icon: Camera,
      color: "from-success-400 to-emerald-400",
      position: "right-4 lg:right-16 top-24 lg:top-32",
      animationType: "cctv-camera" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "iOS & Android apps",
      icon: Smartphone,
      color: "from-secondary-400 to-warning-400",
      position: "left-4 lg:left-20 bottom-24 lg:bottom-32",
      animationType: "mobile-app" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "erp",
      title: "ERP Systems",
      description: "Business solutions",
      icon: Settings,
      color: "from-warning-400 to-error-400",
      position: "right-4 lg:right-20 bottom-16 lg:bottom-20",
      animationType: "erp-system" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
  ]

  // Professional tech icons for floating elements
  const techIcons = [
    { icon: Cloud, position: "left-10 top-20", delay: "0s" },
    { icon: Database, position: "right-10 top-32", delay: "1s" },
    { icon: Shield, position: "left-16 bottom-32", delay: "2s" },
    { icon: Code, position: "right-16 bottom-20", delay: "3s" },
  ]

  if (loading || !hero) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl font-display">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900"
    >
      {/* Enhanced Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Tech Icons */}
        {techIcons.map((tech, index) => (
          <div
            key={index}
            className={`absolute ${tech.position} animate-float opacity-20`}
            style={{ animationDelay: tech.delay }}
          >
            <tech.icon className="h-8 w-8 text-white/30" />
          </div>
        ))}

        {/* Interactive Service Cards */}
        {workAnimations.map((service, index) => (
          <div
            key={service.id}
            className={`absolute ${service.position} cursor-pointer group transition-all duration-500 hover:scale-110 ${
              currentAnimation === index ? "scale-110 opacity-100" : "scale-100 opacity-60"
            }`}
            onClick={() => handleServiceClick(index)}
          >
            <div className={`bg-gradient-to-br ${service.color} p-4 rounded-2xl shadow-large backdrop-blur-sm border border-white/20`}>
              <div className="text-center">
                <service.icon className="h-8 w-8 text-white mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-xs text-white/80">{service.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path
            d="M 150 200 L 300 150 L 500 300 L 700 100 L 900 250"
            stroke="url(#constellation)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse-slow"
            style={{
              strokeDasharray: "5,5",
              animation: `${isInteracting ? "dash 2s linear infinite" : "pulse 3s ease-in-out infinite"}`,
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Enhanced Main Heading */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-8 flex-wrap">
              <div className="relative mr-4 sm:mr-6">
                <img src="/logo_1.jpg" alt="Logo" width={120} height={120} />
                <div className="absolute inset-0 bg-secondary-400/30 rounded-full blur-2xl animate-pulse-slow"></div>
              </div>
              
              <div className="text-center">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4 tracking-tight">
                  aurarise Tech Solutions
                </h1>
                <div className="relative">
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-300 to-primary-300 animate-pulse-slow">
                    Tech Powerhouse
                  </span>
                  <p className="text-lg sm:text-xl lg:text-2xl text-accent-200 mt-3 font-medium tracking-wide">
                    አራሪዝ • Enterprise Technology Solutions
                  </p>
                </div>
              </div>

              {deviceType !== "mobile" && (
                <div className="relative ml-4 sm:ml-6">
                  <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-accent-300 animate-bounce-gentle" />
                  <div className="absolute inset-0 bg-accent-300/20 rounded-full blur-xl animate-pulse-slow"></div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Subtitle */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed max-w-5xl mx-auto font-medium">
              aurarise Tech Solutions - Your trusted partner for enterprise-grade technology solutions. We deliver powerful, 
              scalable, and innovative IT solutions that drive business transformation across Ethiopia and beyond.
            </p>
          </div>

          {/* Enhanced Interactive CTA Buttons */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8">
              <Button
                size="lg"
                onClick={handleExploreClick}
                className="bg-gradient-to-r from-secondary-500 to-warning-500 hover:from-secondary-400 hover:to-warning-400 text-neutral-900 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-display font-bold transition-all duration-300 hover:scale-105 shadow-large group w-full sm:w-auto"
              >
                <Zap className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Explore Solutions
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleConsultationClick}
                className="border-2 border-accent-300 text-accent-100 hover:bg-accent-300 hover:text-accent-900 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-display font-bold transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm w-full sm:w-auto"
              >
                <Play className="mr-3 h-6 w-6" />
                Strategic Consultation
              </Button>
            </div>
          </div>

          {/* Enhanced Contact Quick Actions */}
          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleCallClick}
                className="flex items-center space-x-2 text-accent-200 hover:text-white transition-colors group"
              >
                <div className="bg-accent-500/20 p-2 rounded-full group-hover:bg-accent-500/40 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-medium">+251 919 312 589</span>
              </button>
              
              <button
                onClick={handleEmailClick}
                className="flex items-center space-x-2 text-accent-200 hover:text-white transition-colors group"
              >
                <div className="bg-accent-500/20 p-2 rounded-full group-hover:bg-accent-500/40 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-medium">info@aurarisetechsolutions.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

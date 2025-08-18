"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Sparkles, Zap, Code, Camera, Smartphone, Settings, Phone, Mail } from "lucide-react"
import { useContent } from "@/hooks/use-content"
import LottieAnimation from "./lottie-animation"
import StarLogo from "./ui/StarLogo" 

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
      description: "Creating amazing websites",
      icon: Code,
      color: "from-blue-400 to-cyan-400",
      position: "left-4 lg:left-16 top-16 lg:top-20",
      animationType: "web-development" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "cctv",
      title: "CCTV Installation",
      description: "Security solutions",
      icon: Camera,
      color: "from-green-400 to-emerald-400",
      position: "right-4 lg:right-16 top-24 lg:top-32",
      animationType: "cctv-camera" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "iOS & Android apps",
      icon: Smartphone,
      color: "from-purple-400 to-pink-400",
      position: "left-4 lg:left-20 bottom-24 lg:bottom-32",
      animationType: "mobile-app" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "erp",
      title: "ERP Systems",
      description: "Business solutions",
      icon: Settings,
      color: "from-orange-400 to-red-400",
      position: "right-4 lg:right-20 bottom-16 lg:bottom-20",
      animationType: "erp-system" as const,
      action: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
    },
  ]

  // Optimized star configuration based on device
  const getStarConfig = () => {
    switch (deviceType) {
      case "mobile":
        return { large: 8, medium: 12, small: 20, maxSize: 10, minSize: 3 }
      case "tablet":
        return { large: 15, medium: 25, small: 40, maxSize: 14, minSize: 5 }
      default:
        return { large: 25, medium: 40, small: 80, maxSize: 18, minSize: 6 }
    }
  }

  const starConfig = getStarConfig()

  if (loading || !hero) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
    >
      {/* Enhanced Dynamic Star Field Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large interactive stars */}
        {[...Array(starConfig.large)].map((_, i) => (
          <div
            key={`large-${i}`}
            className={`absolute animate-pulse cursor-pointer transition-all duration-300 ${
              isInteracting ? "scale-125 opacity-80" : "scale-100 opacity-60"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
            onClick={() => handleServiceClick(i % 4)}
          >
            <Star
              className="text-white/40 hover:text-yellow-300/80 animate-spin transition-colors"
              style={{
                width: `${starConfig.minSize + Math.random() * (starConfig.maxSize - starConfig.minSize)}px`,
                height: `${starConfig.minSize + Math.random() * (starConfig.maxSize - starConfig.minSize)}px`,
                animationDuration: `${6 + Math.random() * 8}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            />
          </div>
        ))}

        {/* Medium twinkling stars */}
        {[...Array(starConfig.medium)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Sparkles
              className="text-blue-300/50 hover:text-blue-200/80 transition-colors"
              style={{
                width: `${3 + Math.random() * 6}px`,
                height: `${3 + Math.random() * 6}px`,
              }}
            />
          </div>
        ))}

        {/* Small distant stars */}
        {[...Array(starConfig.small)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          >
            <div
              className="bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }}
            />
          </div>
        ))}

        {/* Interactive cursor star trail - Desktop only */}
        {deviceType !== "mobile" && (
          <div
            className="absolute pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: mousePosition.x - 15,
              top: mousePosition.y - 15,
            }}
          >
            <Star
              className={`h-6 w-6 text-yellow-300 animate-spin transition-all ${
                isInteracting ? "scale-150 text-yellow-200" : "scale-100"
              }`}
            />
          </div>
        )}

      </div>

      {/* Enhanced Interactive Work Illustrations with Lottie */}
      <div className="absolute inset-0 pointer-events-none">
        {workAnimations.map((animation, index) => (
          <div
            key={animation.id}
            className={`absolute ${animation.position} transition-all duration-700 pointer-events-auto cursor-pointer ${
              currentAnimation === index
                ? "opacity-100 scale-110"
                : "opacity-70 scale-95 hover:opacity-90 hover:scale-105"
            }`}
            onClick={animation.action}
          >
            <div className="relative group">
              <div
                className={`w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 bg-gradient-to-br ${animation.color.replace("400", "500/20")} rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center animate-pulse hover:animate-bounce transition-all group-hover:shadow-2xl`}
              >
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24">
                  <LottieAnimation
                    animationType={animation.animationType}
                    className="w-full h-full"
                    autoplay={currentAnimation === index}
                    loop={true}
                  />
                </div>
                {/* Interactive elements */}
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded animate-ping group-hover:animate-bounce"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded animate-ping delay-300 group-hover:animate-spin"></div>
              </div>
              <div className="text-center mt-2 sm:mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs sm:text-sm font-semibold">{animation.title}</p>
                <p className="text-white/80 text-xs">{animation.description}</p>
                <Button
                  size="sm"
                  className="mt-2 bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-3 py-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    animation.action()
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Constellation Lines with Interactivity */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <path
          d="M 150 200 L 300 150 L 500 300 L 700 100 L 900 250"
          stroke="url(#constellation)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{
            strokeDasharray: "5,5",
            animation: `${isInteracting ? "dash 2s linear infinite" : "pulse 3s ease-in-out infinite"}`,
          }}
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced Main Heading */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-8 flex-wrap">
            <div className="relative mr-2 sm:mr-4">
              <StarLogo />
              {/* Optional: keep the glowing blur behind */}
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></div>
            </div>
              <div className="text-center">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-2">
                  aurarise Tech Solutions
                </h1>
                <div className="relative">
                  <span className="text-4xl sm:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-blue-300 to-purple-300 animate-pulse">
                    Guiding Star
                  </span>
                  <p className="text-lg sm:text-xl lg:text-2xl text-blue-200 mt-2 font-light">
                    አራሪዝ • Your Digital Constellation
                  </p>
                </div>
              </div>

                {deviceType !== "mobile" && (
                  <div className="relative">
                    <Sparkles
                      className="h-8 w-8 sm:h-12 sm:w-12 text-purple-300 ml-2 sm:ml-4 animate-spin"
                      style={{ animationDirection: "reverse" }}
                    />
                    <div className="absolute inset-0 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                )}

            </div>
          </div>

          {/* Enhanced Subtitle */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              aurarise Tech Solutions illuminates your path to technological excellence with comprehensive IT solutions
              tailored for Ethiopian businesses seeking digital transformation
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
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-110 shadow-2xl group w-full sm:w-auto"
              >
                <Zap className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
                Explore Our Universe
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleConsultationClick}
                className="border-2 border-blue-300 text-blue-100 hover:bg-blue-300 hover:text-blue-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-110 bg-transparent backdrop-blur-sm w-full sm:w-auto"
              >
                <Star className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Free Constellation Reading
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Button
                onClick={handleCallClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 flex items-center w-full sm:w-auto"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now: +251 919 312 589
              </Button>
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="border-purple-300 text-purple-100 hover:bg-purple-300 hover:text-purple-900 px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 flex items-center bg-transparent backdrop-blur-sm w-full sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
            </div>
          </div>

          {/* Enhanced Interactive Services Preview with Lottie */}
          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              {[
                {
                  name: "ERP Systems",
                  icon: "🌟",
                  color: "from-orange-400 to-red-400",
                  service: "erp",
                  animationType: "erp-system" as const,
                },
                {
                  name: "Web Development",
                  icon: "✨",
                  color: "from-blue-400 to-cyan-400",
                  service: "web",
                  animationType: "web-development" as const,
                },
                {
                  name: "Mobile Apps",
                  icon: "💫",
                  color: "from-purple-400 to-pink-400",
                  service: "mobile",
                  animationType: "mobile-app" as const,
                },
                {
                  name: "CCTV Solutions",
                  icon: "⭐",
                  color: "from-green-400 to-emerald-400",
                  service: "cctv",
                  animationType: "cctv-camera" as const,
                },
              ].map((service, index) => (
                <div key={service.name} className="group cursor-pointer" onClick={() => handleServiceClick(index)}>
                  <div
                    className={`bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-white/20 hover:border-yellow-300/50 ${
                      currentAnimation === index ? "ring-2 ring-yellow-300/50 bg-white/20 scale-105" : ""
                    }`}
                  >
                    <div className="text-2xl sm:text-4xl mb-2 sm:mb-3 group-hover:animate-bounce">{service.icon}</div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3">
                      <LottieAnimation
                        animationType={service.animationType}
                        className="w-full h-full"
                        autoplay={currentAnimation === index}
                        loop={true}
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-blue-100 group-hover:text-white transition-colors">
                      {service.name}
                    </p>
                    {currentAnimation === index && (
                      <div className="mt-2">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mx-auto animate-ping"></div>
                        <Button
                          size="sm"
                          className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-xs px-3 py-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          Explore
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Work Process Indicator */}
          <div
            className={`mt-8 sm:mt-12 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-blue-200 text-sm">Currently showcasing:</div>
              <div className="flex space-x-2">
                {workAnimations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleServiceClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      currentAnimation === index ? "bg-yellow-300 scale-125" : "bg-blue-300/50 hover:bg-blue-300/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

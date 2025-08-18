"use client"

import { useEffect, useState } from "react"
import { Settings, Globe, Smartphone, Shield, Camera, Clock, Database, Headphones } from "lucide-react"

interface LottieAnimationProps {
  animationType:
    | "web-development"
    | "cctv-camera"
    | "mobile-app"
    | "erp-system"
    | "management"
    | "support"
    | "attendance"
    | "consulting"
  className?: string
  autoplay?: boolean
  loop?: boolean
}

export default function LottieAnimation({
  animationType,
  className = "w-8 h-8",
  autoplay = true,
  loop = true,
}: LottieAnimationProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(autoplay)

  // Animation mapping with fallback icons
  const animationConfig = {
    "web-development": {
      icon: Globe,
      animation: "animate-spin",
      color: "text-blue-500",
      hoverColor: "group-hover:text-blue-400",
      bgColor: "bg-blue-500",
    },
    "cctv-camera": {
      icon: Camera,
      animation: "animate-pulse",
      color: "text-red-500",
      hoverColor: "group-hover:text-red-400",
      bgColor: "bg-red-500",
    },
    "mobile-app": {
      icon: Smartphone,
      animation: "animate-bounce",
      color: "text-purple-500",
      hoverColor: "group-hover:text-purple-400",
      bgColor: "bg-purple-500",
    },
    "erp-system": {
      icon: Settings,
      animation: "animate-spin",
      color: "text-orange-500",
      hoverColor: "group-hover:text-orange-400",
      bgColor: "bg-orange-500",
    },
    management: {
      icon: Database,
      animation: "animate-pulse",
      color: "text-cyan-500",
      hoverColor: "group-hover:text-cyan-400",
      bgColor: "bg-cyan-500",
    },
    support: {
      icon: Headphones,
      animation: "animate-pulse",
      color: "text-indigo-500",
      hoverColor: "group-hover:text-indigo-400",
      bgColor: "bg-indigo-500",
    },
    attendance: {
      icon: Clock,
      animation: "animate-spin",
      color: "text-yellow-500",
      hoverColor: "group-hover:text-yellow-400",
      bgColor: "bg-yellow-500",
    },
    consulting: {
      icon: Shield,
      animation: "animate-bounce",
      color: "text-teal-500",
      hoverColor: "group-hover:text-teal-400",
      bgColor: "bg-teal-500",
    },
  }

  const config = animationConfig[animationType]
  const IconComponent = config.icon

  useEffect(() => {
    if (autoplay) {
      setIsAnimating(true)
    }
  }, [autoplay])

  return (
    <div
      className={`relative ${className} flex items-center justify-center cursor-pointer group`}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsAnimating(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!autoplay) setIsAnimating(false)
      }}
    >
      {/* Main Icon */}
      <IconComponent
        className={`
          w-full h-full transition-all duration-300 
          ${config.color} 
          ${config.hoverColor}
          ${isAnimating ? config.animation : ""}
          ${isHovered ? "scale-110" : "scale-100"}
        `}
        style={{
          animationDuration:
            animationType === "erp-system"
              ? "2s"
              : animationType === "cctv-camera"
                ? "1.5s"
                : animationType === "mobile-app"
                  ? "1s"
                  : "2s",
        }}
      />

      {/* Glow effect */}
      <div
        className={`
          absolute inset-0 rounded-full blur-sm opacity-0 transition-opacity duration-300
          ${isHovered ? "opacity-30" : "opacity-0"}
          ${config.bgColor}
        `}
      />

      {/* Pulse ring for interactive feedback */}
      {isHovered && (
        <div
          className={`
            absolute inset-0 rounded-full animate-ping
            ${config.bgColor}
            opacity-20
          `}
        />
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Award, Star } from "lucide-react"
import { useContent } from "@/hooks/use-content"

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

  // Get content from backend
  const { content, loading, error } = useContent()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && content) {
      content.stats.forEach((stat) => {
        const numericValue = Number.parseInt(stat.value.replace(/[^\d]/g, ""))
        if (!isNaN(numericValue)) {
          animateValue(stat.label, numericValue)
        }
      })
    }
  }, [isVisible, content])

  const animateValue = (key: string, target: number) => {
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setAnimatedValues((prev) => ({ ...prev, [key]: Math.floor(current) }))
    }, 30)
  }

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "projects completed":
        return TrendingUp
      case "happy clients":
        return Users
      case "years experience":
        return Award
      case "client satisfaction":
        return Star
      default:
        return Star
    }
  }

  const formatValue = (stat: any) => {
    const animatedValue = animatedValues[stat.label]
    if (animatedValue !== undefined) {
      if (stat.value.includes("%")) {
        return `${animatedValue}%`
      } else if (stat.value.includes("+")) {
        return `${animatedValue}+`
      }
      return animatedValue.toString()
    }
    return stat.value
  }

  if (loading) {
    return (
      <section id="stats" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl text-white">Loading statistics...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section id="stats" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-white">Error loading statistics: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="stats" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Track Record</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => {
              const IconComponent = getIcon(stat.label)
              return (
                <Card
                  key={stat.label}
                  className={`bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-500 hover:scale-105 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2">{formatValue(stat)}</div>
                    <div className="text-blue-100 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Target, Users, Award, Phone, Mail, ArrowRight, TrendingUp, Shield, Zap, Globe } from "lucide-react"
import { useContent } from "@/hooks/use-content"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null)

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

    const element = document.getElementById("about")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleCallClick = () => {
    window.location.href = "tel:+251919312589"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@aurarisetechsolutions.com"
  }

  const handleServicesClick = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description:
        "We deliver enterprise-grade excellence in every project, ensuring top-quality solutions that exceed expectations.",
      action: handleServicesClick,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Cutting-edge technology solutions that keep your business ahead of the competition.",
      action: handleServicesClick,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      iconColor: "text-secondary-600",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build lasting strategic partnerships with our clients, understanding their unique needs and goals.",
      action: handleContactClick,
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50",
      iconColor: "text-accent-600",
    },
    {
      icon: Award,
      title: "Reliability",
      description: "Dependable enterprise solutions and support you can count on, delivered on time and within budget.",
      action: handleContactClick,
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-50",
      iconColor: "text-success-600",
    },
  ]

  const developerMetrics = [
    { label: "Team Size", value: "25+", icon: Users, color: "text-primary-600" },
    { label: "Avg Experience", value: "7+ years", icon: Award, color: "text-secondary-600" },
    { label: "Enterprise Grade", value: "A+", icon: Star, color: "text-accent-600" },
    { label: "Success Rate", value: "99.5%", icon: Target, color: "text-success-600" },
  ]

  const achievements = [
    {
      icon: TrendingUp,
      title: "Digital Transformation",
      description: "Successfully transformed 50+ businesses with modern technology solutions",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Shield,
      title: "Security Excellence",
      description: "Zero security breaches across all client implementations",
      color: "from-success-500 to-success-600",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Average 300% improvement in business process efficiency",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "ISO 27001 certified with international best practices",
      color: "from-accent-500 to-accent-600",
    },
  ]

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600 font-display">Loading about section...</p>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section id="about" className="py-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-error-600 font-display">Error loading about section: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-2xl">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 ml-4">
                {content.about.title}
              </h2>
            </div>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-medium">{content.about.description}</p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Story */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">Our Story</h3>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded with a vision to bridge the technology gap in Ethiopia, aurarise Tech Solutions has emerged as a
                  powerhouse for enterprise-grade technology solutions. Our name reflects our commitment to strength, 
                  resilience, and power in delivering robust technology solutions.
                </p>
                <p>
                  We specialize in delivering enterprise-grade, scalable, and reliable technology solutions that power
                  businesses to thrive in the digital age. From growing startups to large enterprises, we've helped
                  countless organizations transform their operations through strategic technology implementation.
                </p>
                <p>
                  Our team of experienced professionals combines deep technical expertise with a thorough understanding
                  of the Ethiopian business landscape, ensuring that every solution we deliver is perfectly tailored to
                  local needs and global enterprise standards.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button onClick={handleContactClick} className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-medium shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  className="border-success-600 text-success-600 hover:bg-success-600 hover:text-white bg-transparent rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Right Column - Mission & Vision */}
            <div
              className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="space-y-6">
                <Card
                  className="border-l-4 border-l-primary-600 shadow-soft hover:shadow-large transition-all duration-300 cursor-pointer group hover:scale-105"
                  onClick={handleContactClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-primary-100 p-2 rounded-lg mr-3">
                        <Target className="h-5 w-5 text-primary-600" />
                      </div>
                      <h4 className="text-xl font-display font-bold text-neutral-900">Our Mission</h4>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{content.about.mission}</p>
                  </CardContent>
                </Card>

                <Card
                  className="border-l-4 border-l-accent-600 shadow-soft hover:shadow-large transition-all duration-300 cursor-pointer group hover:scale-105"
                  onClick={handleContactClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-accent-100 p-2 rounded-lg mr-3">
                        <Star className="h-5 w-5 text-accent-600" />
                      </div>
                      <h4 className="text-xl font-display font-bold text-neutral-900">Our Vision</h4>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{content.about.vision}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div
            className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-display font-bold text-neutral-900 text-center mb-12">Our Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={achievement.title}
                  className="text-center hover:shadow-large transition-all duration-500 hover:scale-105 group cursor-pointer border-0 shadow-soft"
                >
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-br ${achievement.color} p-3 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-display font-bold text-neutral-900 mb-2">{achievement.title}</h4>
                    <p className="text-neutral-600 text-sm leading-relaxed">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Grid */}
          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-display font-bold text-neutral-900 text-center mb-12">Our Core Values</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="text-center hover:shadow-large transition-all duration-500 hover:scale-105 group cursor-pointer border-0 shadow-soft"
                  onClick={value.action}
                >
                  <CardContent className="p-6">
                    <div className={`${value.bgColor} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                    </div>
                    <h4 className="text-lg font-display font-bold text-neutral-900 mb-3">{value.title}</h4>
                    <p className="text-neutral-600 leading-relaxed text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Metrics */}
          <div
            className={`mt-16 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-8 shadow-soft">
              <h3 className="text-2xl font-display font-bold text-neutral-900 text-center mb-8">Why Choose aurarise Tech Solutions?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {developerMetrics.map((metric, index) => (
                  <div key={metric.label} className="text-center group">
                    <div className="bg-white p-4 rounded-2xl shadow-soft group-hover:shadow-medium transition-all duration-300 mb-3">
                      <metric.icon className={`h-8 w-8 ${metric.color} mx-auto`} />
                    </div>
                    <div className={`text-3xl font-display font-bold ${metric.color} mb-1`}>{metric.value}</div>
                    <div className="text-neutral-600 text-sm font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

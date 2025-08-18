"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Target, Users, Award, Phone, Mail, ArrowRight } from "lucide-react"
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
    window.location.href = "tel:+251919312559"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@kekebtech.com"
  }

  const handleServicesClick = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description:
        "We strive for excellence in every project, ensuring top-quality solutions that exceed expectations.",
      action: handleServicesClick,
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Cutting-edge technology solutions that keep your business ahead of the competition.",
      action: handleServicesClick,
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build lasting partnerships with our clients, understanding their unique needs and goals.",
      action: handleContactClick,
    },
    {
      icon: Award,
      title: "Reliability",
      description: "Dependable solutions and support you can count on, delivered on time and within budget.",
      action: handleContactClick,
    },
  ]

  const developerMetrics = [
    { label: "Team Size", value: "15+", icon: Users },
    { label: "Avg Experience", value: "5+ years", icon: Award },
    { label: "Code Quality", value: "A+", icon: Star },
    { label: "Delivery Rate", value: "99.2%", icon: Target },
  ]

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading about section...</p>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section id="about" className="py-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error loading about section: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{content.about.title}</h2>
              <Star className="h-8 w-8 text-blue-600 ml-3" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{content.about.description}</p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Story */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to bridge the technology gap in Ethiopia, aurarise Tech Solutions has emerged as a
                  trusted partner for businesses seeking comprehensive IT solutions. Our name reflects our commitment to
                  being the guiding star that leads organizations toward technological excellence.
                </p>
                <p>
                  We specialize in delivering innovative, scalable, and reliable technology solutions that empower
                  businesses to thrive in the digital age. From small startups to large enterprises, we've helped
                  countless organizations transform their operations through strategic technology implementation.
                </p>
                <p>
                  Our team of experienced professionals combines deep technical expertise with a thorough understanding
                  of the Ethiopian business landscape, ensuring that every solution we deliver is perfectly tailored to
                  local needs and global standards.
                </p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button onClick={handleContactClick} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
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
              <div className="space-y-8">
                <Card
                  className="border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={handleContactClick}
                >
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed">{content.about.mission}</p>
                  </CardContent>
                </Card>

                <Card
                  className="border-l-4 border-l-purple-600 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={handleContactClick}
                >
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h4>
                    <p className="text-gray-600 leading-relaxed">{content.about.vision}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="text-center hover:shadow-lg transition-all hover:scale-105 group cursor-pointer"
                  onClick={value.action}
                >
                  <CardContent className="p-6">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <value.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                    <Button
                      size="sm"
                      className="mt-3 bg-blue-600 hover:bg-blue-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leadership Section */}
          <div
            className={`mt-16 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {content.leadership.map((leader, index) => (
                <Card
                  key={leader.id}
                  className={`text-center hover:shadow-lg transition-all hover:scale-105 group cursor-pointer ${
                    selectedLeader === index ? "ring-2 ring-blue-500 scale-105" : ""
                  }`}
                  onClick={() => setSelectedLeader(selectedLeader === index ? null : index)}
                >
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                      <Star className="h-12 w-12 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                    <p className="text-blue-600 font-medium mb-1">{leader.position}</p>
                    <p className="text-sm text-purple-600 mb-4">{leader.department}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{leader.bio}</p>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {leader.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
                        {leader.experience} Experience
                      </span>
                    </div>

                    {selectedLeader === index && (
                      <div className="flex flex-col sm:flex-row gap-2 animate-fadeIn">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `tel:${leader.phone}`
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `mailto:${leader.email}`
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Developer Performance Section */}
          <div
            className={`mt-16 transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Developer Excellence</h3>
            <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-0">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {developerMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <metric.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Our Development Team Excellence</h4>
                  <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                    Our highly skilled development team brings together years of experience in cutting-edge
                    technologies. With an average of 5+ years of experience per developer, we maintain the highest
                    standards of code quality, ensuring 99.2% on-time delivery rate and 98% client satisfaction. Our
                    team is certified in 25+ modern technologies and follows industry best practices for scalable,
                    maintainable solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleServicesClick} className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Our Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleContactClick}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                    >
                      Start Your Project
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

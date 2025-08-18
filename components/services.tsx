"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, Star, CheckCircle, Zap, Shield, Cloud, Database, Smartphone, Settings, Code, Camera, Users, TrendingUp } from "lucide-react"
import LottieAnimation from "./lottie-animation"
import { useContent } from "@/hooks/use-content"

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)

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

    const element = document.getElementById("services")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleGetQuote = (serviceName: string) => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const serviceSelect = document.querySelector('select[name="service"]') as HTMLSelectElement
        if (serviceSelect) {
          const serviceMap: { [key: string]: string } = {
            "ERP System Implementation": "erp",
            "Management Systems": "management",
            "Web Development": "web",
            "Mobile App Development": "mobile",
            "IT Support & Maintenance": "support",
            "CCTV & Surveillance": "cctv",
            "Attendance Systems": "attendance",
            "Tech Consulting": "consulting",
          }
          serviceSelect.value = serviceMap[serviceName] || "other"
        }
      }, 1000)
    }
  }

  const handleCallNow = () => {
    window.location.href = "tel:+251919312589"
  }

  const handleEmailNow = () => {
    window.location.href = "mailto:info@aurarisetechsolutions.com"
  }

  // Professional service categories
  const serviceCategories = [
    {
      title: "Digital Transformation",
      description: "Strategic technology consulting and business process optimization",
      icon: TrendingUp,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      title: "Enterprise Software",
      description: "Custom ERP systems and business management platforms",
      icon: Settings,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      iconColor: "text-secondary-600",
    },
    {
      title: "Cloud Solutions",
      description: "Cloud migration, infrastructure, and DevOps implementation",
      icon: Cloud,
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50",
      iconColor: "text-accent-600",
    },
    {
      title: "Cybersecurity",
      description: "Security audits, threat detection, and compliance frameworks",
      icon: Shield,
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-50",
      iconColor: "text-success-600",
    },
  ]

  if (loading) {
    return (
      <section id="services" className="py-20 bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600 font-display">Loading services...</p>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section id="services" className="py-20 bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-error-600 font-display">Error loading services: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-neutral-50">
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
                Our Services
              </h2>
            </div>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Enterprise-grade technology solutions designed to power your business transformation and digital innovation
            </p>
          </div>

          {/* Service Categories */}
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {serviceCategories.map((category, index) => (
              <Card
                key={category.title}
                className="group hover:shadow-large transition-all duration-500 hover:scale-105 border-0 shadow-soft cursor-pointer"
                onClick={() => setSelectedService(selectedService === index ? null : index)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`${category.bgColor} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg font-display font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-neutral-600 text-sm leading-relaxed text-center">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.services.map((service, index) => (
              <Card
                key={service.id}
                className={`group hover:shadow-large transition-all duration-500 hover:scale-105 border-0 shadow-soft cursor-pointer ${
                  selectedService === index ? "ring-2 ring-primary-500 scale-105" : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300">
                    <LottieAnimation
                      animationType={service.animationType as any}
                      className="w-8 h-8"
                      autoplay={selectedService === index}
                      loop={true}
                    />
                  </div>
                  <CardTitle className="text-lg font-display font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-neutral-500 flex items-center">
                        <CheckCircle className="w-3 h-3 text-success-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGetQuote(service.title)
                      }}
                      className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all bg-primary-600 text-white rounded-xl font-medium"
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {selectedService === index && (
                      <div className="flex space-x-2 animate-fade-in">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCallNow()
                          }}
                          className="flex-1 bg-success-600 hover:bg-success-700 text-white rounded-lg font-medium"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEmailNow()
                          }}
                          variant="outline"
                          className="flex-1 rounded-lg font-medium"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-gradient-to-r from-primary-600 to-accent-600 border-0 text-white shadow-large">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-white/20 p-3 rounded-2xl mr-4">
                    <Zap className="h-8 w-8 text-secondary-300" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Ready to Power Your Business?</h3>
                </div>
                <p className="text-primary-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                  Let aurarise Tech Solutions power your business transformation with enterprise-grade technology solutions. 
                  Contact us today for a strategic consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-4 rounded-2xl font-display font-semibold shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Strategic Consultation
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleCallNow}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-2xl font-display font-semibold bg-transparent transition-all duration-300 hover:scale-105"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, Star, CheckCircle, Zap } from "lucide-react"
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
    window.location.href = "tel:+251919312559"
  }

  const handleEmailNow = () => {
    window.location.href = "mailto:info@kekebtech.com"
  }

  if (loading) {
    return (
      <section id="services" className="py-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading services...</p>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section id="services" className="py-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error loading services: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-blue-600 mr-3 animate-spin" style={{ animationDuration: "3s" }} />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Services</h2>
              <Star className="h-8 w-8 text-blue-600 ml-3 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to illuminate your path to digital success
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.services.map((service, index) => (
              <Card
                key={service.id}
                className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 shadow-lg cursor-pointer ${
                  selectedService === index ? "ring-2 ring-blue-500 scale-105" : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                    <LottieAnimation
                      animationType={service.animationType as any}
                      className="w-8 h-8"
                      autoplay={selectedService === index}
                      loop={true}
                    />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-gray-500 flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
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
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all bg-blue-600 text-white"
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {selectedService === index && (
                      <div className="flex space-x-2 animate-fadeIn">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCallNow()
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
                            handleEmailNow()
                          }}
                          variant="outline"
                          className="flex-1"
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
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-yellow-300 mr-3 animate-pulse" />
                  <h3 className="text-2xl font-bold">Ready to Transform Your Business?</h3>
                  <Star className="h-8 w-8 text-yellow-300 ml-3 animate-pulse" />
                </div>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Let aurarise Tech Solutions be your guiding star on the journey to technological excellence. Contact us
                  today for a free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Get Free Consultation
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleCallNow}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold bg-transparent"
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

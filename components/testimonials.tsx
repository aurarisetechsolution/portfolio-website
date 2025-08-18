"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, Phone } from "lucide-react"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("testimonials")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentTestimonial(index)
  }

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleCallClick = () => {
    window.location.href = "tel:+251919312559"
  }

  const testimonials = [
    {
      name: "Amanuel Getachew",
      position: "CEO, aurarise Tech Solutions",
      company: "Technology Solutions Provider",
      content:
        "At aurarise Tech Solutions, we are committed to being the guiding star for Ethiopian businesses in their digital transformation journey. Our comprehensive solutions are designed to illuminate the path to technological excellence.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Alemayehu Tadesse",
      position: "CEO, Tadesse Trading",
      company: "Manufacturing Company",
      content:
        "aurarise Tech Solutions' ERP system revolutionized our operations. Their team's expertise and dedication were instrumental in streamlining our processes and boosting efficiency by 40%.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Sara Mohammed",
      position: "Operations Manager",
      company: "Retail Chain",
      content:
        "The mobile app developed by aurarise Tech Solutions has transformed our customer engagement. We've seen a 60% increase in customer satisfaction and a 35% boost in sales through the app.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Daniel Bekele",
      position: "IT Director",
      company: "Financial Services",
      content:
        "aurarise Tech Solutions delivered an outstanding web platform that perfectly aligns with our security and functionality needs. Their professionalism and expertise are unmatched in Ethiopia.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Meron Assefa",
      position: "Founder",
      company: "Tech Startup",
      content:
        "From initial consultation to final implementation, aurarise Tech Solutions provided invaluable guidance and support. Their expertise has been crucial to our 200% growth this year.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from the businesses we've helped transform
            </p>
          </div>

          {/* Main Testimonial */}
          <div
            className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl relative overflow-hidden">
              <CardContent className="p-8 lg:p-12 text-center">
                {/* Navigation Buttons */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    size="sm"
                    className="rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Button
                    onClick={handleNext}
                    variant="outline"
                    size="sm"
                    className="rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-blue-600 font-medium">{testimonials[currentTestimonial].position}</p>
                    <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-2 mb-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Client Logos Grid */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
              Trusted by Leading Ethiopian Businesses
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center opacity-60">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg p-4 h-16 flex items-center justify-center hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleContactClick}
                >
                  <div className="text-gray-400 font-bold text-sm">CLIENT {i + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Let's discuss how we can help your business achieve similar results and become our next success story.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleContactClick}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                  >
                    Start Your Project
                  </Button>
                  <Button
                    onClick={handleCallClick}
                    size="lg"
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

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, Star, CheckCircle, AlertCircle, MessageSquare, Building, Users } from "lucide-react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("contact")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`
  }

  const handleQuickEmail = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in your enterprise technology solutions. Can we discuss?")
    window.open(`https://wa.me/251919312589?text=${message}`, "_blank")
  }

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Megenagna+Shola+Traffic+Light+High+Field+Hotel", "_blank")
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Megenagna Shola Traffic Light", "Lemlmi Merkato Building Office 141, 3rd Floor"],
      action: handleLocationClick,
      actionText: "View on Map",
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+251 919 312 589", "+251 996 168 990", "+251 939 447 263"],
      action: () => handleQuickCall("+251919312589"),
      actionText: "Call Primary",
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-50",
      iconColor: "text-success-600",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@aurarisetechsolutions.com", "support@aurarisetechsolutions.com"],
      action: () => handleQuickEmail("info@aurarisetechsolutions.com"),
      actionText: "Send Email",
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50",
      iconColor: "text-accent-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      action: null,
      actionText: null,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      iconColor: "text-secondary-600",
    },
  ]

  const serviceOptions = [
    { value: "digital-transformation", label: "Digital Transformation" },
    { value: "enterprise-software", label: "Enterprise Software" },
    { value: "cloud-solutions", label: "Cloud Solutions" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "erp-systems", label: "ERP Systems" },
    { value: "it-consulting", label: "IT Consulting" },
    { value: "other", label: "Other" },
  ]

  return (
    <section id="contact" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-2xl">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 ml-4">
                Get In Touch
              </h2>
            </div>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Ready to power your business transformation? Let's discuss how our enterprise-grade solutions can drive your success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div
              className={`lg:col-span-1 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={info.title}
                    className="hover:shadow-large transition-all duration-500 cursor-pointer hover:scale-105 border-0 shadow-soft group"
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`${info.bgColor} rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className={`h-6 w-6 ${info.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-neutral-900 mb-2">{info.title}</h3>
                          {info.title === "Phone Numbers" ? (
                            <div className="space-y-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCall("+251919312589")
                                }}
                                className="block text-neutral-600 text-sm hover:text-primary-600 transition-colors text-left font-medium"
                              >
                                +251 919 312 589 (Primary)
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCall("+251996168990")
                                }}
                                className="block text-neutral-600 text-sm hover:text-primary-600 transition-colors text-left font-medium"
                              >
                                +251 996 168 990
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCall("+251939447263")
                                }}
                                className="block text-neutral-600 text-sm hover:text-primary-600 transition-colors text-left font-medium"
                              >
                                +251 939 447 263
                              </button>
                            </div>
                          ) : info.title === "Email Address" ? (
                            <div className="space-y-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickEmail("info@aurarisetechsolutions.com")
                                }}
                                className="block text-neutral-600 text-sm hover:text-primary-600 transition-colors text-left font-medium"
                              >
                                info@aurarisetechsolutions.com
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickEmail("support@aurarisetechsolutions.com")
                                }}
                                className="block text-neutral-600 text-sm hover:text-primary-600 transition-colors text-left font-medium"
                              >
                                support@aurarisetechsolutions.com
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {info.details.map((detail, detailIndex) => (
                                <p key={detailIndex} className="text-neutral-600 text-sm font-medium">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          )}
                          {info.actionText && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                info.action?.()
                              }}
                              className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                            >
                              {info.actionText} →
                            </button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Quick Actions */}
                <Card className="border-0 shadow-soft bg-gradient-to-r from-primary-50 to-accent-50">
                  <CardContent className="p-6">
                    <h4 className="font-display font-bold text-neutral-900 mb-4 text-center">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button
                        onClick={handleWhatsApp}
                        className="w-full bg-success-600 hover:bg-success-700 text-white rounded-xl font-medium shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp Chat
                      </Button>
                      <Button
                        onClick={() => handleQuickCall("+251919312589")}
                        variant="outline"
                        className="w-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <Card className="border-0 shadow-large">
                <CardHeader className="text-center pb-6">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold text-neutral-900">
                    Start Your Project
                  </CardTitle>
                  <p className="text-neutral-600 font-medium">
                    Let's discuss how we can transform your business with technology
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                        Service Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500 p-3"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                        Project Details *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Tell us about your project requirements, timeline, and goals..."
                      />
                    </div>

                    {/* Submit Status */}
                    {submitStatus === "success" && (
                      <div className="flex items-center space-x-2 text-success-600 bg-success-50 p-4 rounded-xl">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="flex items-center space-x-2 text-error-600 bg-error-50 p-4 rounded-xl">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Error sending message. Please try again or contact us directly.</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 rounded-xl font-display font-semibold shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



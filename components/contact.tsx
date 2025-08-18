"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, Star, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    const message = encodeURIComponent("Hello! I'm interested in your services. Can we discuss?")
    window.open(`https://wa.me/251919312589?text=${message}`, "_blank")
  }

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Megenagna+Shola+Traffic+Light+High+Field+Hotel", "_blank")
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Megenagna Shola Traffic Light", "High Field Hotel, 3rd Floor"],
      action: handleLocationClick,
      actionText: "View on Map",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+251 919 312 589", "+251 996 168 990", "+251 939 447 263"],
      action: () => handleQuickCall("+251919312589"),
      actionText: "Call Primary",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@aurarisetechsolutions.com  ", "support@aurarisetechsolutions.com  "],
      action: () => handleQuickEmail("info@aurarisetechsolutions.com"),
      actionText: "Send Email",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      action: null,
      actionText: null,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get In Touch</h2>
              <Star className="h-8 w-8 text-blue-600 ml-3" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your digital transformation journey? Let's discuss how we can help your business shine.
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
                    className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 rounded-full p-3 hover:bg-blue-200 transition-colors">
                          <info.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                          {info.title === "Phone Numbers" ? (
                            <div className="space-y-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCall("+251919312589")
                                }}
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors text-left"
                              >
                                +251 919 312 589 (Primary)
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCall("+251996168990")
                                }}
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors text-left"
                              >
                                +251 996 168 990
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCall("+251939447263")
                                }}
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors text-left"
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
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors text-left"
                              >
                                info@aurarisetechsolutions.com  
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickEmail("support@aurarisetechsolutions.com  ")
                                }}
                                className="block text-gray-600 text-sm hover:text-blue-600 transition-colors text-left"
                              >
                                support@aurarisetechsolutions.com  
                              </button>
                            </div>
                          ) : (
                            info.details.map((detail, i) => (
                              <p key={i} className="text-gray-600 text-sm">
                                {detail}
                              </p>
                            ))
                          )}
                          {info.actionText && (
                            <Button
                              size="sm"
                              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                info.action?.()
                              }}
                            >
                              {info.actionText}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact Actions */}
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => handleQuickCall("+251919312589")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now: +251 919 312 589
                </Button>
                <Button onClick={handleWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white">
                  💬 WhatsApp Chat
                </Button>
                <Button onClick={() => handleQuickEmail("info@aurarisetechsolutions.com")} variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Send Us a Message</CardTitle>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent>
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800">Message sent successfully! We'll contact you soon.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-red-800">
                        Failed to send message. Please try again or call us directly.
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Enter your full name"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Enter your email address"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Enter your phone number"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service of Interest
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        >
                          <option value="">Select a service</option>
                          <option value="erp">ERP System Implementation</option>
                          <option value="management">Management Systems</option>
                          <option value="web">Web Development</option>
                          <option value="mobile">Mobile App Development</option>
                          <option value="support">IT Support & Maintenance</option>
                          <option value="cctv">CCTV & Surveillance</option>
                          <option value="attendance">Attendance Systems</option>
                          <option value="consulting">Tech Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full"
                        placeholder="Tell us about your project requirements..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                



                </CardContent>
                <div className="mt-6 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <iframe
                  src="https://www.google.com/maps?q=aurarise+Tech+Solution,+Kenenisa+Ave,+Addis+Ababa+8585&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Company Location"
                ></iframe>
              </div>

              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

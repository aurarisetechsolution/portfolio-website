"use client"

import { Star, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, ArrowUp, ArrowRight } from "lucide-react"
import StarLogo from "./ui/StarLogo"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-primary-900 to-accent-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <StarLogo width={60} height={60} />
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl group-hover:bg-primary-500/30 transition-all duration-300"></div>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">aurarise Tech Solutions</h3>
                <p className="text-accent-200 text-sm font-medium">Enterprise Tech Powerhouse</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed text-sm">
              Named after the Amharic word for 'rhino,' aurarise Tech Solutions represents strength, resilience, and power 
              in the technology world. We deliver robust, enterprise-grade solutions that drive your business forward.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent-600 hover:bg-accent-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-700 hover:bg-primary-800 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-600 hover:bg-secondary-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Our Services
              </button>
              <button
                onClick={() => scrollToSection("stats")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Testimonials
              </button>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-white">Our Services</h4>
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("services")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Digital Transformation
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Enterprise Software
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Cloud Solutions
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-neutral-300 hover:text-accent-400 transition-all duration-300 text-left font-medium hover:translate-x-1 flex items-center group"
              >
                <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Cybersecurity
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-600/20 p-2 rounded-lg">
                  <Phone className="h-4 w-4 text-primary-400" />
                </div>
                <div>
                  <p className="text-neutral-300 text-sm font-medium">+251 919 312 589</p>
                  <p className="text-neutral-400 text-xs">Primary Contact</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-accent-600/20 p-2 rounded-lg">
                  <Mail className="h-4 w-4 text-accent-400" />
                </div>
                <div>
                  <p className="text-neutral-300 text-sm font-medium">info@aurarisetechsolutions.com</p>
                  <p className="text-neutral-400 text-xs">General Inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-secondary-600/20 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-secondary-400" />
                </div>
                <div>
                  <p className="text-neutral-300 text-sm font-medium">Megenagna Shola Traffic Light</p>
                  <p className="text-neutral-400 text-xs">High Field Hotel, 3rd Floor</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-success-600/20 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-success-400" />
                </div>
                <div>
                  <p className="text-neutral-300 text-sm font-medium">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-neutral-400 text-xs">Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-neutral-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="text-neutral-400 text-sm">
                © {currentYear} aurarise Tech Solutions. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={scrollToTop}
                className="bg-primary-600 hover:bg-primary-700 p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-soft group"
              >
                <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



"use client"

import { Star, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import StarLogo from "./ui/StarLogo"
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
              <div className="relative">
                <StarLogo width={60} height={60} />

              </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">aurarise Tech Solutions</h3>
                <p className="text-blue-200 text-sm">Your Technology Guiding Star</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Named after the Amharic word for 'star,' aurarise Tech Solutions serves as your guiding light in the vast
              universe of technology, illuminating the path to digital transformation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Our Services
              </button>
              <button
                onClick={() => scrollToSection("stats")}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">ERP System Implementation</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Management Systems</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Web Development</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Mobile App Development</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">IT Support & Maintenance</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">CCTV & Surveillance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Megenagna Shola Traffic Light</p>
                  <p className="text-gray-300">High Field Hotel, 3rd Floor</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-gray-300">+251 919 312 589</p>
                  <p className="text-gray-400 text-sm">+251 996 168 990</p>
                  <p className="text-gray-400 text-sm">+251 939 447 263</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-gray-300">info@aurarisetechsolutions.com  </p>
                  <p className="text-gray-400 text-sm">Support@aurarisetechsolutions.com  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">© {currentYear} aurarise Tech Solutions. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">Illuminating your path to technological excellence</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Star
              className="text-white/10"
              style={{
                width: `${6 + Math.random() * 12}px`,
                height: `${6 + Math.random() * 12}px`,
              }}
            />
          </div>
        ))}
      </div>
    </footer>
  )
}

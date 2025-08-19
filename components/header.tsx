"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
// ...existing code...

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
      setActiveDropdown(null)
    }
  }

  const navigationItems = [
    { name: "Home", href: "hero" },
    { 
      name: "Services", 
      href: "services",
      dropdown: [
        { name: "Digital Transformation", href: "services" },
        { name: "Enterprise Software", href: "services" },
        { name: "Cloud Solutions", href: "services" },
        { name: "Cybersecurity", href: "services" },
      ]
    },
    { name: "About", href: "about" },
    { name: "Portfolio", href: "stats" },
    { name: "Testimonials", href: "testimonials" },
  ]

  return (
    <>
      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-soft border-b border-neutral-200/50" 
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-[60px] h-[60px] flex items-center justify-center">
                  <img src="/logo_1.jpg" alt="Logo" width={60} height={60} />
                </div>
                <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-xl group-hover:bg-primary-500/20 transition-all duration-300"></div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-neutral-900 tracking-tight">
                  aurarise Tech Solutions
                </h1>
                <p className="text-xs text-neutral-600 font-medium tracking-wide">
                  Enterprise Tech Powerhouse
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="flex items-center space-x-1 px-4 py-2 text-neutral-700 hover:text-primary-600 transition-all duration-300 font-medium rounded-lg hover:bg-primary-50 group"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="px-4 py-2 text-neutral-700 hover:text-primary-600 transition-all duration-300 font-medium rounded-lg hover:bg-primary-50"
                    >
                      {item.name}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-large border border-neutral-200/50 backdrop-blur-xl">
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => scrollToSection(dropdownItem.href)}
                            className="w-full text-left px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-neutral-200/50">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium rounded-lg"
                    >
                      {item.name}
                    </button>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => scrollToSection(dropdownItem.href)}
                            className="w-full text-left px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors text-sm rounded-lg"
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full mt-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-xl font-semibold"
                >
                  Get Started
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

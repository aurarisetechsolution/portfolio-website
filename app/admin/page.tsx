"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Edit, Eye, Plus, Trash2, Settings, Users, BarChart3, RefreshCw } from "lucide-react"
import { useContentStore } from "@/lib/content-store"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [activeSection, setActiveSection] = useState("dashboard")
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: string }>({})

  // Get content and actions from store
  const {
    hero,
    about,
    services,
    contact,
    testimonials,
    stats,
    updateHero,
    updateAbout,
    updateService,
    addService,
    deleteService,
    updateContact,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateStats,
  } = useContentStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication (in real app, use proper auth)
    if (loginData.username === "admin" && loginData.password === "aurarise2024") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials! Use: admin / aurarise2024")
    }
  }

  const showSaveStatus = (section: string, message: string) => {
    setSaveStatus((prev) => ({ ...prev, [section]: message }))
    setTimeout(() => {
      setSaveStatus((prev) => ({ ...prev, [section]: "" }))
    }, 3000)
  }

  const handleHeroUpdate = (field: keyof typeof hero, value: string) => {
    updateHero({ [field]: value })
    showSaveStatus("hero", "Hero content updated! Check the frontend.")
  }

  const handleAboutUpdate = (field: keyof typeof about, value: string | string[]) => {
    updateAbout({ [field]: value })
    showSaveStatus("about", "About content updated! Check the frontend.")
  }

  const handleContactUpdate = (field: keyof typeof contact, value: string | string[]) => {
    updateContact({ [field]: value })
    showSaveStatus("contact", "Contact info updated! Check the frontend.")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Floating Stars Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            >
              <Star
                className="text-white/30"
                style={{
                  width: `${8 + Math.random() * 16}px`,
                  height: `${8 + Math.random() * 16}px`,
                }}
              />
            </div>
          ))}
        </div>

        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white relative z-10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-12 w-12 text-blue-400 animate-spin mr-3" />
              <CardTitle className="text-2xl font-bold">aurarise Tech Solutions Admin</CardTitle>
              <Star className="h-12 w-12 text-purple-400 animate-spin ml-3" style={{ animationDirection: "reverse" }} />
            </div>
            <p className="text-blue-200">Content Management System</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Star className="h-4 w-4 mr-2" />
                Login to Dashboard
              </Button>
            </form>
            <p className="text-xs text-blue-200 mt-4 text-center">Demo: admin / aurarise2024</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 animate-pulse" />
            <h1 className="text-2xl font-bold">aurarise Tech Solutions Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>View Frontend</span>
            </a>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Hero Section</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Total Visitors", value: "15,420", icon: Eye, color: "blue" },
                { title: "Active Projects", value: stats.projects.toString(), icon: Settings, color: "green" },
                { title: "Happy Clients", value: stats.clients.toString(), icon: Users, color: "purple" },
                { title: "New Inquiries", value: "156", icon: Star, color: "orange" },
              ].map((stat, index) => (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-12 w-12 text-${stat.color}-600`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Live Content Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Current Hero Title:</h4>
                    <p className="text-blue-700">"{hero.title}"</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">Active Services:</h4>
                    <p className="text-green-700">{services.length} services configured</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Contact Phone:</h4>
                    <p className="text-purple-700">{contact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Section Editor */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Edit Hero Section</span>
                  </div>
                  {saveStatus.hero && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm">{saveStatus.hero}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Main Title</label>
                  <Input
                    value={hero.title}
                    onChange={(e) => handleHeroUpdate("title", e.target.value)}
                    className="w-full"
                    placeholder="Enter main hero title"
                  />
                  <p className="text-xs text-gray-500 mt-1">This appears as the main heading on your homepage</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Textarea
                    value={hero.subtitle}
                    onChange={(e) => handleHeroUpdate("subtitle", e.target.value)}
                    rows={4}
                    className="w-full"
                    placeholder="Enter hero subtitle/description"
                  />
                  <p className="text-xs text-gray-500 mt-1">Descriptive text that appears below the main title</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary CTA Button</label>
                    <Input
                      value={hero.ctaText}
                      onChange={(e) => handleHeroUpdate("ctaText", e.target.value)}
                      className="w-full"
                      placeholder="Primary button text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary CTA Button</label>
                    <Input
                      value={hero.secondaryCtaText}
                      onChange={(e) => handleHeroUpdate("secondaryCtaText", e.target.value)}
                      className="w-full"
                      placeholder="Secondary button text"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Live Preview:</h4>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">{hero.title}</h2>
                    <p className="text-gray-600">{hero.subtitle}</p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">{hero.ctaText}</div>
                      <div className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm">
                        {hero.secondaryCtaText}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section Editor */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Edit About Section</span>
                  {saveStatus.about && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm">{saveStatus.about}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={about.title}
                    onChange={(e) => handleAboutUpdate("title", e.target.value)}
                    placeholder="About section title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={about.description}
                    onChange={(e) => handleAboutUpdate("description", e.target.value)}
                    rows={3}
                    placeholder="Brief description about the company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mission Statement</label>
                  <Textarea
                    value={about.mission}
                    onChange={(e) => handleAboutUpdate("mission", e.target.value)}
                    rows={3}
                    placeholder="Company mission statement"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vision Statement</label>
                  <Textarea
                    value={about.vision}
                    onChange={(e) => handleAboutUpdate("vision", e.target.value)}
                    rows={3}
                    placeholder="Company vision statement"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Current About Content:</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Title:</strong> {about.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {about.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Editor */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Services ({services.length} total)</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>

            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span>{service.title}</span>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Features ({service.features.length}):</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Editor */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Edit Contact Information</span>
                  {saveStatus.contact && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm">{saveStatus.contact}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      value={contact.phone}
                      onChange={(e) => handleContactUpdate("phone", e.target.value)}
                      placeholder="Primary phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      value={contact.email}
                      onChange={(e) => handleContactUpdate("email", e.target.value)}
                      placeholder="Primary email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Support Email</label>
                  <Input
                    value={contact.supportEmail}
                    onChange={(e) => handleContactUpdate("supportEmail", e.target.value)}
                    placeholder="Support email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Physical Address</label>
                  <Textarea
                    value={contact.address}
                    onChange={(e) => handleContactUpdate("address", e.target.value)}
                    rows={3}
                    placeholder="Complete business address"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Current Contact Info:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Phone:</strong> {contact.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {contact.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {contact.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

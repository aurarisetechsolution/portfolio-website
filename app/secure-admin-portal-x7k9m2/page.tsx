"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Shield,
  Eye,
  Users,
  BarChart3,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  Lock,
  Server,
  Database,
  Wifi,
  WifiOff,
  Plus,
  Settings,
  Edit,
  Trash2,
} from "lucide-react"
import { useContent } from "@/hooks/use-content"

export default function SecureAdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [clientIP, setClientIP] = useState<string>("")
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")
  const [activeSection, setActiveSection] = useState("dashboard")
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: string }>({})
  const [activityLogs, setActivityLogs] = useState<any[]>([])

  // Get content from backend
  const { content, loading, updateContent, updateContentItem, deleteContentItem } = useContent()

  // Get client IP and check access
  useEffect(() => {
    const fetchIPAndStatus = async () => {
      try {
        const response = await fetch("/api/admin/auth")
        const data = await response.json()
        setClientIP(data.ip)

        if (data.allowed) {
          setConnectionStatus("connected")
        } else {
          setConnectionStatus("error")
        }
      } catch (error) {
        setConnectionStatus("error")
        console.error("Failed to fetch IP status:", error)
      }
    }

    fetchIPAndStatus()
  }, [])

  // Fetch activity logs
  useEffect(() => {
    if (isAuthenticated) {
      fetchActivityLogs()
      const interval = setInterval(fetchActivityLogs, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch("/api/admin/logs?limit=20")
      const data = await response.json()
      setActivityLogs(data.logs)
    } catch (error) {
      console.error("Failed to fetch logs:", error)
    }
  }

  const logActivity = async (action: string, details: string) => {
    try {
      await fetch("/api/admin/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          user: user?.username,
          details,
        }),
      })
    } catch (error) {
      console.error("Failed to log activity:", error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (connectionStatus !== "connected") {
      alert("Access denied: Your IP address is not authorized for admin access.")
      return
    }

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsAuthenticated(true)
        setUser(data.user)
        await logActivity("LOGIN", `Successful admin login from IP: ${clientIP}`)
        setLoginData({ username: "", password: "" })
      } else {
        await logActivity("LOGIN_FAILED", `Failed login attempt from IP: ${clientIP}`)
        alert(data.error || "Invalid credentials or access denied.")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed. Please try again.")
    }
  }

  const handleLogout = async () => {
    await logActivity("LOGOUT", `Admin logout from IP: ${clientIP}`)
    setIsAuthenticated(false)
    setUser(null)
  }

  const showSaveStatus = (section: string, message: string) => {
    setSaveStatus((prev) => ({ ...prev, [section]: message }))
    setTimeout(() => {
      setSaveStatus((prev) => ({ ...prev, [section]: "" }))
    }, 3000)
  }

  const handleContentUpdate = async (section: string, field: string, value: any) => {
    try {
      await updateContent(section, { [field]: value }, user)
      await logActivity("CONTENT_UPDATE", `Updated ${section}.${field}`)
      showSaveStatus(section, "✅ Content updated successfully!")
    } catch (error) {
      showSaveStatus(section, "❌ Failed to update content")
      console.error("Content update error:", error)
    }
  }

  const handleServiceUpdate = async (serviceId: number, field: string, value: any) => {
    try {
      await updateContentItem("services", serviceId, { [field]: value }, user)
      await logActivity("SERVICE_UPDATE", `Updated service ${serviceId}.${field}`)
      showSaveStatus("services", "✅ Service updated successfully!")
    } catch (error) {
      showSaveStatus("services", "❌ Failed to update service")
      console.error("Service update error:", error)
    }
  }

  const handleServiceDelete = async (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteContentItem("services", serviceId, user)
        await logActivity("SERVICE_DELETE", `Deleted service ${serviceId}`)
        showSaveStatus("services", "✅ Service deleted successfully!")
      } catch (error) {
        showSaveStatus("services", "❌ Failed to delete service")
        console.error("Service delete error:", error)
      }
    }
  }

  const handleLeaderUpdate = async (leaderId: number, field: string, value: any) => {
    try {
      await updateContentItem("leadership", leaderId, { [field]: value }, user)
      await logActivity("LEADERSHIP_UPDATE", `Updated leader ${leaderId}.${field}`)
      showSaveStatus("leadership", "✅ Leadership updated successfully!")
    } catch (error) {
      showSaveStatus("leadership", "❌ Failed to update leadership")
      console.error("Leadership update error:", error)
    }
  }

  const handleLeaderDelete = async (leaderId: number) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await deleteContentItem("leadership", leaderId, user)
        await logActivity("LEADERSHIP_DELETE", `Deleted leader ${leaderId}`)
        showSaveStatus("leadership", "✅ Team member deleted successfully!")
      } catch (error) {
        showSaveStatus("leadership", "❌ Failed to delete team member")
        console.error("Leadership delete error:", error)
      }
    }
  }

  // Security check component
  const SecurityStatus = () => (
    <Card className="mb-6 border-l-4 border-l-blue-600">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-500 animate-pulse"
                  : connectionStatus === "error"
                    ? "bg-red-500"
                    : "bg-yellow-500 animate-pulse"
              }`}
            />
            <div>
              <p className="font-medium">
                {connectionStatus === "connected"
                  ? "🔒 Secure Connection Established"
                  : connectionStatus === "error"
                    ? "🚫 Access Denied"
                    : "🔄 Verifying Access..."}
              </p>
              <p className="text-sm text-gray-600">IP: {clientIP || "Detecting..."}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {connectionStatus === "connected" ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Security Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
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
              <Shield
                className="text-white/20"
                style={{
                  width: `${8 + Math.random() * 16}px`,
                  height: `${8 + Math.random() * 16}px`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="w-full max-w-md relative z-10 px-4">
          <SecurityStatus />

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-blue-400 animate-pulse mr-3" />
                <CardTitle className="text-2xl font-bold">Secure Admin Portal</CardTitle>
                <Lock className="h-12 w-12 text-purple-400 animate-pulse ml-3" />
              </div>
              <p className="text-blue-200">aurarise Tech Solutions - Administrative Access</p>
              <div className="text-xs text-yellow-200 mt-2 p-2 bg-yellow-900/30 rounded">
                ⚠️ Authorized Personnel Only
              </div>
            </CardHeader>
            <CardContent>
              {connectionStatus === "error" ? (
                <div className="text-center p-6">
                  <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-red-300 mb-2">Access Denied</h3>
                  <p className="text-red-200 text-sm mb-4">
                    Your IP address ({clientIP}) is not authorized for administrative access.
                  </p>
                  <p className="text-xs text-gray-400">Contact system administrator to whitelist your IP address.</p>
                </div>
              ) : connectionStatus === "connecting" ? (
                <div className="text-center p-6">
                  <RefreshCw className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-bold text-blue-300 mb-2">Verifying Access</h3>
                  <p className="text-blue-200 text-sm">Checking IP authorization...</p>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Secure Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure Login
                  </Button>
                </form>
              )}

              <div className="mt-6 text-xs text-center space-y-1">
                <p className="text-gray-400">🔐 256-bit SSL Encrypted</p>
                <p className="text-gray-400">🛡️ IP-based Access Control</p>
                <p className="text-gray-400">📊 Activity Monitoring Active</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Secure Admin Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 animate-pulse" />
            <div>
              <h1 className="text-2xl font-bold">Secure Admin Portal</h1>
              <p className="text-xs text-blue-200">aurarise Tech Solutions • Administrative Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className="font-medium">{user?.username}</p>
              <p className="text-blue-200 text-xs">
                {user?.role} • {clientIP}
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>View Site</span>
            </a>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="hero">
              <Star className="h-4 w-4 mr-2" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="about">
              <Users className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="services">
              <Settings className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Globe className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="system">
              <Server className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="leadership">
              <Users className="h-4 w-4 mr-2" />
              Leadership
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Backend Status</p>
                      <p className="text-2xl font-bold text-green-600">Online</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Sessions</p>
                      <p className="text-2xl font-bold text-blue-600">1</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Services</p>
                      <p className="text-2xl font-bold text-purple-600">{content.services.length}</p>
                    </div>
                    <Database className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Last Update</p>
                      <p className="text-sm font-bold text-orange-600">
                        {content.lastUpdated ? new Date(content.lastUpdated).toLocaleTimeString() : "Never"}
                      </p>
                    </div>
                    <RefreshCw className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">{log.action}</p>
                          <p className="text-xs text-gray-500">{log.details}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
                        <p className="text-xs text-gray-400">{log.ip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Editor */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Hero Section Editor</span>
                  </div>
                  {saveStatus.hero && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">{saveStatus.hero}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Main Title</label>
                  <Input
                    value={content.hero.title}
                    onChange={(e) => handleContentUpdate("hero", "title", e.target.value)}
                    className="w-full"
                    placeholder="Enter main hero title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Textarea
                    value={content.hero.subtitle}
                    onChange={(e) => handleContentUpdate("hero", "subtitle", e.target.value)}
                    rows={4}
                    className="w-full"
                    placeholder="Enter hero subtitle/description"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary CTA</label>
                    <Input
                      value={content.hero.ctaText}
                      onChange={(e) => handleContentUpdate("hero", "ctaText", e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary CTA</label>
                    <Input
                      value={content.hero.secondaryCtaText}
                      onChange={(e) => handleContentUpdate("hero", "secondaryCtaText", e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                  <h4 className="font-medium mb-4 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Live Preview
                  </h4>
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900">{content.hero.title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{content.hero.subtitle}</p>
                    <div className="flex justify-center space-x-4">
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-full">{content.hero.ctaText}</div>
                      <div className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full">
                        {content.hero.secondaryCtaText}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Editor */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Services ({content.services.length} total)</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>

            {saveStatus.services && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800">{saveStatus.services}</span>
              </div>
            )}

            <div className="grid gap-6">
              {content.services.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span>{service.title}</span>
                        <span className="text-sm text-gray-500">({service.animationType})</span>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => handleServiceDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input
                          value={service.title}
                          onChange={(e) => handleServiceUpdate(service.id, "title", e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => handleServiceUpdate(service.id, "description", e.target.value)}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Features ({service.features.length}):</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {service.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Editor */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>About Section Editor</span>
                  {saveStatus.about && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">{saveStatus.about}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={content.about.title}
                    onChange={(e) => handleContentUpdate("about", "title", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={content.about.description}
                    onChange={(e) => handleContentUpdate("about", "description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mission Statement</label>
                  <Textarea
                    value={content.about.mission}
                    onChange={(e) => handleContentUpdate("about", "mission", e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vision Statement</label>
                  <Textarea
                    value={content.about.vision}
                    onChange={(e) => handleContentUpdate("about", "vision", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Editor */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Contact Information</span>
                  {saveStatus.contact && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">{saveStatus.contact}</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Phone</label>
                    <Input
                      value={content.contact.phone}
                      onChange={(e) => handleContentUpdate("contact", "phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      value={content.contact.email}
                      onChange={(e) => handleContentUpdate("contact", "email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Email</label>
                    <Input
                      value={content.contact.supportEmail}
                      onChange={(e) => handleContentUpdate("contact", "supportEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Physical Address</label>
                  <Textarea
                    value={content.contact.address}
                    onChange={(e) => handleContentUpdate("contact", "address", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Server Status:</span>
                    <span className="text-green-600 font-medium">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <span className="text-green-600 font-medium">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span className="text-gray-600">
                      {content.lastUpdated ? new Date(content.lastUpdated).toLocaleString() : "Never"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated By:</span>
                    <span className="text-gray-600">{content.updatedBy || "System"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Services:</span>
                    <span className="text-blue-600 font-medium">{content.services.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Testimonials:</span>
                    <span className="text-purple-600 font-medium">{content.testimonials.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Leadership Team:</span>
                    <span className="text-green-600 font-medium">{content.leadership.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Projects:</span>
                    <span className="text-orange-600 font-medium">{content.stats.projects}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Leadership Editor */}
          <TabsContent value="leadership" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Leadership Team ({content.leadership.length} total)</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            {saveStatus.leadership && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800">{saveStatus.leadership}</span>
              </div>
            )}

            <div className="grid gap-6">
              {content.leadership.map((leader) => (
                <Card key={leader.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span>{leader.name}</span>
                        <span className="text-sm text-gray-500">({leader.experience})</span>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => handleLeaderDelete(leader.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <Input
                            value={leader.name}
                            onChange={(e) => handleLeaderUpdate(leader.id, "name", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Experience</label>
                          <Input
                            value={leader.experience}
                            onChange={(e) => handleLeaderUpdate(leader.id, "experience", e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Position</label>
                        <Input
                          value={leader.position}
                          onChange={(e) => handleLeaderUpdate(leader.id, "position", e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <Textarea
                          value={leader.bio}
                          onChange={(e) => handleLeaderUpdate(leader.id, "bio", e.target.value)}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <Input
                            value={leader.email}
                            onChange={(e) => handleLeaderUpdate(leader.id, "email", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <Input
                            value={leader.phone}
                            onChange={(e) => handleLeaderUpdate(leader.id, "phone", e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Expertise ({leader.expertise.length}):</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {leader.expertise.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

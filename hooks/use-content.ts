"use client"

import { useState, useEffect } from "react"

interface ContentData {
  stats: Array<{
    label: string
    value: string
  }>
  services: Array<{
    id: number
    title: string
    description: string
    features: string[]
    icon: string
    color: string
    animationType: string
  }>
  leadership: Array<{
    id: number
    name: string
    position: string
    department: string
    bio: string
    expertise: string[]
    experience: string
    email: string
    phone: string
  }>
  about: {
    title: string
    description: string
    mission: string
    vision: string
  }
}

export function useContent() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      console.log("Fetching content from /api/content...")
      const timestamp = Date.now()
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(`/api/content?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      console.log("Response status:", response.status)
      const result = await response.json()
      console.log("Content result:", result)

      if (result.success) {
        setContent(result.data)
        setError(null)
        console.log("Content loaded successfully:", result.data)
      } else {
        setError(result.error || "Failed to fetch content")
        console.error("Content fetch failed:", result.error)
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError("Request timeout - using fallback content")
        console.warn("Content fetch timeout - using fallback")
      } else {
        setError("Network error while fetching content")
        console.error("Content fetch error:", err)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (type: string, data: any) => {
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, data }),
      })

      const result = await response.json()

      if (result.success) {
        setContent(result.data)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error("Content update error:", err)
      return { success: false, error: "Network error while updating content" }
    }
  }

  const updateContentItem = async (type: string, id: number, data: any) => {
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, id, data }),
      })

      const result = await response.json()

      if (result.success) {
        setContent(result.data)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error("Content item update error:", err)
      return { success: false, error: "Network error while updating content item" }
    }
  }

  const deleteContentItem = async (type: string, id: number) => {
    try {
      const response = await fetch(`/api/content?type=${type}&id=${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        setContent(result.data)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error("Content item delete error:", err)
      return { success: false, error: "Network error while deleting content item" }
    }
  }

  useEffect(() => {
    fetchContent()
    
    // Add retry mechanism if content fails to load
    const retryTimer = setTimeout(() => {
      if (!content && !error) {
        console.log("Retrying content fetch...")
        fetchContent()
      }
    }, 5000)
    
    return () => clearTimeout(retryTimer)
  }, [])

  return {
    content,
    loading,
    error,
    updateContent,
    updateContentItem,
    deleteContentItem,
    refetch: fetchContent,
  }
}

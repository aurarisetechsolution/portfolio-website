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
      const response = await fetch("/api/content")
      const result = await response.json()

      if (result.success) {
        setContent(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to fetch content")
      }
    } catch (err) {
      setError("Network error while fetching content")
      console.error("Content fetch error:", err)
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

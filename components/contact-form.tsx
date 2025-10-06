"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to send")
      toast({ title: "Thanks!", description: "Your message has been sent." })
      e.currentTarget.reset()
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <Input required aria-label="Your name" name="name" placeholder="Your name" className="md:col-span-1" />
      <Input
        required
        aria-label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        className="md:col-span-1"
      />
      <Button type="submit" disabled={loading} className="md:col-span-1">
        {loading ? "Sending..." : "Send"}
      </Button>
      <Textarea
        required
        aria-label="Message"
        name="message"
        placeholder="Tell me about your project or say hello."
        className="md:col-span-3"
        rows={4}
      />
    </form>
  )
}

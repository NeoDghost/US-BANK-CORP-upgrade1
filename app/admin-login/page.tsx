"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "danielhenney707@gmail.com" && password === "NeoCent147$") {
      router.push("/admin")
    } else {
      alert("Invalid admin credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded border-2 border-red-600 flex items-center justify-center">
              <div className="text-white font-bold text-xs">🔐</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-red-800">US Bank Corp</h1>
              <p className="text-xs text-red-600">Admin Portal</p>
            </div>
          </div>
          <CardTitle className="text-2xl text-red-800">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="danielhenney707@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Admin Login
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Admin Portal Access</p>
            <p>danielhenney707@gmail.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

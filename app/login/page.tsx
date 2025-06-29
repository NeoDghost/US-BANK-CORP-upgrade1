"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("individual")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "danielomologo20@gmail.com" && password === "Neo4Cent") {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded border-2 border-blue-600 flex items-center justify-center">
              <div className="text-white font-bold text-xs">🦄</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-800">US Bank Corp</h1>
              <p className="text-xs text-blue-600">UBC</p>
            </div>
          </div>
          <CardTitle className="text-2xl text-blue-800">Customer Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={accountType} onValueChange={setAccountType} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Confirm Login
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <Button variant="link" className="text-blue-600">
              Reactivate Account
            </Button>
            <div>
              <span className="text-sm text-gray-600">{"Don't have an account? "}</span>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>Powered by US Bank Corp</p>
            <p>Licensed by FDIC, OCC, and Federal Reserve</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

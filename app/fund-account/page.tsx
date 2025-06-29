"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function FundAccountPage() {
  const [cardType, setCardType] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [amount, setAmount] = useState("")

  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleFundAccount = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Funding request submitted. Please wait for processing.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-blue-200" />
            </Link>
            <div className="w-12 h-12 bg-white rounded border-2 border-blue-600 flex items-center justify-center">
              <div className="text-blue-600 font-bold text-xs">🦄</div>
            </div>
            <div>
              <h1 className="text-xl font-bold">US Bank Corp</h1>
              <p className="text-xs">UBC</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-white hover:bg-blue-700">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-blue-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-blue-800">Fund Account</CardTitle>
            <p className="text-sm text-gray-600">Add funds using card</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Acceptable Cards:</p>
              <p className="text-sm text-blue-600">Visa Card, Mastercard, or Verve</p>
              <p className="text-xs text-blue-500 mt-1">Must be linked to a bank in the USA</p>
            </div>

            <form onSubmit={handleFundAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardType">Card Type</Label>
                <Select value={cardType} onValueChange={setCardType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa Card</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="verve">Verve</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Fund Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

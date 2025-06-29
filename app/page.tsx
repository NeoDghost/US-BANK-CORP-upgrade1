"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const scrollingMessages = [
  "Sign up with ease (get a US Bank Corp account in less than 10 mins and start transacting)",
  "Fund your account from other bank (you can fund your account seamlessly from your other bank accounts)",
  "Easy access to loan (apply for low interest loan with ease.)",
]

export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % scrollingMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded border-2 border-blue-600 flex items-center justify-center">
              <div className="text-blue-600 font-bold text-xs">🦄</div>
            </div>
            <div>
              <h1 className="text-xl font-bold">US Bank Corp</h1>
              <p className="text-xs">UBC</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Welcome to US Bank Corp</h1>

          {/* Scrolling Messages */}
          <div className="bg-blue-100 p-4 rounded-lg mb-8 min-h-[60px] flex items-center justify-center">
            <p className="text-blue-800 text-lg font-medium animate-pulse">{scrollingMessages[currentMessage]}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">Login</Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Quick Setup</h3>
            <p className="text-gray-600">Get your account ready in less than 10 minutes</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Easy Funding</h3>
            <p className="text-gray-600">Fund from your existing bank accounts seamlessly</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Low Interest Loans</h3>
            <p className="text-gray-600">Apply for competitive rate loans with ease</p>
          </Card>
        </div>
      </main>
    </div>
  )
}

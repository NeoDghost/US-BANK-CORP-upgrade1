"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, Sun, Moon, Phone, Mail, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function ContactSupportPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleCall = () => {
    window.location.href = "tel:+16284003594"
  }

  const handleEmail = () => {
    window.location.href = "mailto:danielhenney707@gmail.com"
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-blue-800">Contact Customer Support</CardTitle>
            <p className="text-gray-600">Need help? Our customer care team is here to assist you.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Phone Support */}
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Phone className="w-8 h-8 text-blue-600 mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800">Customer Care Phone</h3>
                  <p className="text-blue-600 text-lg font-medium">+1 (628) 400-3594</p>
                  <p className="text-sm text-gray-600">Available 24/7 for urgent matters</p>
                </div>
                <Button onClick={handleCall} className="bg-blue-600 hover:bg-blue-700">
                  Call Now
                </Button>
              </div>

              {/* Email Support */}
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <Mail className="w-8 h-8 text-green-600 mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800">Email Support</h3>
                  <p className="text-green-600 text-lg font-medium">danielhenney707@gmail.com</p>
                  <p className="text-sm text-gray-600">Response within 24 hours</p>
                </div>
                <Button onClick={handleEmail} className="bg-green-600 hover:bg-green-700">
                  Send Email
                </Button>
              </div>

              {/* Admin Officer */}
              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <MessageCircle className="w-8 h-8 text-red-600 mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800">Admin Officer</h3>
                  <p className="text-red-600 text-lg font-medium">danielhenney707@gmail.com</p>
                  <p className="text-sm text-gray-600">For transaction issues and account matters</p>
                </div>
                <Button onClick={handleEmail} className="bg-red-600 hover:bg-red-700">
                  Contact Admin
                </Button>
              </div>

              {/* Common Issues */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Common Issues We Can Help With:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Transaction verification problems</li>
                  <li>• Account access issues</li>
                  <li>• Transfer delays or failures</li>
                  <li>• Account funding questions</li>
                  <li>• Security concerns</li>
                  <li>• General banking inquiries</li>
                </ul>
              </div>

              {/* Business Hours */}
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Business Hours</h3>
                <div className="text-sm text-yellow-700">
                  <p>
                    <strong>Phone Support:</strong> 24/7 Available
                  </p>
                  <p>
                    <strong>Email Support:</strong> Monday - Sunday, 24/7
                  </p>
                  <p>
                    <strong>Admin Officer:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

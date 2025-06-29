"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Play, Pause, Check, X, LogOut, Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function AdminPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [verificationCodes, setVerificationCodes] = useState({
    cot: "COT789123",
    otp: "OTP456789",
    token: "TKN321654",
    "2fa": "2FA987321",
  })

  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    // Load pending transactions from localStorage
    const loadPendingTransactions = () => {
      const pending = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
      setTransactions(pending)
    }

    loadPendingTransactions()

    // Check for new transactions periodically
    const interval = setInterval(() => {
      loadPendingTransactions()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleApprove = (id: number) => {
    setTransactions((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, status: "approved" } : t))
      // Update localStorage
      localStorage.setItem("pendingTransactions", JSON.stringify(updated))
      return updated
    })

    setNotifications((prev) => [`Transaction #${id} approved successfully`, ...prev.slice(0, 4)])
  }

  const handleReject = (id: number) => {
    setTransactions((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t))
      // Update localStorage
      localStorage.setItem("pendingTransactions", JSON.stringify(updated))
      return updated
    })

    setNotifications((prev) => [`Transaction #${id} rejected`, ...prev.slice(0, 4)])

    // Notify user about rejection
    alert(`Transaction has been rejected. The customer will be notified that the transaction cannot be completed and provided with customer care contact information.

Admin Email: danielhenney707@gmail.com`)
  }

  const generateNewCode = (type: string) => {
    const newCode = type.toUpperCase() + Math.floor(Math.random() * 900000 + 100000)
    setVerificationCodes((prev) => ({ ...prev, [type]: newCode }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded border-2 border-red-600 flex items-center justify-center">
              <div className="text-red-600 font-bold text-xs">🔐</div>
            </div>
            <div>
              <h1 className="text-xl font-bold">US Bank Corp</h1>
              <p className="text-xs">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-500">{notifications.length}</Badge>
              )}
            </div>
            <Button onClick={handlePauseResume} variant={isPaused ? "default" : "secondary"} size="sm">
              {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
              {isPaused ? "Resume" : "Pause"} Transactions
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-white hover:bg-red-700">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="codes">Verification Codes</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Transaction Management</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending transactions</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">${transaction.amount}</p>
                          <p className="text-sm text-gray-600">
                            {transaction.type === "others" ? `To: ${transaction.bankName}` : "Internal Transfer"}
                          </p>
                          <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                          {transaction.verificationCompleted && (
                            <p className="text-xs text-green-600 font-medium">✓ All verifications completed</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              transaction.status === "approved"
                                ? "default"
                                : transaction.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {transaction.status === "pending_approval" ? "Awaiting Approval" : transaction.status}
                          </Badge>
                          {(transaction.status === "pending_approval" || transaction.status === "pending") && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(transaction.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4" />
                                Accept
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleReject(transaction.id)}>
                                <X className="w-4 h-4" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Verification Codes</CardTitle>
                <p className="text-sm text-gray-600">Generate codes for customer verification</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(verificationCodes).map(([type, code]) => (
                    <div key={type} className="space-y-2">
                      <Label>{type.toUpperCase()} Code</Label>
                      <div className="flex space-x-2">
                        <Input value={code} readOnly />
                        <Button onClick={() => generateNewCode(type)} size="sm">
                          Generate New
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-800">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No notifications</p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map((notification, index) => (
                      <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                        <p className="text-sm">{notification}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

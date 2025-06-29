"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut, Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function TransactionStatusPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    // Load user's transactions
    const loadTransactions = () => {
      const pending = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
      // Filter transactions for current user (in real app, this would be based on user ID)
      setTransactions(pending)
    }

    loadTransactions()

    // Check for status updates
    const interval = setInterval(() => {
      loadTransactions()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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
            <CardTitle className="text-blue-800">Transaction Status</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending transactions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-lg">${transaction.amount}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.type === "others" ? `Transfer to ${transaction.bankName}` : "Internal Transfer"}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                      </div>
                      <Badge
                        variant={
                          transaction.status === "approved"
                            ? "default"
                            : transaction.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {transaction.status === "pending_approval"
                          ? "Awaiting Admin Approval"
                          : transaction.status === "approved"
                            ? "Completed"
                            : transaction.status === "rejected"
                              ? "Transaction Failed"
                              : transaction.status}
                      </Badge>
                    </div>

                    {transaction.status === "pending_approval" && (
                      <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                        <p className="text-sm text-yellow-800">
                          ✓ All verifications completed. Your transaction is now waiting for admin approval.
                        </p>
                      </div>
                    )}

                    {transaction.status === "rejected" && (
                      <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400">
                        <p className="text-sm text-red-800 font-medium">❌ Transaction cannot be completed.</p>
                        <p className="text-sm text-red-700 mt-2">
                          Please contact customer care or admin officer for assistance:
                        </p>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            <strong>Customer Care:</strong> +1 (628) 400-3594
                          </p>
                          <p>
                            <strong>Email:</strong> danielhenney707@gmail.com
                          </p>
                        </div>
                      </div>
                    )}

                    {transaction.status === "approved" && (
                      <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400">
                        <p className="text-sm text-green-800">✅ Transaction completed successfully!</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

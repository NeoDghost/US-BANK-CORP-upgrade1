"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function TransferToSelfPage() {
  const [debitAccount, setDebitAccount] = useState("")
  const [creditAccount, setCreditAccount] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    // Store transfer details in localStorage for verification process
    localStorage.setItem(
      "transferDetails",
      JSON.stringify({
        type: "self",
        debitAccount,
        creditAccount,
        amount,
      }),
    )
    router.push("/verification")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/transfer">
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
            <CardTitle className="text-blue-800">Transfer to Self</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="debitAccount">Account to Debit</Label>
                <Select value={debitAccount} onValueChange={setDebitAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account to debit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1234567890">Checking - 1234567890</SelectItem>
                    <SelectItem value="0987654321">Savings - 0987654321</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Debit</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditAccount">Account to Credit</Label>
                <Select value={creditAccount} onValueChange={setCreditAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account to credit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1234567890">Checking - 1234567890</SelectItem>
                    <SelectItem value="0987654321">Savings - 0987654321</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Initiate Transfer
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

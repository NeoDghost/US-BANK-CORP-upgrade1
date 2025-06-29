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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const usBanks = [
  "Bank of America",
  "JPMorgan Chase",
  "Wells Fargo",
  "Citibank",
  "U.S. Bank",
  "PNC Bank",
  "Capital One",
  "TD Bank",
  "Bank of New York Mellon",
  "State Street Corporation",
  "American Express",
  "Ally Bank",
  "USAA",
  "Charles Schwab Bank",
  "Goldman Sachs Bank",
  "Morgan Stanley Bank",
  "Santander Bank",
  "Fifth Third Bank",
  "KeyBank",
  "Regions Bank",
]

export default function TransferToOthersPage() {
  const [fromAccount, setFromAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [description, setDescription] = useState("")
  const [saveBeneficiary, setSaveBeneficiary] = useState(false)

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
        type: "others",
        fromAccount,
        amount,
        bankName,
        accountNumber,
        description,
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
            <CardTitle className="text-blue-800">Transfer to Others</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromAccount">Account to Transfer From</Label>
                <Select value={fromAccount} onValueChange={setFromAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1234567890">Checking - 1234567890</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Transfer</Label>
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
                <Label htmlFor="bankName">Bank Name</Label>
                <Select value={bankName} onValueChange={setBankName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {usBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Transfer Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter transfer description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveBeneficiary"
                  checked={saveBeneficiary}
                  onCheckedChange={(checked) => setSaveBeneficiary(checked as boolean)}
                />
                <Label htmlFor="saveBeneficiary" className="text-sm">
                  Save account as beneficiary
                </Label>
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

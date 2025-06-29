"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Send, History, DollarSign, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function DashboardPage() {
  const accountName = "Daniel Omologo"
  const accountNumber = "1234567890"
  const accountBalance = "$7,903,147,977.07"

  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLoanClick = () => {
    alert("Try again")
  }

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
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-white hover:bg-blue-700">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-blue-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <div className="text-right">
              <p className="text-sm">Welcome, {accountName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Account Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-800">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="text-lg font-semibold">{accountName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="text-lg font-semibold">{accountNumber}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Account Balance</p>
                <p className="text-3xl font-bold text-green-600">{accountBalance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Link href="/fund-account">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800">Fund Account</h3>
              </CardContent>
            </Card>
          </Link>

          <Link href="/transfer">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Send className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800">Make Transfer</h3>
              </CardContent>
            </Card>
          </Link>

          <Link href="/history">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <History className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800">Check History</h3>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleLoanClick}>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800">Apply for Loan</h3>
            </CardContent>
          </Card>

          <Link href="/transaction-status">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <History className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800">Transaction Status</h3>
              </CardContent>
            </Card>
          </Link>

          <Link href="/contact-support">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800">Contact Support</h3>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}

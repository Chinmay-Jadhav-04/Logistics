// "use client"

import { useState, useRef } from "react"
import ProgressSteps from "./progress-steps"
import { Mail } from "lucide-react"

export default function VerificationPage({ onNext, updateFormData, formData }) {
  const [otp, setOtp] = useState(formData.otp || ["", "", "", ""])
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    if (pastedData.length <= 4) {
      const newOtp = [...otp]

      for (let i = 0; i < Math.min(pastedData.length, 4); i++) {
        if (/^\d$/.test(pastedData[i])) {
          newOtp[i] = pastedData[i]
        }
      }

      setOtp(newOtp)

      // Focus the appropriate input
      if (pastedData.length < 4) {
        inputRefs[pastedData.length].current?.focus()
      }
    }
  }

  const handleVerify = () => {
    if (otp.every((digit) => digit)) {
      updateFormData({ otp })
      onNext()
    }
  }

  const handleResend = () => {
    // In a real app, this would trigger a new OTP to be sent
    console.log("Resending OTP...")
  }

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-lg">
      <div className="p-6">
        <ProgressSteps currentStep={3} />

        <div className="mb-8 flex flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700/10">
            <Mail className="h-6 w-6 text-teal-700" />
          </div>
          <h1 className="mb-1 text-2xl font-bold text-teal-700">Email Verification</h1>
          <p className="text-center text-muted-foreground">Enter the OTP sent to your email</p>
        </div>

        <div className="mb-8 flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-12 w-12 rounded-md border-2 border-teal-700 bg-white text-center text-lg text-teal-700 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleVerify}
          className="mb-4 w-full rounded-md bg-teal-700 py-2 text-white transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
          disabled={!otp.every((digit) => digit)}
        >
          Verify OTP
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive code?{" "}
          <button onClick={handleResend} className="font-medium text-teal-700 hover:underline">
            Resend
          </button>
        </div>
      </div>
    </div>
  )
}


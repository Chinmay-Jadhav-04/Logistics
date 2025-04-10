"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import DocumentUploadPage from "@/components/document-upload-page"
import VerificationPage from "@/components/verification-page"
import SuccessPage from "@/components/success-page"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
    documents: [],
    otp: ["", "", "", ""],
  })

  // Add animation delay when changing steps
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleStepChange = (step) => {
    setIsTransitioning(true)

    // Add a slight delay for smoother transitions
    setTimeout(() => {
      setCurrentStep(step)
      setIsTransitioning(false)
    }, 300)
  }

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className={`w-full max-w-md transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentStep === 1 && (
          <LoginPage onNext={() => handleStepChange(2)} updateFormData={updateFormData} formData={formData} />
        )}
        {currentStep === 2 && (
          <DocumentUploadPage onNext={() => handleStepChange(3)} updateFormData={updateFormData} formData={formData} />
        )}
        {currentStep === 3 && (
          <VerificationPage onNext={() => handleStepChange(4)} updateFormData={updateFormData} formData={formData} />
        )}
        {currentStep === 4 && <SuccessPage onNext={() => console.log("Process completed")} formData={formData} />}
      </div>
    </main>
  )
}


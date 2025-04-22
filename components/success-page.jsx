"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProgressSteps from "./progress-steps"
import { Check } from "lucide-react"

export default function SuccessPage({ onNext, formData }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  // Effect for confetti animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Separate effect for navigation
  useEffect(() => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const timer = setTimeout(() => {
        const cfsButton = document.querySelector('[data-id="cfs-icd"]')
        if (cfsButton) {
          cfsButton.click()
        }
      }, 500) // Increased timeout to ensure DOM is ready

      return () => clearTimeout(timer)
    }
  }, [])

  const handleContinue = () => {
    router.push('/')
  }

  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 50 }).map((_, index) => {
    const colors = ["#1e40af", "#0ea5e9", "#0891b2", "#0d9488", "#4338ca", "#6366f1"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomLeft = `${Math.random() * 100}%`
    const randomDelay = `${Math.random() * 2}s`
    const randomDuration = `${2 + Math.random() * 2}s`

    return (
      <div
        key={index}
        className="confetti"
        style={{
          left: randomLeft,
          backgroundColor: randomColor,
          animationDelay: randomDelay,
          animationDuration: randomDuration,
          display: showConfetti ? "block" : "none",
        }}
      />
    )
  })

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-lg">
      <div className="p-6 relative">
        {/* Confetti container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">{confettiPieces}</div>

        <ProgressSteps currentStep={4} />

        <div className="mb-8 flex flex-col items-center">
          {/* Animated checkmark with pulsing ring */}
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-teal-700 opacity-20 animate-pulse-ring"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-teal-700 animate-scale-in">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Animated heading */}
          <h1 className="mb-2 text-2xl font-bold text-teal-700 animate-fade-in-up animation-delay-100">
            Successfully Verified!
          </h1>

          {/* Animated text */}
          <p className="text-center text-muted-foreground animate-fade-in-up animation-delay-200">
            Your account has been verified
            <br />
            successfully
          </p>
        </div>

        {/* Animated button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-md bg-teal-700 py-2 text-white transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 animate-bounce-in animation-delay-300"
        >
          Continue to Logistics
        </button>
      </div>
    </div>
  )
}



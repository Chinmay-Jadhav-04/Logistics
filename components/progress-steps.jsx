"use client"

import { useEffect, useState } from "react"

export default function ProgressSteps({ currentStep }) {
  const steps = [
    { id: 1, name: "Log in" },
    { id: 2, name: "Document Upload" },
    { id: 3, name: "Verification" },
    { id: 4, name: "Successful" },
  ]

  // State to control animation
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const [animatedStep, setAnimatedStep] = useState(1)

  useEffect(() => {
    // First update the step for the circle animations
    setAnimatedStep(currentStep)

    // Then animate the progress bar width with a slight delay
    const timer = setTimeout(() => {
      setAnimatedWidth(((currentStep - 1) * 100) / (steps.length - 1))
    }, 100)

    return () => clearTimeout(timer)
  }, [currentStep, steps.length])

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500
                ${
                  step.id === animatedStep
                    ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                    : step.id < animatedStep
                      ? "bg-primary/70 text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                }
                ${step.id === animatedStep ? "animate-pulse-subtle" : ""}
              `}
            >
              {step.id < animatedStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-foreground animate-scale-in"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span
              className={`
              mt-1 text-sm transition-all duration-300
              ${step.id === animatedStep ? "font-bold text-primary" : "text-muted-foreground"}
            `}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute h-1 w-full bg-secondary rounded-full overflow-hidden">
          {/* Animated progress indicator with gradient */}
          <div
            className="absolute h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${animatedWidth}%`,
              background: "linear-gradient(90deg, hsl(var(--progress-fill-from)), hsl(var(--progress-fill-to)))",
              boxShadow: "0 0 8px rgba(var(--primary), 0.3)",
            }}
          >
            {/* Animated shimmer effect */}
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

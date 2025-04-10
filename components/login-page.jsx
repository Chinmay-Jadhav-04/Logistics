"use client"

import { useState, useEffect } from "react"
import ProgressSteps from "./progress-steps"
import { Eye, EyeOff, Truck } from "lucide-react"

export default function LoginPage({ onNext, updateFormData, formData }) {
  const [firstName, setFirstName] = useState(formData?.firstName || "")
  const [lastName, setLastName] = useState(formData?.lastName || "")
  const [email, setEmail] = useState(formData?.email || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(formData?.rememberMe || false)
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }
    let hasError = false

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required"
      hasError = true
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required"
      hasError = true
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      hasError = true
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
      hasError = true
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      hasError = true
    }

    setErrors(newErrors)

    if (!hasError) {
      updateFormData({ firstName, lastName, email, password, rememberMe })
      onNext()
    }
  }

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-lg relative p-6">
      <ProgressSteps currentStep={1} />

      <div className="mb-6 flex flex-col items-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Truck className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mb-1 text-2xl font-bold text-primary">Logistics Login</h1>
        <p className="text-center text-muted-foreground">Enter your details to access your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-foreground">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-md border border-input bg-card p-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-foreground">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-md border border-input bg-card p-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-foreground">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-card p-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-md border border-input bg-card p-2 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2.5 text-muted-foreground">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-foreground">Confirm Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-md border border-input bg-card p-2 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2.5 text-muted-foreground">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-teal-500 py-2 text-white transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
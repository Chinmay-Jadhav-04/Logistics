"use client"

import { useState, useEffect } from "react"
import ProgressSteps from "./progress-steps"
import { Eye, EyeOff, Truck } from "lucide-react"

export default function LoginPage({ onNext, updateFormData, formData }) {
  const [firstName, setFirstName] = useState(formData?.firstName || "")
  const [lastName, setLastName] = useState(formData?.lastName || "")
  const [email, setEmail] = useState(formData?.email || "")
  const [username, setUsername] = useState(formData?.username || "") // Add username state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(formData?.rememberMe || false)
  const [errors, setErrors] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    username: "", // Add username to errors
    password: "", 
    confirmPassword: "" 
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false
  })

  const validatePassword = (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    setPasswordRequirements(requirements)
    return Object.values(requirements).every(Boolean)
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePassword(newPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = { 
      firstName: "", 
      lastName: "", 
      email: "", 
      username: "", 
      password: "", 
      confirmPassword: "" 
    }
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

    if (!username.trim()) {
      newErrors.username = "Username is required"
      hasError = true
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
      hasError = true
    } else if (!validatePassword(password)) {
      newErrors.password = "Password does not meet requirements"
      hasError = true
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      hasError = true
    }

    setErrors(newErrors)

    if (!hasError) {
      updateFormData({ firstName, lastName, email, username, password, rememberMe })
      onNext()
    }
  }

  // Add paste handler for all text inputs
  const handlePaste = (e) => {
    // The default paste behavior will work fine
    // The text color is controlled by the input's className
    // No need to prevent default or modify the pasted content
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
        {/* First Name field */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-foreground">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onPaste={handlePaste}
            className="w-full rounded-md border border-gray-300 bg-card p-2 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>

        {/* Last Name field */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-foreground">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onPaste={handlePaste}
            className="w-full rounded-md border border-gray-300 bg-card p-2 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-foreground">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onPaste={handlePaste}
            className="w-full rounded-md border border-gray-300 bg-card p-2 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-sm font-medium text-foreground">
            Username
            <span className="text-xs text-gray-500 ml-1">(can include letters, numbers, and special characters)</span>
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onPaste={handlePaste}
            className="w-full rounded-md border border-gray-300 bg-card p-2 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            placeholder="Choose your username"
          />
          {errors.username && <p className="mt-1 text-xs text-destructive">{errors.username}</p>}
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-foreground">
            Password
            <span className="text-xs text-gray-500 ml-1">(minimum 8 characters)</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onPaste={handlePaste}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 bg-card p-2 pr-10 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-2 top-2.5 text-muted-foreground"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
          
          {/* Password requirements checklist */}
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">Password must contain:</p>
            <ul className="text-xs space-y-1">
              <li className={`flex items-center ${passwordRequirements.minLength ? "text-green-500" : "text-gray-500"}`}>
                <span className="mr-1">•</span> Minimum 8 characters
              </li>
              <li className={`flex items-center ${passwordRequirements.hasUpperCase ? "text-green-500" : "text-gray-500"}`}>
                <span className="mr-1">•</span> At least one uppercase letter
              </li>
              <li className={`flex items-center ${passwordRequirements.hasLowerCase ? "text-green-500" : "text-gray-500"}`}>
                <span className="mr-1">•</span> At least one lowercase letter
              </li>
              <li className={`flex items-center ${passwordRequirements.hasSpecialChar ? "text-green-500" : "text-gray-500"}`}>
                <span className="mr-1">•</span> At least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)
              </li>
            </ul>
          </div>
        </div>

        {/* Confirm Password field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-foreground">Confirm Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onPaste={handlePaste}
              placeholder="Confirm your password"
              className="w-full rounded-md border border-gray-300 bg-card p-2 pr-10 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              className="absolute right-2 top-2.5 text-muted-foreground"
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-teal-700 py-2 text-white transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </form>
    </div>
  )
}







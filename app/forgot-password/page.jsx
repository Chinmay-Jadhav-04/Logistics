"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    otp: ['', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOtpChange = (index, value) => {
    // Only allow numeric inputs
    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData(prev => ({
      ...prev,
      otp: newOtp
    }));

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is numeric and not longer than 4 digits
    if (!/^\d+$/.test(pastedData) || pastedData.length > 4) {
      return;
    }

    const newOtp = [...formData.otp];
    for (let i = 0; i < Math.min(pastedData.length, 4); i++) {
      newOtp[i] = pastedData[i];
    }

    setFormData(prev => ({
      ...prev,
      otp: newOtp
    }));

    // Focus the next empty input after paste
    const nextEmptyIndex = Math.min(pastedData.length, 4);
    if (nextEmptyIndex < 4) {
      const nextInput = document.getElementById(`otp-${nextEmptyIndex}`);
      if (nextInput) nextInput.focus();
    }
  }

  const handleSubmitUsername = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username }),
      })

      if (!response.ok) {
        throw new Error('Failed to send OTP')
      }

      setStep(2)
      setError('')
    } catch (error) {
      setError('Failed to send OTP. Please try again.')
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.username,
          otp: formData.otp.join('')
        }),
      })

      if (!response.ok) {
        throw new Error('Invalid OTP')
      }

      setStep(3)
      setError('')
    } catch (error) {
      setError('Invalid OTP. Please try again.')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    // Here you would typically make an API call to reset the password
    console.log('Resetting password')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-teal-600 p-2 rounded-lg shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Link 
            href="/login" 
            className="flex items-center text-sm text-teal-600 hover:text-teal-500 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </Link>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSubmitUsername}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your username"
                />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Send Reset Code
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 4-digit code
                </label>
                <div className="flex justify-between gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={formData.otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-14 h-14 text-center text-xl"
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={!formData.otp.join('').length === 4}
              >
                Verify Code
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}



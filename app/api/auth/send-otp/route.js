import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use app-specific password for Gmail
  }
})

export async function POST(request) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    // Store OTP in memory (replace with database in production)
    if (!global.otpStore) {
      global.otpStore = new Map()
    }
    
    global.otpStore.set(username, {
      otp,
      expiresAt: Date.now() + 600000 // 10 minutes
    })

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: username,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C3E50;">Password Reset Code</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="color: #3498DB; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #7F8C8D; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      message: 'OTP sent successfully',
      // Don't send OTP in response in production
      otp: process.env.NODE_ENV === 'development' ? otp : undefined 
    })

  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}

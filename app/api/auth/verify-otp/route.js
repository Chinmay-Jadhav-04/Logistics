import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { username, otp } = await request.json()

    if (!username || !otp) {
      return NextResponse.json(
        { error: 'Username and OTP are required' },
        { status: 400 }
      )
    }

    // Get stored OTP
    const storedData = global.otpStore?.get(username)

    if (!storedData) {
      return NextResponse.json(
        { error: 'OTP expired or not found' },
        { status: 400 }
      )
    }

    // Check if OTP is expired
    if (Date.now() > storedData.expiresAt) {
      global.otpStore.delete(username)
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 400 }
      )
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // Clear OTP after successful verification
    global.otpStore.delete(username)

    return NextResponse.json({ message: 'OTP verified successfully' })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}
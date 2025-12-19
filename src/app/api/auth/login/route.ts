import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const VALID_USERNAME = process.env.APP_USERNAME || 'gennie'
const VALID_PASSWORD = process.env.APP_PASSWORD || 'Gennie123$'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials against environment variables
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // Create a secure HTTP-only cookie for session
      const cookieStore = await cookies()
      cookieStore.set('auth_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

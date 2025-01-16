import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST() {
  try {
    // Reset all parking spots
    await prisma.parkingSpot.updateMany({
      data: {
        status: 'empty',
        userId: null,
        startTime: null,
      },
    })

    // Clear the waitlist
    await prisma.waitlistEntry.deleteMany({})

    return NextResponse.json({ message: 'Reset successful' })
  } catch (error) {
    console.error('Reset failed:', error)
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 })
  }
}


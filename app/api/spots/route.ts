import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const spots = await prisma.parkingSpot.findMany({
    include: { user: true },
  })
  return NextResponse.json(spots)
}

export async function POST(request: Request) {
  const { spotId, name, email } = await request.json()

  const updatedSpot = await prisma.parkingSpot.update({
    where: { id: spotId },
    data: {
      status: 'occupied',
      user: {
        connectOrCreate: {
          where: { email },
          create: { name, email },
        },
      },
      startTime: new Date(),
    },
    include: { user: true },
  })

  return NextResponse.json(updatedSpot)
}


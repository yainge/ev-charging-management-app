import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
    const waitlist = await prisma.waitlistEntry.findMany({
        include: { user: true },
        orderBy: { joinedAt: 'asc' },
    })
    return NextResponse.json(waitlist)
}

export async function POST(request: Request) {
    const { name, email } = await request.json()

    const newEntry = await prisma.waitlistEntry.create({
        data: {
            user: {
                connectOrCreate: {
                    where: { email },
                    create: { name, email },
                },
            },
        },
        include: { user: true },
    })

    return NextResponse.json(newEntry)
}


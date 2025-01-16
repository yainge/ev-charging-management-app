import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const admin = await prisma.admin.findUnique({ where: { username } })

  if (!admin) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const passwordMatch = await bcrypt.compare(password, admin.password)

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

  return NextResponse.json({ token })
}


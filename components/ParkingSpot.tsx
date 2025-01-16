'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ParkingSpotProps {
  spot: {
    id: number
    status: 'empty' | 'occupied' | 'overtime'
    user: { name: string; email: string } | null
    startTime: string | null
  }
}

export default function ParkingSpot({ spot }: ParkingSpotProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spotId: spot.id, name, email }),
    })
    if (response.ok) {
      // Refresh the spots (this will be handled by the parent component)
    } else {
      console.error('Failed to claim spot')
    }
  }

  const handleLeave = async () => {
    const response = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spotId: spot.id, status: 'empty' }),
    })
    if (response.ok) {
      // Refresh the spots (this will be handled by the parent component)
    } else {
      console.error('Failed to leave spot')
    }
  }

  const getTimerDisplay = () => {
    if (!spot.startTime) return '00:00'
    const start = new Date(spot.startTime)
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000) // difference in seconds
    const minutes = Math.floor(diff / 60)
    const seconds = diff % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`p-4 border rounded-lg ${
      spot.status === 'empty' ? 'bg-gray-700' :
      spot.status === 'occupied' ? 'bg-green-600' :
      'bg-red-600'
    } text-white`}>
      <h2 className="text-xl font-bold mb-2">Spot {spot.id}</h2>
      {spot.status === 'empty' ? (
        <form onSubmit={handleClaim} className="space-y-2">
          <div>
            <Label htmlFor={`name-${spot.id}`} className="text-white">Name</Label>
            <Input
              id={`name-${spot.id}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white text-gray-900"
            />
          </div>
          <div>
            <Label htmlFor={`email-${spot.id}`} className="text-white">Email</Label>
            <Input
              id={`email-${spot.id}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-gray-900"
            />
          </div>
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Claim Spot</Button>
        </form>
      ) : (
        <div>
          <p>Occupied by: {spot.user?.name}</p>
          <p>Time: {getTimerDisplay()}</p>
          <Button onClick={handleLeave} className="bg-red-600 hover:bg-red-700 text-white">Leave Spot</Button>
        </div>
      )}
    </div>
  )
}


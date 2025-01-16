'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface ParkingSpot {
  id: number
  status: string
  user: { name: string; email: string } | null
}

interface WaitlistEntry {
  id: number
  user: { name: string; email: string }
  joinedAt: string
}

export default function AdminDashboard() {
  const [spots, setSpots] = useState<ParkingSpot[]>([])
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    }

    const fetchData = async () => {
      const spotsResponse = await fetch('/api/spots')
      const waitlistResponse = await fetch('/api/waitlist')

      if (spotsResponse.ok && waitlistResponse.ok) {
        const spotsData = await spotsResponse.json()
        const waitlistData = await waitlistResponse.json()
        setSpots(spotsData)
        setWaitlist(waitlistData)
      } else {
        console.error('Failed to fetch data')
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Refresh every 5 seconds

    return () => clearInterval(interval)
  }, [router])

  const handleReset = async () => {
    const response = await fetch('/api/admin/reset', { method: 'POST' })
    if (response.ok) {
      // Refresh data after reset
      const spotsResponse = await fetch('/api/spots')
      const waitlistResponse = await fetch('/api/waitlist')
      if (spotsResponse.ok && waitlistResponse.ok) {
        setSpots(await spotsResponse.json())
        setWaitlist(await waitlistResponse.json())
      }
    } else {
      console.error('Failed to reset')
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          <p>{spots.length} total spots</p>
          <p>{spots.filter(spot => spot.status === 'occupied').length} occupied</p>
          <p>{spots.filter(spot => spot.status === 'empty').length} available</p>
          <ul className="mt-4">
            {spots.map(spot => (
              <li key={spot.id} className="mb-2">
                Spot {spot.id}: {spot.status}
                {spot.user && ` - ${spot.user.name} (${spot.user.email})`}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Waitlist</h3>
          <p>{waitlist.length} users in waitlist</p>
          <ul className="mt-4">
            {waitlist.map(entry => (
              <li key={entry.id} className="mb-2">
                {entry.user.name} ({entry.user.email}) - Joined at {new Date(entry.joinedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Actions</h3>
        <div className="space-x-4">
          <Button onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white">Reset All Spots and Clear Waitlist</Button>
        </div>
      </div>
    </div>
  )
}


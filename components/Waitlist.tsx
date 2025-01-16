'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface WaitlistEntry {
  id: number
  user: {
    name: string
    email: string
  }
  joinedAt: string
}

export default function Waitlist() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchWaitlist = async () => {
      const response = await fetch('/api/waitlist')
      if (response.ok) {
        const data = await response.json()
        setWaitlist(data)
      } else {
        console.error('Failed to fetch waitlist')
      }
    }

    fetchWaitlist()
    const interval = setInterval(fetchWaitlist, 5000) // Refresh every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    if (response.ok) {
      const newEntry = await response.json()
      setWaitlist([...waitlist, newEntry])
      setName('')
      setEmail('')
    } else {
      console.error('Failed to join waitlist')
    }
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Waitlist</h2>
      <form onSubmit={handleJoinWaitlist} className="space-y-4 mb-6">
        <div>
          <Label htmlFor="waitlist-name">Name</Label>
          <Input
            id="waitlist-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="waitlist-email">Email</Label>
          <Input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Join Waitlist</Button>
      </form>
      <ul className="space-y-2">
        {waitlist.map((entry) => (
          <li key={entry.id} className="bg-gray-100 p-2 rounded">
            <span className="font-semibold">{entry.user.name}</span> - {entry.user.email}
            <br />
            <span className="text-sm text-gray-600">
              Joined at: {new Date(entry.joinedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Waitlist() {
  const [waitlist, setWaitlist] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    // TODO: Fetch initial waitlist data from the server
  }, [])

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement join waitlist functionality
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Waitlist</h2>
      <form onSubmit={handleJoinWaitlist} className="space-y-2 mb-4">
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
        <Button type="submit">Join Waitlist</Button>
      </form>
      <ul>
        {waitlist.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  )
}


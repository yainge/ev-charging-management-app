'use client'

import { useState, useEffect } from 'react'
import ParkingSpot from './ParkingSpot'

export default function ParkingSpots() {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        const fetchSpots = async () => {
            const response = await fetch('/api/spots')
            const data = await response.json()
            setSpots(data)
        }

        fetchSpots()
        const interval = setInterval(fetchSpots, 5000) // Refresh every 5 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {spots.map((spot) => (
                <ParkingSpot key={spot.id} spot={spot} />
            ))}
        </div>
    )
}


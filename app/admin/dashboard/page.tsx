import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          {/* TODO: Add real-time status information */}
          <p>4 total spots, 2 occupied, 2 available</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Waitlist</h3>
          {/* TODO: Add real waitlist information */}
          <p>3 users in waitlist</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Actions</h3>
        <div className="space-x-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Reset All Spots</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Clear Waitlist</Button>
        </div>
      </div>
    </div>
  )
}


import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EV Charging Station Management',
  description: 'Manage EV charging stations at your workplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-red-600">EV Charging Station Management</h1>
          {children}
        </main>
      </body>
    </html>
  )
}


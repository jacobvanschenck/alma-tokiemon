'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // Implement wallet connection logic here
    setIsConnected(true)
  }

  return (
    <nav className="bg-gb-dark text-gb-lightest p-4 pixel-borders">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Tokiemon</h1>
        <Button 
          onClick={handleConnect}
          variant={isConnected ? "outline" : "default"}
          className="bg-gb-light text-gb-darkest hover:bg-gb-lightest pixel-borders-thin"
        >
          {isConnected ? "Connected" : "Connect Wallet"}
        </Button>
      </div>
    </nav>
  )
}


"use client"

import { useLoginWithAbstract } from "@abstract-foundation/agw-react"
import { useAccount, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WalletConnect() {
  const { login, isLoggingIn } = useLoginWithAbstract()
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()

  const handleLogin = async () => {
    try {
      await login()
    } catch (error) {
      console.error("Login failed:", error)
      alert("Failed to connect wallet. Please try again.")
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-4">
        <div className="bg-green-100 px-4 py-2 rounded-lg border-2 border-green-600">
          <span className="font-mono text-sm text-green-800">
            Connected:{" "}
            <span className="font-bold">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </span>
        </div>
        <Button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-500 text-white font-mono border-2 border-red-700"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="text-amber-900 font-mono font-bold text-lg">
        ENTER FARM
        <span className="ml-2">→</span>
      </div>
      <Button
        onClick={handleLogin}
        disabled={isLoggingIn || isConnecting}
        className="bg-transparent border-0 p-0 hover:bg-transparent disabled:opacity-50"
      >
        <Image
          src="/images/abstract-button.png"
          alt="Connect with Abstract Global Wallet"
          width={50}
          height={15}
          className="pixelated hover:scale-105 transition-transform"
        />
      </Button>
      {(isLoggingIn || isConnecting) && <p className="text-xs text-amber-600 font-mono">Connecting...</p>}
    </div>
  )
}

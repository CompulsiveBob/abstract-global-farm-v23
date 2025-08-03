"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAbstractClient } from "@abstract-foundation/agw-react"
import { useAccount } from "wagmi"
import { buyDIRTWithETH } from "@/lib/contracts"

interface BuyDirtWithETHProps {
  onDirtPurchased: (amount: number) => void
}

export function BuyDirtWithETH({ onDirtPurchased }: BuyDirtWithETHProps) {
  const [ethAmount, setEthAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { data: abstractClient } = useAbstractClient()
  const { address, isConnected } = useAccount()

  // Calculate DIRT amount: 0.01 ETH = 50 DIRT
  const calculateDirtAmount = (eth: string) => {
    if (!eth || isNaN(Number(eth))) return 0
    return Math.floor((Number(eth) / 0.01) * 50)
  }

  const handleBuyDirt = async () => {
    if (!ethAmount || !address || isNaN(Number(ethAmount))) {
      alert("Please enter a valid ETH amount")
      return
    }

    if (Number(ethAmount) < 0.01) {
      alert("Minimum purchase is 0.01 ETH (50 DIRT)")
      return
    }

    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }

    setIsLoading(true)

    try {
      // Call smart contract to buy DIRT
      const tx = await buyDIRTWithETH(ethAmount)
      console.log("Transaction hash:", tx.hash)
      
      const dirtAmount = calculateDirtAmount(ethAmount)
      onDirtPurchased(dirtAmount)

      alert(`🎉 Successfully purchased ${dirtAmount} $DIRT for ${ethAmount} ETH!`)
      setEthAmount("")
    } catch (error) {
      console.error("Error buying DIRT:", error)
      alert("Failed to purchase DIRT. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-orange-50/95 border-4 border-orange-800">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-orange-900 font-mono mb-4 text-center">💰 BUY $DIRT WITH $ETH</h3>

        <div className="space-y-4">
          <div className="bg-orange-100 border-2 border-orange-600 rounded-lg p-4">
            <div className="text-center space-y-2">
              <p className="font-mono text-sm text-orange-800">Exchange Rate on Abstract</p>
              <p className="text-lg font-bold text-orange-900 font-mono">0.01 ETH = 50 $DIRT</p>
            </div>
          </div>

          {!isConnected && (
            <div className="bg-red-100 border-2 border-red-600 rounded-lg p-3">
              <p className="text-center font-mono text-red-800 text-sm">
                Please connect your Abstract Global Wallet to purchase $DIRT
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="font-mono text-orange-900 font-bold">ETH Amount:</label>
            <input
              type="number"
              step="0.001"
              min="0.01"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              placeholder="Enter ETH amount (min 0.01)"
              className="w-full p-3 border-2 border-orange-600 rounded-lg font-mono bg-orange-50"
              disabled={!isConnected}
            />
          </div>

          {ethAmount && !isNaN(Number(ethAmount)) && Number(ethAmount) >= 0.01 && (
            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
              <p className="text-center font-mono text-green-800">
                You will receive:{" "}
                <span className="font-bold text-green-900">{calculateDirtAmount(ethAmount)} $DIRT</span>
              </p>
            </div>
          )}

          <Button
            onClick={handleBuyDirt}
            disabled={isLoading || !ethAmount || Number(ethAmount) < 0.01 || !isConnected}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-mono text-lg py-3 border-2 border-orange-700 disabled:opacity-50"
          >
            {isLoading
              ? "🔄 Processing..."
              : !isConnected
                ? "🔒 Connect Wallet"
                : `💳 Buy ${calculateDirtAmount(ethAmount)} $DIRT`}
          </Button>

          <div className="text-center">
            <p className="text-xs text-orange-600 font-mono">25% of purchases go to $GUGO buyback & burn</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

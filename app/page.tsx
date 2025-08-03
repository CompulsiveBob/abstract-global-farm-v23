"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WalletConnect } from "@/components/WalletConnect"
import { TokenBalances } from "@/components/TokenBalances"
import { BuyDirtWithETH } from "@/components/BuyDirtWithETH"
import { useAccount } from "wagmi"

export default function LoginPage() {
  const { isConnected } = useAccount()

  if (isConnected) {
    return <GameDashboard />
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/desert-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header with Wallet Connect in top right */}
      <header className="bg-amber-900/90 border-b-4 border-amber-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/images/agf-logo.png" alt="AGF Logo" width={50} height={50} className="pixelated" />
            <h1 className="text-2xl font-bold text-amber-100 font-mono">ABSTRACT GLOBAL FARM</h1>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Bearish Logo Section - Top under login bar */}
      <div className="flex justify-center py-4">
        <Image 
          src="/images/bearish-logo.png" 
          alt="Bearish - GUGO & BURR Mascots" 
          width={250} 
          height={125} 
          className="pixelated"
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between p-4 min-h-[calc(100vh-200px)]">
        {/* Left side - Login Card */}
        <div className="flex-1 flex justify-center">
          <Card className="bg-amber-50/95 border-4 border-amber-800 shadow-2xl max-w-md w-full">
            <CardContent className="p-8 text-center space-y-6">
              {/* Main Logo */}
              <div className="flex justify-center">
                <Image
                  src="/images/agf-logo.png"
                  alt="Abstract Global Farms Logo"
                  width={150}
                  height={150}
                  className="pixelated"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-amber-900 font-mono tracking-wider">ABSTRACT</h1>
                <h2 className="text-2xl font-bold text-green-700 font-mono tracking-wider">GLOBAL FARMS</h2>
                <p className="text-amber-700 font-mono text-sm">Stake • Grow • Mint • Earn</p>
              </div>

              {/* Mascot Characters */}
              <div className="flex justify-center items-center space-x-4">
                <Image src="/images/duck.png" alt="GUGO Duck" width={60} height={60} className="pixelated" />
                <Image src="/images/bearish-bear.png" alt="Bearish Bear" width={60} height={60} className="pixelated" />
              </div>

              {/* How To Play */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-amber-900 font-mono text-center">🎮 How To Play</h3>
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                  <h4 className="font-mono font-bold text-green-800 mb-1 text-sm">Season 1: Stake & Earn</h4>
                  <p className="text-xs font-mono text-green-700">
                    • Stake $GUGO/$BURR to earn $DIRT
                    <br />• Buy $DIRT with ETH (0.01 ETH = 50 $DIRT)
                    <br />• Mint seed NFTs with $DIRT
                    <br />• Collect rare seed varieties
                  </p>
                </div>
                <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-3">
                  <h4 className="font-mono font-bold text-blue-800 mb-1 text-sm">Season 2: Plant & Grow</h4>
                  <p className="text-xs font-mono text-blue-700">
                    • Plant your seed NFTs in farm plots
                    <br />• Daily interactions: 🌊 Water, ✂️ Prune, 🎵 Sing
                    <br />• Random outcomes affect growth
                    <br />• Healthy plants = Rare Plants
                  </p>
                </div>
                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                  <h4 className="font-mono font-bold text-purple-800 mb-1 text-sm">Season 3: Mint NFT</h4>
                  <p className="text-xs font-mono text-purple-700">
                    • Harvest mature plants
                    <br />• Mint unique Plant NFTs
                    <br />• Buy Sell Collect Trade Breed!
                  </p>
                </div>
              </div>

              <p className="text-xs text-amber-600 font-mono">Connect your Abstract Global Wallet to start farming!</p>
            </CardContent>
          </Card>
        </div>



        {/* Right side - GUGO Farmer */}
        <div className="hidden lg:flex flex-1 justify-center items-center flex-col space-y-4 mt-32">
          <div className="text-center">
            <h3 className="text-6xl font-bold text-amber-900 font-mono tracking-wider drop-shadow-lg">$GUGO WE FARM</h3>
          </div>
          <Image
            src="/images/gugo-farmer.png"
            alt="GUGO Farmer"
            width={300}
            height={400}
            className="pixelated drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

function GameDashboard() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "farm" | "shop" | "nfts">("dashboard")
  const [gugoStaked, setGugoStaked] = useState(0)
  const [dirtEarned, setDirtEarned] = useState(125.5)
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState("GUGO")
  const [burrStaked, setBurrStaked] = useState(0)

  const [plants, setPlants] = useState<
    Array<{
      id: string
      plotId: number
      type: string
      rarity: string
      emoji: string
      plantedDate: Date
      daysSincePlanted: number
      health: number
      interactions: Array<{ day: number; action: string; outcome: "positive" | "negative" | "neutral" }>
    }>
  >([])
  const [nfts, setNfts] = useState<
    Array<{ 
      id: string; 
      type: "seed" | "plant"; 
      name: string; 
      rarity: string; 
      emoji: string; 
      mintedDate: Date;
      seedType?: string;
      isPlanted?: boolean;
    }>
  >([])
  const [lastDirtUpdate, setLastDirtUpdate] = useState(Date.now())
  const { address } = useAccount()

  // Update $DIRT earnings and plant growth every 10 seconds (fast testing)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()

      // Update $DIRT earnings (1 minute = 1 day for testing)
      // Real rates: 7500 GUGO = 7.5 DIRT/day, 5000 BURR = 5.0 DIRT/day
      // Testing rates: per minute instead of per day
      const timeDiff = (now - lastDirtUpdate) / 1000 / 60 // minutes (treating as days)
      const gugoEarnings = (gugoStaked / 7500) * 7.5 * timeDiff // Proportional to 7500 GUGO = 7.5 DIRT/day
      const burrEarnings = (burrStaked / 5000) * 5.0 * timeDiff // Proportional to 5000 BURR = 5.0 DIRT/day

      if (gugoEarnings > 0 || burrEarnings > 0) {
        setDirtEarned((prev) => prev + gugoEarnings + burrEarnings)
        setLastDirtUpdate(now)
      }

      // Update plant growth (1 minute = 1 day)
      setPlants((prevPlants) =>
        prevPlants.map((plant) => {
          const minutesSincePlanted = (now - plant.plantedDate.getTime()) / 1000 / 60
          const newDaysSincePlanted = Math.floor(minutesSincePlanted)

          return {
            ...plant,
            daysSincePlanted: Math.min(newDaysSincePlanted, 7), // Cap at 7 days
          }
        }),
      )
    }, 10000) // Update every 10 seconds for fast testing

    return () => clearInterval(interval)
  }, [gugoStaked, burrStaked, lastDirtUpdate])

  const handleStake = () => {
    if (stakeAmount && !isNaN(Number(stakeAmount))) {
      if (selectedToken === "GUGO") {
        setGugoStaked((prev) => prev + Number(stakeAmount))
      } else if (selectedToken === "BURR") {
        setBurrStaked((prev) => prev + Number(stakeAmount))
      }
      setStakeAmount("")
    }
  }

  const handleDirtPurchased = (amount: number) => {
    setDirtEarned((prev) => prev + amount)
  }

  const handleMintSeed = () => {
    if (dirtEarned >= 15) {
      setDirtEarned((prev) => prev - 15)

      // Random seed generation based on odds
      const random = Math.random() * 100
      let seedType, rarity, emoji

      if (random <= 40) {
        seedType = "Corn"
        rarity = "Common"
        emoji = "🌽"
      } else if (random <= 70) {
        seedType = "Carrot"
        rarity = "Rare"
        emoji = "🥕"
      } else if (random <= 90) {
        seedType = "Sunflower"
        rarity = "Legendary"
        emoji = "🌻"
      } else {
        seedType = "Cannabis"
        rarity = "Epic"
        emoji = "🍀"
      }

      // Create seed NFT
      const seedNFT = {
        id: `seed-${Date.now()}`,
        type: "seed" as const,
        name: `${seedType} Seed`,
        rarity,
        emoji,
        mintedDate: new Date(),
        seedType,
        isPlanted: false,
      }

      setNfts((prev) => [...prev, seedNFT])

      alert(`🎉 Minted a ${rarity} ${seedType} Seed NFT!`)
    } else {
      alert("Not enough $DIRT! You need 15 $DIRT to mint a seed NFT.")
    }
  }

  const handlePlantSeed = (plotId: number, seedId: string) => {
    const seedNFT = nfts.find((nft) => nft.id === seedId && nft.type === "seed" && !nft.isPlanted)
    if (!seedNFT) return

    // Check if plot is empty
    const existingPlant = plants.find((p) => p.plotId === plotId)
    if (existingPlant) {
      alert("This plot already has a plant!")
      return
    }

    const newPlant = {
      id: Date.now().toString(),
      plotId,
      type: seedNFT.seedType || "Unknown",
      rarity: seedNFT.rarity,
      emoji: seedNFT.emoji,
      plantedDate: new Date(),
      daysSincePlanted: 0,
      health: 50,
      interactions: [],
      plantedSeedId: seedId,
    }

    setPlants((prev) => [...prev, newPlant])
    
    // Mark seed NFT as planted
    setNfts((prev) => 
      prev.map((nft) => 
        nft.id === seedId 
          ? { ...nft, isPlanted: true }
          : nft
      )
    )

    alert(`🌱 ${seedNFT.seedType} planted in Plot ${plotId}!`)
  }

  const handlePlantInteraction = (plantId: string, action: "water" | "prune" | "sing") => {
    setPlants((prev) =>
      prev.map((plant) => {
        if (plant.id !== plantId) return plant

        const currentDay = plant.daysSincePlanted
        const hasInteractedToday = plant.interactions.some((i) => i.day === currentDay && i.action === action)

        if (hasInteractedToday) {
          alert(`You already ${action}ed this plant today! Try a different action or wait for the next day.`)
          return plant
        }

        // Random outcome
        const random = Math.random()
        let outcome: "positive" | "negative" | "neutral"
        let healthChange = 0

        if (random < 0.4) {
          outcome = "positive"
          healthChange = 10
        } else if (random < 0.7) {
          outcome = "neutral"
          healthChange = 0
        } else {
          outcome = "negative"
          healthChange = -5
        }

        const newHealth = Math.max(0, Math.min(100, plant.health + healthChange))

        const actionEmojis = { water: "🌊", prune: "✂️", sing: "🎵" }
        const outcomeEmojis = { positive: "✅", negative: "❌", neutral: "⚪️" }

        alert(
          `${actionEmojis[action]} ${action.toUpperCase()}: ${outcomeEmojis[outcome]} ${outcome.toUpperCase()} effect! Health: ${plant.health} → ${newHealth}`,
        )

        return {
          ...plant,
          health: newHealth,
          interactions: [...plant.interactions, { day: currentDay, action, outcome }],
        }
      }),
    )
  }

  const handleHarvest = (plantId: string) => {
    const plant = plants.find((p) => p.id === plantId)
    if (!plant) return

    if (plant.daysSincePlanted < 7) {
      alert(`Plant is not ready for harvest yet! Wait ${7 - plant.daysSincePlanted} more days.`)
      return
    }

    // Mint plant NFT
    const plantNFT = {
      id: `plant-${Date.now()}`,
      type: "plant" as const,
      name: `${plant.type} Plant`,
      rarity: plant.health > 80 ? "Legendary" : plant.health > 60 ? "Rare" : "Common",
      emoji: plant.emoji,
      mintedDate: new Date(),
    }

    setNfts((prev) => [...prev, plantNFT])
    setPlants((prev) => prev.filter((p) => p.id !== plantId))

    alert(`🎉 ${plant.type} harvested! ${plantNFT.rarity} Plant NFT minted!`)
  }

  // Calculate earning rates for display
  const gugoEarningRate = (gugoStaked / 7500) * 7.5 // DIRT per day
  const burrEarningRate = (burrStaked / 5000) * 5.0 // DIRT per day

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/desert-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <header className="bg-amber-900/90 border-b-4 border-amber-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/images/agf-logo.png" alt="AGF Logo" width={50} height={50} className="pixelated" />
            <h1 className="text-2xl font-bold text-amber-100 font-mono">ABSTRACT GLOBAL FARM</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-red-100 px-3 py-1 rounded-lg border-2 border-red-600">
              <span className="font-mono text-xs text-red-800 font-bold">⚡ TESTING MODE: 1 min = 1 day</span>
            </div>
            <div className="bg-amber-100 px-4 py-2 rounded-lg border-2 border-amber-600">
              <span className="font-mono text-sm text-amber-800">
                $DIRT: <span className="font-bold text-green-600">{dirtEarned.toFixed(1)}</span>
              </span>
            </div>
            <div className="bg-amber-100 px-4 py-2 rounded-lg border-2 border-amber-600">
              <span className="font-mono text-sm text-amber-800">
                $GUGO Staked: <span className="font-bold text-blue-600">{gugoStaked}</span>
              </span>
            </div>
            <div className="bg-amber-100 px-4 py-2 rounded-lg border-2 border-amber-600">
              <span className="font-mono text-sm text-amber-800">
                $BURR Staked: <span className="font-bold text-orange-600">{burrStaked}</span>
              </span>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Token Balances */}
      <div className="bg-amber-800/90 p-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold text-amber-100 font-mono mb-2 text-center">💰 Wallet Balances</h3>
          <TokenBalances />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-amber-800/90 p-4">
        <div className="max-w-6xl mx-auto flex justify-center space-x-6">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            variant={currentPage === "dashboard" ? "default" : "outline"}
            className="font-mono bg-amber-600 hover:bg-amber-500 text-white border-2 border-amber-700"
          >
            🏠 Dashboard
          </Button>
          <Button
            onClick={() => setCurrentPage("farm")}
            variant={currentPage === "farm" ? "default" : "outline"}
            className="font-mono bg-green-600 hover:bg-green-500 text-white border-2 border-green-700"
          >
            🚜 My Farm
          </Button>
          <Button
            onClick={() => setCurrentPage("shop")}
            variant={currentPage === "shop" ? "default" : "outline"}
            className="font-mono bg-orange-600 hover:bg-orange-500 text-white border-2 border-orange-700"
          >
            🌱 Seed Shop
          </Button>
          <Button
            onClick={() => setCurrentPage("nfts")}
            variant={currentPage === "nfts" ? "default" : "outline"}
            className="font-mono bg-purple-600 hover:bg-purple-500 text-white border-2 border-purple-700"
          >
            🎨 My NFTs
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {currentPage === "dashboard" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Staking Panel */}
            <Card className="bg-amber-50/95 border-4 border-amber-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-amber-900 font-mono mb-4 text-center">STAKE TO EARN $DIRT</h2>

                <div className="space-y-4">
                  <div className="bg-amber-100 border-2 border-amber-600 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <p className="font-mono text-sm text-amber-800">Staking Rates</p>
                      <p className="text-sm font-bold text-green-600 font-mono">7,500 $GUGO = 7.5 $DIRT/day</p>
                      <p className="text-sm font-bold text-orange-600 font-mono">5,000 $BURR = 5.0 $DIRT/day</p>
                      {(gugoStaked > 0 || burrStaked > 0) && (
                        <div className="mt-2 pt-2 border-t border-amber-400">
                          <p className="text-xs font-mono text-amber-700">Your earning rate:</p>
                          <p className="text-sm font-bold text-green-700 font-mono">
                            {(gugoEarningRate + burrEarningRate).toFixed(2)} $DIRT/day
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-amber-900 font-bold">Select Token to Stake:</label>
                    <select
                      value={selectedToken}
                      onChange={(e) => setSelectedToken(e.target.value)}
                      className="w-full p-3 border-2 border-amber-600 rounded-lg font-mono bg-amber-50"
                    >
                      <option value="GUGO">$GUGO - GUGO Token</option>
                      <option value="BURR">$BURR - Bearish Token</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-amber-900 font-bold">Amount to Stake:</label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder={`Enter $${selectedToken} amount`}
                      className="w-full p-3 border-2 border-amber-600 rounded-lg font-mono bg-amber-50"
                    />
                  </div>

                  <Button
                    onClick={handleStake}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-mono text-lg py-3 border-2 border-green-700"
                  >
                    🚀 STAKE ${selectedToken}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-amber-600 font-mono">WE STAKE, WE EARN, WE GO, GUGO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buy DIRT with ETH Panel */}
            <BuyDirtWithETH onDirtPurchased={handleDirtPurchased} />

            {/* Seed NFT Inventory Panel */}
            {nfts.filter(nft => nft.type === "seed" && !nft.isPlanted).length > 0 && (
              <Card className="bg-amber-50/95 border-4 border-amber-800 md:col-span-2">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-amber-900 font-mono mb-4 text-center">🌱 Seed NFT Collection</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {nfts
                      .filter(nft => nft.type === "seed" && !nft.isPlanted)
                      .map((seedNFT) => (
                        <div key={seedNFT.id} className="bg-green-100 border-2 border-green-600 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">{seedNFT.emoji}</div>
                          <div className="font-mono font-bold text-green-800 text-sm">{seedNFT.name}</div>
                          <div className="text-xs font-mono text-green-600">{seedNFT.rarity}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentPage === "farm" && (
          <Card className="bg-amber-50/95 border-4 border-amber-800">
            <CardContent className="p-8 text-center">
              <div className="mb-6 text-center">
                <Button
                  onClick={() => setCurrentPage("dashboard")}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-mono border-2 border-amber-700"
                >
                  ← Return to Dashboard
                </Button>
              </div>
              <Image
                src="/images/my-farm.png"
                alt="My Farm"
                width={400}
                height={300}
                className="mx-auto pixelated mb-6"
              />
              <h2 className="text-3xl font-bold text-amber-900 font-mono mb-4">🚜 MY FARM</h2>
              <p className="text-amber-700 font-mono mb-2">
                Your farm is ready for planting! Buy seeds from the shop to get started.
              </p>
              <p className="text-red-600 font-mono mb-6 text-sm font-bold">
                ⚡ TESTING MODE: Plants grow 1 day per minute!
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                {[1, 2, 3, 4, 5, 6].map((plotId) => {
                  const plant = plants.find((p) => p.plotId === plotId)
                  return (
                    <div
                      key={plotId}
                      className="bg-amber-200 border-2 border-amber-600 rounded-lg p-4 h-32 flex flex-col items-center justify-center relative"
                    >
                      {plant ? (
                        <div className="text-center">
                          <div className="text-2xl mb-1">{plant.emoji}</div>
                          <div className="text-xs font-mono text-amber-700">Day {plant.daysSincePlanted}/7</div>
                          <div className="text-xs font-mono text-amber-700">❤️ {plant.health}%</div>
                          {plant.daysSincePlanted >= 7 && (
                            <Button
                              onClick={() => handleHarvest(plant.id)}
                              className="mt-1 text-xs bg-green-500 hover:bg-green-400 px-2 py-1"
                            >
                              Harvest
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="font-mono text-amber-600 text-sm">Plot {plotId}</span>
                          {nfts.filter(nft => nft.type === "seed" && !nft.isPlanted).length > 0 && (
                            <select
                              onChange={(e) => e.target.value && handlePlantSeed(plotId, e.target.value)}
                              className="mt-2 text-xs p-1 rounded"
                              defaultValue=""
                            >
                              <option value="">Plant seed NFT...</option>
                              {nfts
                                .filter(nft => nft.type === "seed" && !nft.isPlanted)
                                .map((seedNFT) => (
                                  <option key={seedNFT.id} value={seedNFT.id}>
                                    {seedNFT.emoji} {seedNFT.name} ({seedNFT.rarity})
                                  </option>
                                ))}
                            </select>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Plant Interaction Buttons */}
              {plants.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-amber-900 font-mono mb-4 text-center">🌱 Daily Plant Care</h3>
                  <p className="text-sm font-mono text-amber-700 mb-4">
                    You can use each action once per day per plant. Try different actions!
                  </p>
                  <div className="grid gap-4 max-w-2xl mx-auto">
                    {plants.map((plant) => (
                      <div key={plant.id} className="bg-green-100 border-2 border-green-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-bold text-green-800">
                            {plant.emoji} {plant.type} (Plot {plant.plotId})
                          </span>
                          <span className="text-sm font-mono text-green-600">
                            Day {plant.daysSincePlanted}/7 | ❤️ {plant.health}%
                          </span>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() => handlePlantInteraction(plant.id, "water")}
                            className="bg-blue-500 hover:bg-blue-400 text-white font-mono text-sm px-3 py-1"
                          >
                            🌊 Water
                          </Button>
                          <Button
                            onClick={() => handlePlantInteraction(plant.id, "prune")}
                            className="bg-orange-500 hover:bg-orange-400 text-white font-mono text-sm px-3 py-1"
                          >
                            ✂️ Prune
                          </Button>
                          <Button
                            onClick={() => handlePlantInteraction(plant.id, "sing")}
                            className="bg-purple-500 hover:bg-purple-400 text-white font-mono text-sm px-3 py-1"
                          >
                            🎵 Sing
                          </Button>
                        </div>
                        {plant.interactions.length > 0 && (
                          <div className="mt-2 text-xs font-mono text-green-600">
                            Today's actions:{" "}
                            {plant.interactions
                              .filter((i) => i.day === plant.daysSincePlanted)
                              .map((i) => i.action)
                              .join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentPage === "shop" && (
          <Card className="bg-amber-50/95 border-4 border-amber-800">
            <CardContent className="p-8 text-center">
              <div className="mb-6 text-center">
                <Button
                  onClick={() => setCurrentPage("dashboard")}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-mono border-2 border-amber-700"
                >
                  ← Return to Dashboard
                </Button>
              </div>
              <Image
                src="/images/seed-shop.png"
                alt="Seed Shop"
                width={400}
                height={300}
                className="mx-auto pixelated mb-6"
              />
              <h2 className="text-3xl font-bold text-amber-900 font-mono mb-4">🌱 SEED MINTING</h2>
              <p className="text-amber-700 font-mono mb-6">Mint seed NFTs with your earned $DIRT to start growing!</p>
              <div className="flex justify-center">
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-6 max-w-sm">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🌱</div>
                    <h3 className="font-mono font-bold text-green-800 text-xl">Mint Seed NFT</h3>
                    <p className="text-sm font-mono text-green-600 mt-2">Random seed NFT with rarity!</p>
                  </div>

                  <div className="bg-green-50 border border-green-400 rounded p-3 mb-4">
                    <p className="text-xs font-mono text-green-700 text-center">
                      🎨 Mint 1 random seed NFT
                      <br />🌽 40% Corn (Common)
                      <br />🥕 30% Carrot (Rare)
                      <br />🌻 20% Sunflower (Legendary)
                      <br />🍀 10% Cannabis (Epic)
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-2xl font-mono text-green-700 font-bold">15 $DIRT</p>
                  </div>

                  <Button
                    onClick={handleMintSeed}
                    disabled={dirtEarned < 15}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-mono text-lg py-3 disabled:opacity-50"
                  >
                    🌱 Mint Seed NFT ({dirtEarned >= 15 ? "✅" : "❌"} 15 $DIRT)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {currentPage === "nfts" && (
          <Card className="bg-amber-50/95 border-4 border-amber-800">
            <CardContent className="p-8 text-center">
              <div className="mb-6 text-center">
                <Button
                  onClick={() => setCurrentPage("dashboard")}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-mono border-2 border-amber-700"
                >
                  ← Return to Dashboard
                </Button>
              </div>
              <h2 className="text-3xl font-bold text-amber-900 font-mono mb-6">🎨 MY NFT COLLECTION</h2>

              {nfts.length === 0 ? (
                <p className="text-amber-700 font-mono">No NFTs yet! Buy seed packs and harvest plants to mint NFTs.</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="bg-purple-100 border-2 border-purple-600 rounded-lg p-4">
                      <div className="text-4xl mb-2">{nft.emoji}</div>
                      <h3 className="font-mono font-bold text-purple-800">{nft.name}</h3>
                      <p className="text-sm font-mono text-purple-600">{nft.rarity}</p>
                      <p className="text-xs font-mono text-purple-500 mt-2">
                        Minted: {nft.mintedDate.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

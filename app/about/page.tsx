"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
            <h1 className="text-2xl font-bold text-amber-100 font-mono">ABSTRACT GLOBAL FARMS</h1>
          </div>
          <Link href="/">
            <Button className="bg-amber-600 hover:bg-amber-500 text-white font-mono border-2 border-amber-700">
              ← Back to Farm
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Image
            src="/images/agf-logo.png"
            alt="Abstract Global Farms Logo"
            width={200}
            height={200}
            className="pixelated mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-amber-900 font-mono mb-4">🌾 The Story of GUGO</h1>
          <h2 className="text-2xl font-bold text-green-700 font-mono">From Charts to Crops</h2>
        </div>

        {/* Story Content */}
        <div className="space-y-6">
          <Card className="bg-amber-50/95 border-4 border-amber-800 shadow-2xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  In the chaotic world of meme coins, where tokens pump and dump by the hour and the market favors no one, one coin stood out. Not because it promised utility. Not because it had a roadmap. But because it just… wouldn't stop running.
                </p>
                
                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  That coin was <span className="font-bold text-green-700">$GUGO</span>.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  Born from nothing but hype and hope, GUGO became an unstoppable force. He didn't just climb the charts — he dominated them. He blew past DOGE, dunked on PEPE, leapt over SHIBA, and finally flipped $BTC, something no meme had ever dreamed of.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  For a moment, GUGO was everything. The world watched in disbelief.
                </p>

                <div className="text-center my-6">
                  <p className="text-xl font-bold text-green-700 font-mono">GUGO became the world currency and stopped running!</p>
                  <p className="text-lg font-bold text-amber-700 font-mono">GUGO had a new mission.</p>
                </div>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  He traded green candles for greener pastures. Left the noise of the market behind and settled down and staked a plot of land to start farming at The Abstract Global Farms.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  The Abstract Global Farm.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  It was here that GUGO met the Bearish homies — from the NFT trenches, weary of the pump-and-dump life. Together, they decided to grow something real. Not just coins, but crops. Not just value, but community.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What Is AGF Section */}
          <Card className="bg-green-50/95 border-4 border-green-800 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Image src="/images/duck.png" alt="GUGO Duck" width={80} height={80} className="pixelated mr-4" />
                <h2 className="text-3xl font-bold text-green-800 font-mono">🌱 What Is Abstract Global Farms?</h2>
                <Image src="/images/bearish-bear.png" alt="Bearish Bear" width={80} height={80} className="pixelated ml-4" />
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-green-900 font-mono leading-relaxed mb-4">
                  AGF isn't just a farm sim. It's a new way to stake, grow, and build with your community.
                </p>

                <p className="text-green-900 font-mono leading-relaxed mb-4">
                  Players start by staking there $GUGO and $BURR and receiving the in game currency $DIRT. $DIRT can also be bought for $ETH. $DIRT is used to buy mystery Seed pack NFTs.
                </p>

                <p className="text-green-900 font-mono leading-relaxed mb-4">
                  Your seeds are planted in your farm and burned. Every day, they tend their crops through daily actions like watering, pruning, and even singing to their plants. Each interaction has a different effect and after seven days matures into a unique tradable Plant NFTs.
                </p>

                <p className="text-green-900 font-mono leading-relaxed mb-4">
                  Enter your plants in the County Fair for big prizes at the end of each season in each plant category.
                </p>

                <p className="text-green-900 font-mono leading-relaxed mb-4">
                  But it doesn't stop there in the future players will be able to upgrade and buy a Greenhouse, where they can start developing their own strains and minting seed NFT's to trade on the open market— crossbreeding, customizing, and unlocking new tiers of farming dominance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ecosystem Section */}
          <Card className="bg-blue-50/95 border-4 border-blue-800 shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-blue-800 font-mono text-center mb-6">💰 The Ecosystem</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-4">
                    <h3 className="font-bold text-blue-800 font-mono text-lg">$GUGO</h3>
                    <p className="text-blue-700 font-mono text-sm">The legendary meme token that started it all. The symbol of early believers and first coin to earn $DIRT.</p>
                  </div>
                  
                  <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-4">
                    <h3 className="font-bold text-blue-800 font-mono text-lg">$BURR</h3>
                    <p className="text-blue-700 font-mono text-sm">The bears always eat.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-4">
                    <h3 className="font-bold text-blue-800 font-mono text-lg">$DIRT</h3>
                    <p className="text-blue-700 font-mono text-sm">Off-chain in-game currency earned through farming activity. Used to buy Seeds, upgrades, and more.</p>
                  </div>
                  
                  <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-4">
                    <h3 className="font-bold text-blue-800 font-mono text-lg">NFTs</h3>
                    <p className="text-blue-700 font-mono text-sm">Seeds, Plants, Tools, Greenhouses — all tradable, all upgradable.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-lg font-bold text-blue-800 font-mono">And it all runs through the Abstract Global Wallet!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button className="bg-amber-600 hover:bg-amber-500 text-white font-mono text-lg py-3 border-2 border-amber-700">
              🚀 Start Farming Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 
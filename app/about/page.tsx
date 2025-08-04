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
        backgroundImage: "url('/images/mountain-landscape.png')",
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
          <h1 className="text-4xl font-bold text-amber-900 font-mono mb-4">🌾 The Legend of $GUGO</h1>
          <h2 className="text-2xl font-bold text-green-700 font-mono">From Charts to Crops</h2>
        </div>

        {/* Story Content */}
        <div className="space-y-6">
          <Card className="bg-amber-50/95 border-4 border-amber-800 shadow-2xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  $GUGO born in the Abstract world of meme coins in 2025, where tokens pumped and dumped by the hour and the market favored no one, amazingly $GUGO not only survived he ran. Not because he promised utility. Not because he had a roadmap. But because it just… wouldn't stop running.
                </p>
                
                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  $GUGO became an unstoppable force. He didn't just climb the charts — he dominated them. He blew past DOGE, dunked on PEPE, leapt over SHIBA, and finally flipped $BTC, something no meme had ever dreamed of.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  For a moment, GUGO was everything. The world watched in disbelief.
                </p>

                <div className="text-center my-6">
                  <p className="text-xl font-bold text-green-700 font-mono">$GUGO became the world reserve currency and finally stopped running!</p>
                  <p className="text-lg font-bold text-amber-700 font-mono">GUGO had a new mission.</p>
                </div>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  He traded green candles for greener pastures. Left the noise of the market behind and settled down to staked a plot of land and start farming.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  The Abstract Global Farm.
                </p>

                <p className="text-amber-900 font-mono leading-relaxed mb-4">
                  It was here that GUGO met the Bearish bears — from the NFT trenches, Together, they decided to grow something real. Not just coins, but crops. Not just value, but community.
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
                  Players start by staking $GUGO and $BURR and receiving the in game currency $DIRT. $DIRT can also be bought for $ETH. $DIRT is used to buy mystery Seed pack NFTs.
                </p>

                <p className="text-green-900 font-mono leading-relaxed mb-4">
                  Your seeds are planted in your farm burning the NFT. Every day, you tend your crops through daily actions like watering, pruning, and singing. Each interaction has a different effect and after seven days the plant matures setting the metadata for the NFT.
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

          {/* The Art Section */}
          <Card className="bg-purple-50/95 border-4 border-purple-800 shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-purple-800 font-mono text-center mb-6">🎨 The Art</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-purple-900 font-mono leading-relaxed mb-4">
                  Web3 is a revolution of art, culture, and finance. Abstract Global Farms puts culture and finance at the forefront — but above all, art is most important.
                </p>

                <p className="text-purple-900 font-mono leading-relaxed mb-4">
                  There will be art! The plan is to contract both traditional and digital artists — along with devs — to create a unique plant collection, each one inked from the plants you grow in Season One. These initial NFTs will lay the foundation for future crossbreeding.
                </p>

                <p className="text-purple-900 font-mono leading-relaxed mb-4">
                  Season One is all about the farming. But in Season Two, things get interesting — game mechanics kick in, and players begin creating new seed types through breeding and innovation.
                </p>

                <p className="text-purple-900 font-mono leading-relaxed mb-4">
                  The ultimate goal?
                </p>

                <p className="text-purple-900 font-mono leading-relaxed mb-4">
                  To build a collection so visually striking and original that it catches the eye of collectors who don't even play the game.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* The Founder Section */}
          <Card className="bg-amber-50/95 border-4 border-amber-800 shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-amber-800 font-mono text-center mb-6">👨‍🌾 The Founder</h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="prose prose-lg max-w-none">
                  <p className="text-amber-900 font-mono leading-relaxed mb-4">
                    Bobbyscaps is a Web3 idealist who refuses to believe that blockchain technology is just a niche. He is a passionate collector who still holds collections that he started as a child. From baseball cards to sculpted kettlebells, he collects it all.
                  </p>

                  <p className="text-amber-900 font-mono leading-relaxed mb-4">
                    Building in Web3 has been his dream since learning about the technology, and finally, it has come to fruition — thanks to AI.
                  </p>

                  <p className="text-amber-900 font-mono leading-relaxed mb-4">
                    <strong>Disclosure:</strong> Bobbyscaps is a Bearish and $GUGO holder, but he is not selling.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <Image 
                      src="/images/bearish-nft.png" 
                      alt="Bearish NFT" 
                      width={200} 
                      height={200} 
                      className="pixelated rounded-lg border-4 border-amber-600"
                    />
                    <p className="text-amber-800 font-mono text-sm mt-2">Bearish NFT</p>
                  </div>
                  <div className="text-center">
                    <Image 
                      src="/images/gugo-nft.png" 
                      alt="GUGO NFT" 
                      width={200} 
                      height={200} 
                      className="pixelated rounded-lg border-4 border-green-600"
                    />
                    <p className="text-green-800 font-mono text-sm mt-2">GUGO NFT</p>
                  </div>
                </div>
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
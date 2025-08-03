"use client"

import { useBalance } from "wagmi"
import { useAccount } from "wagmi"
import { formatEther, parseAbi, type Address } from "viem"
import { useReadContract } from "wagmi"
import { abstractTestnet } from "viem/chains"

// Test token addresses for Abstract testnet - these need to be actual deployed tokens
// For testing purposes, using example addresses (replace with real ones when tokens are deployed)
const GUGO_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000" as Address
const BURR_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000" as Address

const ERC20_ABI = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
])

export function TokenBalances() {
  const { address, isConnected, isConnecting } = useAccount()

  // ETH Balance on Abstract
  const {
    data: ethBalance,
    isError: ethError,
    isLoading: ethLoading,
  } = useBalance({
    address,
    chainId: abstractTestnet.id,
  })

  // GUGO Token Balance - only query if we have real token addresses
  const { data: gugoBalance, isError: gugoError } = useReadContract({
    address: GUGO_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: abstractTestnet.id,
    query: {
      enabled: !!address && GUGO_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000",
    },
  })

  // BURR Token Balance - only query if we have real token addresses
  const { data: burrBalance, isError: burrError } = useReadContract({
    address: BURR_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: abstractTestnet.id,
    query: {
      enabled: !!address && BURR_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000",
    },
  })

  // Get token decimals
  const { data: gugoDecimals } = useReadContract({
    address: GUGO_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
    chainId: abstractTestnet.id,
    query: {
      enabled: GUGO_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000",
    },
  })

  const { data: burrDecimals } = useReadContract({
    address: BURR_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
    chainId: abstractTestnet.id,
    query: {
      enabled: BURR_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000",
    },
  })

  const formatTokenBalance = (balance: bigint | undefined, decimals: number | undefined) => {
    if (!balance || decimals === undefined) return "0.00"
    const formatted = Number(balance) / Math.pow(10, decimals)
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatEthBalance = (balance: bigint | undefined) => {
    if (!balance) return "0.0000"
    return Number.parseFloat(formatEther(balance)).toLocaleString(undefined, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })
  }

  if (!isConnected) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 px-4 py-2 rounded-lg border-2 border-gray-400">
          <span className="font-mono text-sm text-gray-600">Connect wallet to view balances</span>
        </div>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 px-4 py-2 rounded-lg border-2 border-blue-400">
          <span className="font-mono text-sm text-blue-600">Loading balances...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ETH Balance */}
      <div className="bg-blue-100 px-4 py-2 rounded-lg border-2 border-blue-600">
        <span className="font-mono text-sm text-blue-800">
          ETH:{" "}
          <span className="font-bold text-blue-900">
            {ethLoading ? "Loading..." : ethError ? "Error" : formatEthBalance(ethBalance?.value)}
          </span>
        </span>
      </div>

      {/* GUGO Balance */}
      <div className="bg-green-100 px-4 py-2 rounded-lg border-2 border-green-600">
        <span className="font-mono text-sm text-green-800">
          $GUGO:{" "}
          <span className="font-bold text-green-900">
            {GUGO_TOKEN_ADDRESS === "0x0000000000000000000000000000000000000000"
              ? "Not deployed"
              : gugoError
                ? "Error"
                : formatTokenBalance(gugoBalance as bigint, gugoDecimals as number)}
          </span>
        </span>
      </div>

      {/* BURR Balance */}
      <div className="bg-orange-100 px-4 py-2 rounded-lg border-2 border-orange-600">
        <span className="font-mono text-sm text-orange-800">
          $BURR:{" "}
          <span className="font-bold text-orange-900">
            {BURR_TOKEN_ADDRESS === "0x0000000000000000000000000000000000000000"
              ? "Not deployed"
              : burrError
                ? "Error"
                : formatTokenBalance(burrBalance as bigint, burrDecimals as number)}
          </span>
        </span>
      </div>
    </div>
  )
}

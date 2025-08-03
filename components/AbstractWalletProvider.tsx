"use client"

import { AbstractWalletProvider } from "@abstract-foundation/agw-react"
import { abstractTestnet } from "viem/chains"
import type { ReactNode } from "react"

interface NextAbstractWalletProviderProps {
  children: ReactNode
}

export function NextAbstractWalletProvider({ children }: NextAbstractWalletProviderProps) {
  return (
    <AbstractWalletProvider
      chain={abstractTestnet}
      config={{
        appName: "Abstract Global Farm",
        appDescription: "A retro web3 farming game on Abstract blockchain",
      }}
    >
      {children}
    </AbstractWalletProvider>
  )
}

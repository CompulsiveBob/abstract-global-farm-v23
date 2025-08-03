import { useAbstractClient } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

// Contract ABIs (simplified for demo)
const DIRT_TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function mint(address to, uint256 amount)",
  "function buyDIRTWithETH() payable",
  "function stakeGUGO(uint256 amount)",
  "function stakeBURR(uint256 amount)",
  "function claimDIRT()",
  "function stakedGUGO(address user) view returns (uint256)",
  "function stakedBURR(address user) view returns (uint256)",
  "function lastClaimTime(address user) view returns (uint256)"
];

const SEED_NFT_ABI = [
  "function mintSeed()",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function plantSeed(uint256 tokenId, uint256 plotId)",
  "function getUnplantedSeeds(address user) view returns (uint256[])",
  "function seedMetadata(uint256 tokenId) view returns (string seedType, string rarity, string emoji, bool isPlanted, uint256 plantedPlotId, uint256 mintedAt)"
];

const FARMING_ABI = [
  "function plantSeed(uint256 seedId, uint256 plotId)",
  "function interactWithPlant(uint256 plotId, string action)",
  "function harvestPlant(uint256 plotId)",
  "function isPlotOccupied(address user, uint256 plotId) view returns (bool)",
  "function getPlant(address user, uint256 plotId) view returns (tuple(uint256 plotId, uint256 health, uint256 plantedAt, uint256 lastInteraction, uint256 plantedSeedId, string plantType, string rarity, string emoji, bool isHarvested))",
  "function getUserPlants(address user) view returns (tuple(uint256 plotId, uint256 health, uint256 plantedAt, uint256 lastInteraction, uint256 plantedSeedId, string plantType, string rarity, string emoji, bool isHarvested)[])"
];

// Contract addresses (will be set after deployment)
export const CONTRACT_ADDRESSES = {
  DIRT_TOKEN: "0x...", // Will be set after deployment
  SEED_NFT: "0x...",   // Will be set after deployment
  FARMING: "0x..."     // Will be set after deployment
};

export function useContracts() {
  const { data: abstractClient } = useAbstractClient();
  const { address } = useAccount();

  const getContract = (address: string, abi: any) => {
    if (!abstractClient) return null;
    return new ethers.Contract(address, abi, abstractClient);
  };

  const dirtToken = getContract(CONTRACT_ADDRESSES.DIRT_TOKEN, DIRT_TOKEN_ABI);
  const seedNFT = getContract(CONTRACT_ADDRESSES.SEED_NFT, SEED_NFT_ABI);
  const farmingContract = getContract(CONTRACT_ADDRESSES.FARMING, FARMING_ABI);

  return {
    dirtToken,
    seedNFT,
    farmingContract,
    isConnected: !!abstractClient && !!address
  };
}

// Contract interaction functions
export async function buyDIRTWithETH(amount: string) {
  const { dirtToken } = useContracts();
  if (!dirtToken) throw new Error("Contract not available");

  const value = ethers.parseEther(amount);
  const tx = await dirtToken.buyDIRTWithETH({ value });
  return await tx.wait();
}

export async function mintSeed() {
  const { seedNFT } = useContracts();
  if (!seedNFT) throw new Error("Contract not available");

  const tx = await seedNFT.mintSeed();
  return await tx.wait();
}

export async function plantSeed(seedId: number, plotId: number) {
  const { farmingContract } = useContracts();
  if (!farmingContract) throw new Error("Contract not available");

  const tx = await farmingContract.plantSeed(seedId, plotId);
  return await tx.wait();
}

export async function interactWithPlant(plotId: number, action: string) {
  const { farmingContract } = useContracts();
  if (!farmingContract) throw new Error("Contract not available");

  const tx = await farmingContract.interactWithPlant(plotId, action);
  return await tx.wait();
}

export async function harvestPlant(plotId: number) {
  const { farmingContract } = useContracts();
  if (!farmingContract) throw new Error("Contract not available");

  const tx = await farmingContract.harvestPlant(plotId);
  return await tx.wait();
}

// View functions
export async function getDIRTBalance(address: string) {
  const { dirtToken } = useContracts();
  if (!dirtToken) return 0;

  const balance = await dirtToken.balanceOf(address);
  return ethers.formatEther(balance);
}

export async function getStakedAmounts(address: string) {
  const { dirtToken } = useContracts();
  if (!dirtToken) return { gugo: 0, burr: 0 };

  const gugo = await dirtToken.stakedGUGO(address);
  const burr = await dirtToken.stakedBURR(address);
  
  return {
    gugo: ethers.formatEther(gugo),
    burr: ethers.formatEther(burr)
  };
}

export async function getUnplantedSeeds(address: string) {
  const { seedNFT } = useContracts();
  if (!seedNFT) return [];

  const seedIds = await seedNFT.getUnplantedSeeds(address);
  return seedIds.map(id => id.toString());
}

export async function getUserPlants(address: string) {
  const { farmingContract } = useContracts();
  if (!farmingContract) return [];

  const plants = await farmingContract.getUserPlants(address);
  return plants.map((plant: any) => ({
    plotId: plant.plotId.toString(),
    health: plant.health.toString(),
    plantedAt: plant.plantedAt.toString(),
    plantType: plant.plantType,
    rarity: plant.rarity,
    emoji: plant.emoji,
    isHarvested: plant.isHarvested
  }));
} 
# 🚀 Abstract Global Farm - Smart Contract Deployment Guide

## 📋 **Phase 1: Core Contracts Deployment**

### **Prerequisites:**
1. **Abstract Testnet Account** - You need an account with some testnet ETH
2. **Private Key** - Your wallet's private key for deployment
3. **Hardhat** - Already installed in the project

### **Step 1: Set Environment Variables**
```bash
# Create .env file
echo "PRIVATE_KEY=your_private_key_here" > .env
```

### **Step 2: Deploy Contracts**
```bash
# Deploy all contracts to Abstract testnet
npm run deploy
```

### **Step 3: Update Contract Addresses**
After deployment, update the contract addresses in `lib/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  DIRT_TOKEN: "0x...", // From deployment output
  SEED_NFT: "0x...",   // From deployment output  
  FARMING: "0x..."     // From deployment output
};
```

## 🎮 **Game Features After Deployment:**

### **Season 1: Stake & Mint**
- ✅ **Buy DIRT with ETH** (0.01 ETH = 50 DIRT)
- ✅ **Stake GUGO/BURR** to earn DIRT
- ✅ **Mint Seed NFTs** with DIRT
- ✅ **Collect Seeds** in NFT collection

### **Season 2: Plant & Grow**
- ✅ **Plant Seed NFTs** in farm plots
- ✅ **Daily Interactions** (Water, Prune, Sing)
- ✅ **Health Tracking** with random outcomes
- ✅ **7-Day Growth Cycle**

### **Season 3: Harvest & Trade**
- ✅ **Harvest Plants** (placeholder NFT minting)
- ✅ **Plant NFT Collection** (ready for art)
- ✅ **Rarity System** (Common, Rare, Legendary, Epic)

## 🔧 **Contract Functions:**

### **DIRT Token:**
- `buyDIRTWithETH()` - Buy DIRT with ETH
- `stakeGUGO(amount)` - Stake GUGO tokens
- `stakeBURR(amount)` - Stake BURR tokens  
- `claimDIRT()` - Claim earned DIRT

### **Seed NFT:**
- `mintSeed()` - Mint random seed NFT
- `plantSeed(tokenId, plotId)` - Plant seed in plot
- `getUnplantedSeeds(user)` - Get user's unplanted seeds

### **Farming Contract:**
- `plantSeed(seedId, plotId)` - Plant seed NFT
- `interactWithPlant(plotId, action)` - Daily interactions
- `harvestPlant(plotId)` - Harvest mature plant
- `getUserPlants(user)` - Get user's plants

## 🎯 **Next Steps After Deployment:**

1. **Test Basic Functions:**
   - Buy DIRT with ETH
   - Mint seed NFTs
   - Plant seeds in plots

2. **Test Game Mechanics:**
   - Daily plant interactions
   - Health tracking
   - Harvesting system

3. **Frontend Integration:**
   - Connect wallet functions
   - Real transaction handling
   - Error handling

4. **Production Ready:**
   - Add real GUGO/BURR token addresses
   - Implement proper NFT metadata
   - Add marketplace features

## 🚨 **Important Notes:**

- **Testnet Only** - These contracts are for Abstract testnet
- **Placeholder NFTs** - Plant NFTs are placeholders until art is ready
- **Simplified Logic** - Some features are simplified for demo
- **Gas Optimization** - May need optimization for production

## 📞 **Support:**
If you encounter issues during deployment, check:
1. Network connectivity to Abstract testnet
2. Sufficient testnet ETH for deployment
3. Correct private key format
4. Hardhat configuration

---

**Ready to deploy? Run `npm run deploy` when you're ready!** 🚀 
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Abstract Global Farm contracts...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy DIRT Token
  console.log("📦 Deploying DIRT Token...");
  const DIRTToken = await ethers.getContractFactory("DIRTToken");
  const dirtToken = await DIRTToken.deploy();
  await dirtToken.waitForDeployment();
  console.log("DIRT Token deployed to:", await dirtToken.getAddress());

  // Deploy Seed NFT
  console.log("🌱 Deploying Seed NFT...");
  const SeedNFT = await ethers.getContractFactory("SeedNFT");
  const seedNFT = await SeedNFT.deploy(await dirtToken.getAddress());
  await seedNFT.waitForDeployment();
  console.log("Seed NFT deployed to:", await seedNFT.getAddress());

  // Deploy Farming Contract
  console.log("🚜 Deploying Farming Contract...");
  const FarmingContract = await ethers.getContractFactory("FarmingContract");
  const farmingContract = await FarmingContract.deploy(
    await seedNFT.getAddress(),
    await dirtToken.getAddress()
  );
  await farmingContract.waitForDeployment();
  console.log("Farming Contract deployed to:", await farmingContract.getAddress());

  // Set up permissions and initial configuration
  console.log("⚙️ Setting up contract permissions...");
  
  // Give some DIRT to the deployer for testing
  const mintAmount = ethers.parseEther("1000"); // 1000 DIRT for testing
  await dirtToken.mint(deployer.address, mintAmount);
  console.log(`Minted ${ethers.formatEther(mintAmount)} DIRT to deployer`);

  console.log("\n✅ Deployment Complete!");
  console.log("📋 Contract Addresses:");
  console.log("DIRT Token:", await dirtToken.getAddress());
  console.log("Seed NFT:", await seedNFT.getAddress());
  console.log("Farming Contract:", await farmingContract.getAddress());
  
  console.log("\n🔗 Next Steps:");
  console.log("1. Update frontend with contract addresses");
  console.log("2. Test minting seeds with DIRT");
  console.log("3. Test planting and growing mechanics");
  console.log("4. Deploy to production when ready");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
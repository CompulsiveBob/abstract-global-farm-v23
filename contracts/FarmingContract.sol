// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SeedNFT.sol";
import "./DIRTToken.sol";

contract FarmingContract is Ownable {
    // Contract addresses
    SeedNFT public seedNFT;
    DIRTToken public dirtToken;
    
    // Plant data
    struct Plant {
        uint256 plotId;
        uint256 health;
        uint256 plantedAt;
        uint256 lastInteraction;
        uint256 plantedSeedId;
        string plantType;
        string rarity;
        string emoji;
        bool isHarvested;
    }
    
    struct Interaction {
        uint256 day;
        string action; // "water", "prune", "sing"
        string outcome; // "positive", "negative", "neutral"
    }
    
    // User's plants
    mapping(address => mapping(uint256 => Plant)) public userPlants; // user => plotId => Plant
    mapping(address => mapping(uint256 => mapping(uint256 => Interaction))) public plantInteractions; // user => plotId => day => Interaction
    
    // Plant growth time (7 days in seconds for testing)
    uint256 public constant GROWTH_TIME = 7 days;
    
    // Interaction cooldown (1 day in seconds for testing)
    uint256 public constant INTERACTION_COOLDOWN = 1 days;
    
    constructor(address _seedNFT, address _dirtToken) Ownable(msg.sender) {
        seedNFT = SeedNFT(_seedNFT);
        dirtToken = DIRTToken(_dirtToken);
    }
    
    // Plant a seed NFT
    function plantSeed(uint256 seedId, uint256 plotId) external {
        require(plotId >= 1 && plotId <= 6, "Invalid plot ID");
        require(!isPlotOccupied(msg.sender, plotId), "Plot already occupied");
        require(seedNFT.ownerOf(seedId) == msg.sender, "Not owner of seed");
        
        // Get seed metadata
        (string memory seedType, string memory rarity, string memory emoji, bool isPlanted, , ) = seedNFT.seedMetadata(seedId);
        require(!isPlanted, "Seed already planted");
        
        // Mark seed as planted in SeedNFT contract
        seedNFT.plantSeed(seedId, plotId);
        
        // Create plant
        userPlants[msg.sender][plotId] = Plant({
            plotId: plotId,
            health: 50, // Starting health
            plantedAt: block.timestamp,
            lastInteraction: 0,
            plantedSeedId: seedId,
            plantType: seedType,
            rarity: rarity,
            emoji: emoji,
            isHarvested: false
        });
    }
    
    // Interact with plant (water, prune, sing)
    function interactWithPlant(uint256 plotId, string memory action) external {
        require(isPlotOccupied(msg.sender, plotId), "Plot not occupied");
        Plant storage plant = userPlants[msg.sender][plotId];
        require(!plant.isHarvested, "Plant already harvested");
        require(block.timestamp - plant.lastInteraction >= INTERACTION_COOLDOWN, "Interaction cooldown");
        
        // Calculate days since planted
        uint256 daysSincePlanted = (block.timestamp - plant.plantedAt) / 1 days;
        
        // Check if interaction already done today
        require(plantInteractions[msg.sender][plotId][daysSincePlanted].day == 0, "Already interacted today");
        
        // Generate random outcome
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, action, plotId)));
        string memory outcome = _determineOutcome(random);
        int256 healthChange = _calculateHealthChange(outcome);
        
        // Update plant health
        plant.health = uint256(int256(plant.health) + healthChange);
        plant.lastInteraction = block.timestamp;
        
        // Record interaction
        plantInteractions[msg.sender][plotId][daysSincePlanted] = Interaction({
            day: daysSincePlanted,
            action: action,
            outcome: outcome
        });
    }
    
    // Harvest plant (mint placeholder NFT)
    function harvestPlant(uint256 plotId) external {
        require(isPlotOccupied(msg.sender, plotId), "Plot not occupied");
        Plant storage plant = userPlants[msg.sender][plotId];
        require(!plant.isHarvested, "Plant already harvested");
        
        // Check if plant is ready for harvest (7 days)
        require(block.timestamp - plant.plantedAt >= GROWTH_TIME, "Plant not ready for harvest");
        
        // Mark as harvested
        plant.isHarvested = true;
        
        // Mint placeholder plant NFT (simplified for now)
        // In production, this would mint a real plant NFT
        emit PlantHarvested(msg.sender, plotId, plant.plantType, plant.rarity, plant.health);
    }
    
    // Check if plot is occupied
    function isPlotOccupied(address user, uint256 plotId) public view returns (bool) {
        return userPlants[user][plotId].plantedAt > 0 && !userPlants[user][plotId].isHarvested;
    }
    
    // Get plant data
    function getPlant(address user, uint256 plotId) external view returns (Plant memory) {
        return userPlants[user][plotId];
    }
    
    // Get plant interactions for a day
    function getPlantInteraction(address user, uint256 plotId, uint256 day) external view returns (Interaction memory) {
        return plantInteractions[user][plotId][day];
    }
    
    // Determine interaction outcome
    function _determineOutcome(uint256 random) internal pure returns (string memory) {
        uint256 rand = random % 100;
        if (rand < 40) {
            return "positive";
        } else if (rand < 70) {
            return "neutral";
        } else {
            return "negative";
        }
    }
    
    // Calculate health change based on outcome
    function _calculateHealthChange(string memory outcome) internal pure returns (int256) {
        if (keccak256(bytes(outcome)) == keccak256(bytes("positive"))) {
            return 10;
        } else if (keccak256(bytes(outcome)) == keccak256(bytes("negative"))) {
            return -5;
        } else {
            return 0;
        }
    }
    
    // Get user's plants
    function getUserPlants(address user) external view returns (Plant[] memory) {
        Plant[] memory plants = new Plant[](6);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= 6; i++) {
            if (isPlotOccupied(user, i)) {
                plants[count] = userPlants[user][i];
                count++;
            }
        }
        
        // Resize array to actual count
        Plant[] memory result = new Plant[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = plants[i];
        }
        
        return result;
    }
    
    // Events
    event PlantHarvested(address indexed user, uint256 plotId, string plantType, string rarity, uint256 health);
} 
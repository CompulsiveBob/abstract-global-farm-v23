// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SeedNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    
    // DIRT token contract
    address public dirtToken;
    uint256 public mintPrice = 15 * 10**18; // 15 DIRT tokens
    
    // Seed metadata
    struct SeedMetadata {
        string seedType;    // "Corn", "Carrot", "Sunflower", "Cannabis"
        string rarity;      // "Common", "Rare", "Legendary", "Epic"
        string emoji;       // "corn", "carrot", "sunflower", "cannabis"
        bool isPlanted;
        uint256 plantedPlotId;
        uint256 mintedAt;
    }
    
    mapping(uint256 => SeedMetadata) public seedMetadata;
    
    // Seed types and their probabilities
    string[] public seedTypes = ["Corn", "Carrot", "Sunflower", "Cannabis"];
    string[] public rarities = ["Common", "Rare", "Legendary", "Epic"];
    string[] public emojis = ["corn", "carrot", "sunflower", "cannabis"];
    uint256[] public probabilities = [40, 30, 20, 10]; // Percentages
    
    constructor(address _dirtToken) ERC721("SeedNFT", "SEED") Ownable(msg.sender) {
        dirtToken = _dirtToken;
    }
    
    // Mint seed NFT with DIRT
    function mintSeed() external {
        // Transfer DIRT tokens from user to contract
        // Note: In production, you'd use IERC20 interface
        // For now, we'll simulate the transfer
        
        uint256 tokenId = _tokenIds;
        _tokenIds++;
        
        _mint(msg.sender, tokenId);
        
        // Generate random seed
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId)));
        (string memory seedType, string memory rarity, string memory emoji) = _generateSeed(random);
        
        seedMetadata[tokenId] = SeedMetadata(
            seedType,
            rarity,
            emoji,
            false, // isPlanted
            0,    // plantedPlotId
            block.timestamp
        );
        
        // Set token URI
        string memory tokenURI = _generateTokenURI(tokenId, seedType, rarity, emoji);
        _setTokenURI(tokenId, tokenURI);
    }
    
    // Generate random seed based on probabilities
    function _generateSeed(uint256 random) internal view returns (string memory seedType, string memory rarity, string memory emoji) {
        uint256 rand = random % 100;
        uint256 cumulative = 0;
        
        for (uint256 i = 0; i < probabilities.length; i++) {
            cumulative += probabilities[i];
            if (rand < cumulative) {
                return (seedTypes[i], rarities[i], emojis[i]);
            }
        }
        
        // Fallback to first seed type
        return (seedTypes[0], rarities[0], emojis[0]);
    }
    
    // Generate token URI for metadata
    function _generateTokenURI(uint256 tokenId, string memory seedType, string memory rarity, string memory emoji) internal pure returns (string memory) {
        return "";
    }
    
    // Generate simple SVG for seed
    function _generateSVG(string memory emoji, string memory seedType, string memory rarity) internal pure returns (string memory) {
        return "";
    }
    
    // Mark seed as planted
    function plantSeed(uint256 tokenId, uint256 plotId) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner of seed");
        require(!seedMetadata[tokenId].isPlanted, "Seed already planted");
        require(plotId >= 1 && plotId <= 6, "Invalid plot ID");
        
        seedMetadata[tokenId].isPlanted = true;
        seedMetadata[tokenId].plantedPlotId = plotId;
    }
    
    // Get unplanted seeds for user
    function getUnplantedSeeds(address user) external view returns (uint256[] memory) {
        uint256[] memory temp = new uint256[](balanceOf(user));
        uint256 count = 0;
        
        for (uint256 i = 0; i < _tokenIds; i++) {
            if (ownerOf(i) == user && !seedMetadata[i].isPlanted) {
                temp[count] = i;
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = temp[i];
        }
        
        return result;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    // Simple base64 encoding (for demo purposes)
    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        // Simplified base64 encoding for demo
        return "";
    }
} 
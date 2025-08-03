// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DIRTToken is ERC20, Ownable {
    // Staking data
    mapping(address => uint256) public stakedGUGO;
    mapping(address => uint256) public stakedBURR;
    mapping(address => uint256) public lastClaimTime;
    
    // Token addresses (will be set after deployment)
    address public gugoToken;
    address public burrToken;
    
    // Staking rates (per day)
    uint256 public constant GUGO_RATE = 75; // 7500 GUGO = 75 DIRT/day
    uint256 public constant BURR_RATE = 50;  // 5000 BURR = 50 DIRT/day
    
    constructor() ERC20("DIRT", "DIRT") Ownable(msg.sender) {}
    
    // Set token addresses (only owner)
    function setTokenAddresses(address _gugoToken, address _burrToken) external onlyOwner {
        gugoToken = _gugoToken;
        burrToken = _burrToken;
    }
    
    // Stake GUGO tokens
    function stakeGUGO(uint256 amount) external {
        require(gugoToken != address(0), "GUGO token not set");
        require(amount > 0, "Amount must be greater than 0");
        
        // Transfer GUGO tokens to this contract
        // Note: In production, you'd use IERC20 interface
        // For now, we'll simulate the transfer
        
        stakedGUGO[msg.sender] += amount;
        lastClaimTime[msg.sender] = block.timestamp;
    }
    
    // Stake BURR tokens
    function stakeBURR(uint256 amount) external {
        require(burrToken != address(0), "BURR token not set");
        require(amount > 0, "Amount must be greater than 0");
        
        // Transfer BURR tokens to this contract
        // Note: In production, you'd use IERC20 interface
        // For now, we'll simulate the transfer
        
        stakedBURR[msg.sender] += amount;
        lastClaimTime[msg.sender] = block.timestamp;
    }
    
    // Claim DIRT from staking
    function claimDIRT() external {
        uint256 timeDiff = block.timestamp - lastClaimTime[msg.sender];
        require(timeDiff > 0, "No time passed");
        
        // Calculate earnings (simplified for testing)
        uint256 gugoEarnings = (stakedGUGO[msg.sender] * GUGO_RATE * timeDiff) / (7500 * 1 days);
        uint256 burrEarnings = (stakedBURR[msg.sender] * BURR_RATE * timeDiff) / (5000 * 1 days);
        
        uint256 totalEarnings = gugoEarnings + burrEarnings;
        require(totalEarnings > 0, "No earnings to claim");
        
        _mint(msg.sender, totalEarnings);
        lastClaimTime[msg.sender] = block.timestamp;
    }
    
    // Buy DIRT with ETH (0.01 ETH = 50 DIRT)
    function buyDIRTWithETH() external payable {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ETH required");
        uint256 dirtAmount = (msg.value * 50) / 0.01 ether;
        _mint(msg.sender, dirtAmount);
    }
    
    // Mint DIRT (only for testing)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
} 
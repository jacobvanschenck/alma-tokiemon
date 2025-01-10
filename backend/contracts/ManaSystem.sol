// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ManaSystem is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant SPENDER_ROLE = keccak256("SPENDER_ROLE");

    mapping(address => uint256) public userMana;
    mapping(address => uint256) public lifetimeMana;

    event ManaAdded(address indexed user, uint256 amount, uint256 newTotal, uint256 newLifetime);
    event ManaSpent(address indexed user, uint256 amount, uint256 newTotal);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addMana(address user, uint256 amount) external onlyRole(MINTER_ROLE) {
        userMana[user] += amount;
        lifetimeMana[user] += amount;
        emit ManaAdded(user, amount, userMana[user], lifetimeMana[user]);
    }

    function spendMana(address user, uint256 amount) external onlyRole(SPENDER_ROLE) {
        require(userMana[user] >= amount, "Insufficient mana");
        userMana[user] -= amount;
        emit ManaSpent(user, amount, userMana[user]);
    }

    function getMana(address user) external view returns (uint256) {
        return userMana[user];
    }

    function getLifetimeMana(address user) external view returns (uint256) {
        return lifetimeMana[user];
    }
}

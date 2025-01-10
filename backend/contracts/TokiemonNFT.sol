// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ManaSystem.sol";

/// @custom:security-contact tokiemon [at] almalabs.io
contract TokiemonNFT is ERC721, ERC721Enumerable, ERC721Pausable, AccessControl, ERC721Burnable, ERC2981, ReentrancyGuard {
    using Strings for uint256;

    uint16 public constant RARITY_PRECISION = 10000;
    uint96 public constant DEFAULT_ROYALTY_PERCENTAGE = 250;
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;
    uint256[] public activeTiers;
    ManaSystem public manaSystem;
    address public royaltyReceiver;

    struct TokiemonData {
        string communityId;
        string name;
        uint256 purchaseTier;
        Rarity rarity;
        mapping(uint256 => Skill) skills;
    }

    mapping(uint256 => TokiemonData) private _tokiemonData;
    mapping(uint256 => uint8) public skillMaxLevels;
    mapping(uint256 => RarityProbabilities) public tierToRarityProbabilities;

    // Data Type Definitions
    enum Rarity {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary
    }
    struct RarityProbabilities {
        uint16 common;
        uint16 uncommon;
        uint16 rare;
        uint16 epic;
        uint16 legendary;
    }
    struct Skill {
        uint8 level;
        uint32 manaPerLevelMultiplier;
        uint32 manaUntilNextLevel;
        uint256 cumulativeMana;
    }

    event SkillManaApplied(uint256 indexed tokenId, uint256 indexed skillId, uint256 manaAmount, uint8 newLevel, uint256 newMana);
    event TokiemonSkillsUpdated(uint256 indexed tokenId, uint256[] skillIds, Skill[] updatedSkills);
    event NameChanged(uint256 indexed tokenId, string newName);
    event TokiemonMinted(
        uint256 indexed tokenId,
        address indexed to,
        string communityId,
        uint256 purchaseTier,
        Rarity rarity,
        address paymentToken
    );

    constructor(address defaultAdmin, address pauser, address minter) ERC721("Tokiemon", "TOKIE") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _grantRole(MINTER_ROLE, minter);

        royaltyReceiver = defaultAdmin;
        _setDefaultRoyalty(royaltyReceiver, DEFAULT_ROYALTY_PERCENTAGE);

        addRarityProbability(1, RarityProbabilities(6200, 3000, 500, 250, 50));
        addRarityProbability(2, RarityProbabilities(3000, 3800, 2000, 1000, 200));
        addRarityProbability(3, RarityProbabilities(500, 1500, 5000, 2500, 500));

        skillMaxLevels[0] = 99; // Attack
        skillMaxLevels[1] = 99; // Defense
        skillMaxLevels[2] = 99; // Magic
    }

    /*
        VIEW FUNCTIONS
    */

    function _baseURI() internal pure override returns (string memory) {
        return "https://api.tokiemon.io/tokiemon/";
    }

    function getActiveTiers() public view returns (uint256[] memory) {
        return activeTiers;
    }

    function getRarity(uint256 tokenId) public view returns (Rarity) {
        _requireOwned(tokenId);
        return _tokiemonData[tokenId].rarity;
    }

    function getTierRarityProbabilities(uint256 tier) public view returns (uint16, uint16, uint16, uint16, uint16) {
        RarityProbabilities memory probs = tierToRarityProbabilities[tier];
        return (probs.common, probs.uncommon, probs.rare, probs.epic, probs.legendary);
    }

    function _tierExists(uint256 tier) private view returns (bool) {
        return tierToRarityProbabilities[tier].common != 0;
    }

    function getTokiemonSkill(uint256 tokenId, uint256 skillId) public view returns (Skill memory) {
        _requireOwned(tokenId);
        return _tokiemonData[tokenId].skills[skillId];
    }

    function getTokiemonData(
        uint256 tokenId
    ) public view returns (string memory community, string memory name, uint256 purchaseTier, Rarity rarity) {
        _requireOwned(tokenId);
        TokiemonData storage data = _tokiemonData[tokenId];
        return (data.communityId, data.name, data.purchaseTier, data.rarity);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /*
        MINTING LOGIC
    */

    function safeMint(
        address to,
        uint256 tier,
        string memory communityId,
        address paymentToken,
        Skill[] memory initialSkills
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        require(_tierExists(tier), "Invalid tier");
        uint256 tokenId = _nextTokenId++;

        TokiemonData storage newTokiemon = _tokiemonData[tokenId];
        newTokiemon.communityId = communityId;
        newTokiemon.name = string(abi.encodePacked("Tokiemon #", tokenId.toString()));
        newTokiemon.purchaseTier = tier;
        newTokiemon.rarity = _determineRarity(tier);

        // Set initial skills
        for (uint256 i = 0; i < initialSkills.length; i++) {
            newTokiemon.skills[i] = initialSkills[i];
        }

        _safeMint(to, tokenId);

        emit TokiemonMinted(tokenId, to, communityId, tier, newTokiemon.rarity, paymentToken);

        return tokenId;
    }

    // Minimal rarity function. Choosing not to implement advanced randomness for now, since these NFTs are for entertainment purposes only :)
    function _determineRarity(uint256 purchaseTier) private view returns (Rarity) {
        RarityProbabilities memory probs = tierToRarityProbabilities[purchaseTier];
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, _nextTokenId, msg.sender))) %
            RARITY_PRECISION;

        uint256 cumulativeProbability = 0;
        if (randomNumber < (cumulativeProbability += probs.common)) return Rarity.Common;
        if (randomNumber < (cumulativeProbability += probs.uncommon)) return Rarity.Uncommon;
        if (randomNumber < (cumulativeProbability += probs.rare)) return Rarity.Rare;
        if (randomNumber < (cumulativeProbability += probs.epic)) return Rarity.Epic;
        return Rarity.Legendary;
    }

    /*
        LEVELING LOGIC
    */
    function levelUpSkill(uint256 tokenId, uint256 skillId, uint256 manaAmount) public nonReentrant {
        require(msg.sender == ownerOf(tokenId), "Only owner can level up skills");
        require(manaSystem.getMana(msg.sender) >= manaAmount, "Insufficient mana");

        Skill storage skill = _tokiemonData[tokenId].skills[skillId];
        require(skill.level < skillMaxLevels[skillId], "Skill already at maximum level");

        manaSystem.spendMana(msg.sender, manaAmount);

        uint8 newLevel = skill.level;
        skill.cumulativeMana += manaAmount;

        uint256 surplusMana = calculateAnyLevelCost(tokenId, skillId, newLevel + 1) - skill.manaUntilNextLevel;
        uint256 manaAvailable = manaAmount + surplusMana;

        while (manaAvailable >= calculateAnyLevelCost(tokenId, skillId, newLevel + 1) && newLevel < skillMaxLevels[skillId]) {
            uint256 levelCost = calculateAnyLevelCost(tokenId, skillId, newLevel + 1);
            manaAvailable -= levelCost;
            newLevel++;
        }

        skill.level = newLevel;
        skill.manaUntilNextLevel = uint32(calculateAnyLevelCost(tokenId, skillId, newLevel + 1) - manaAvailable);

        emit SkillManaApplied(tokenId, skillId, manaAmount, newLevel, skill.manaUntilNextLevel);
    }

    function calculateAnyLevelCost(uint256 tokenId, uint256 skillId, uint8 level) public view returns (uint256) {
        Skill memory skill = _tokiemonData[tokenId].skills[skillId];
        return uint256(skill.manaPerLevelMultiplier) * uint256(level);
    }

    // get total mana required to level up to a certain level
    function getCumulativeManaRequiredToLevelUp(uint256 tokenId, uint256 skillId, uint8 level) public view returns (uint256) {
        uint256 totalMana = 0;
        Skill memory skill = _tokiemonData[tokenId].skills[skillId];

        for (uint8 i = skill.level + 1; i <= level; i++) {
            totalMana += i * skill.manaPerLevelMultiplier;
        }
        return totalMana;
    }

    function getNextLevelDelta(uint256 tokenId, uint256 skillId) public view returns (uint32) {
        Skill memory skill = _tokiemonData[tokenId].skills[skillId];
        return skill.manaUntilNextLevel;
    }

    /*
        TOKEN OWNER FUNCTIONS
    */
    function changeName(uint256 tokenId, string memory newName) public {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can change name");
        _tokiemonData[tokenId].name = newName;
        emit NameChanged(tokenId, newName);
    }

    /*
        ADMIN LOGIC
    */
    function addRarityProbability(uint256 tier, RarityProbabilities memory probs) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!_tierExists(tier), "Tier already exists");
        require(
            probs.common + probs.uncommon + probs.rare + probs.epic + probs.legendary == RARITY_PRECISION,
            "Probabilities must sum to 10000"
        );
        tierToRarityProbabilities[tier] = probs;
        activeTiers.push(tier);
    }

    function updateRarityProbability(uint256 tier, RarityProbabilities memory probs) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_tierExists(tier), "Tier does not exist");
        require(
            probs.common + probs.uncommon + probs.rare + probs.epic + probs.legendary == RARITY_PRECISION,
            "Probabilities must sum to 10000"
        );
        tierToRarityProbabilities[tier] = probs;
    }

    function removeRarityProbability(uint256 tier) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_tierExists(tier), "Tier does not exist");
        for (uint256 i = 0; i < activeTiers.length; i++) {
            if (activeTiers[i] == tier) {
                activeTiers[i] = activeTiers[activeTiers.length - 1];
                activeTiers.pop();
                break;
            }
        }
        delete tierToRarityProbabilities[tier];
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setManaSystem(address _manaSystem) external onlyRole(DEFAULT_ADMIN_ROLE) {
        manaSystem = ManaSystem(_manaSystem);
    }

    function updateSkillMaxLevel(uint256 skillId, uint8 newMaxLevel) external onlyRole(DEFAULT_ADMIN_ROLE) {
        skillMaxLevels[skillId] = newMaxLevel;
    }

    function setRoyaltyInfo(address receiver, uint96 feeNumerator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setDefaultRoyalty(receiver, feeNumerator);
        royaltyReceiver = receiver;
    }

    function updateTokiemonSkills(
        uint256 tokenId,
        uint256[] memory skillIds,
        Skill[] memory updatedSkills
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(skillIds.length == updatedSkills.length, "Skill IDs and updated skills must have the same length");
        _requireOwned(tokenId);

        for (uint256 i = 0; i < skillIds.length; i++) {
            uint256 skillId = skillIds[i];
            Skill memory updatedSkill = updatedSkills[i];

            require(updatedSkill.level <= skillMaxLevels[skillId], "Skill level exceeds maximum");

            _tokiemonData[tokenId].skills[skillId] = updatedSkill;
        }

        emit TokiemonSkillsUpdated(tokenId, skillIds, updatedSkills);
    }

    /* Solidity Required Overrides */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, AccessControl, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

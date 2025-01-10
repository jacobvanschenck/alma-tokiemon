export const tokiemonAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "defaultAdmin",
				type: "address",
			},
			{
				internalType: "address",
				name: "pauser",
				type: "address",
			},
			{
				internalType: "address",
				name: "minter",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "AccessControlBadConfirmation",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				internalType: "bytes32",
				name: "neededRole",
				type: "bytes32",
			},
		],
		name: "AccessControlUnauthorizedAccount",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "numerator",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "denominator",
				type: "uint256",
			},
		],
		name: "ERC2981InvalidDefaultRoyalty",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
		],
		name: "ERC2981InvalidDefaultRoyaltyReceiver",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "numerator",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "denominator",
				type: "uint256",
			},
		],
		name: "ERC2981InvalidTokenRoyalty",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
		],
		name: "ERC2981InvalidTokenRoyaltyReceiver",
		type: "error",
	},
	{
		inputs: [],
		name: "ERC721EnumerableForbiddenBatchMint",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "ERC721IncorrectOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "ERC721InsufficientApproval",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "approver",
				type: "address",
			},
		],
		name: "ERC721InvalidApprover",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address",
			},
		],
		name: "ERC721InvalidOperator",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "ERC721InvalidOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
		],
		name: "ERC721InvalidReceiver",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "ERC721InvalidSender",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "ERC721NonexistentToken",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "ERC721OutOfBoundsIndex",
		type: "error",
	},
	{
		inputs: [],
		name: "EnforcedPause",
		type: "error",
	},
	{
		inputs: [],
		name: "ExpectedPause",
		type: "error",
	},
	{
		inputs: [],
		name: "ReentrancyGuardReentrantCall",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "newName",
				type: "string",
			},
		],
		name: "NameChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "manaAmount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "newLevel",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newMana",
				type: "uint256",
			},
		],
		name: "SkillManaApplied",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "communityId",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "purchaseTier",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "enum TokiemonNFT.Rarity",
				name: "rarity",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "address",
				name: "paymentToken",
				type: "address",
			},
		],
		name: "TokiemonMinted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256[]",
				name: "skillIds",
				type: "uint256[]",
			},
			{
				components: [
					{
						internalType: "uint8",
						name: "level",
						type: "uint8",
					},
					{
						internalType: "uint32",
						name: "manaPerLevelMultiplier",
						type: "uint32",
					},
					{
						internalType: "uint32",
						name: "manaUntilNextLevel",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "cumulativeMana",
						type: "uint256",
					},
				],
				indexed: false,
				internalType: "struct TokiemonNFT.Skill[]",
				name: "updatedSkills",
				type: "tuple[]",
			},
		],
		name: "TokiemonSkillsUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "DEFAULT_ROYALTY_PERCENTAGE",
		outputs: [
			{
				internalType: "uint96",
				name: "",
				type: "uint96",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "MINTER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "PAUSER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "RARITY_PRECISION",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "activeTiers",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tier",
				type: "uint256",
			},
			{
				components: [
					{
						internalType: "uint16",
						name: "common",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "uncommon",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "rare",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "epic",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "legendary",
						type: "uint16",
					},
				],
				internalType: "struct TokiemonNFT.RarityProbabilities",
				name: "probs",
				type: "tuple",
			},
		],
		name: "addRarityProbability",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
			{
				internalType: "uint8",
				name: "level",
				type: "uint8",
			},
		],
		name: "calculateAnyLevelCost",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "newName",
				type: "string",
			},
		],
		name: "changeName",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getActiveTiers",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
			{
				internalType: "uint8",
				name: "level",
				type: "uint8",
			},
		],
		name: "getCumulativeManaRequiredToLevelUp",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
		],
		name: "getNextLevelDelta",
		outputs: [
			{
				internalType: "uint32",
				name: "",
				type: "uint32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "getRarity",
		outputs: [
			{
				internalType: "enum TokiemonNFT.Rarity",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tier",
				type: "uint256",
			},
		],
		name: "getTierRarityProbabilities",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "getTokiemonData",
		outputs: [
			{
				internalType: "string",
				name: "community",
				type: "string",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "purchaseTier",
				type: "uint256",
			},
			{
				internalType: "enum TokiemonNFT.Rarity",
				name: "rarity",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
		],
		name: "getTokiemonSkill",
		outputs: [
			{
				components: [
					{
						internalType: "uint8",
						name: "level",
						type: "uint8",
					},
					{
						internalType: "uint32",
						name: "manaPerLevelMultiplier",
						type: "uint32",
					},
					{
						internalType: "uint32",
						name: "manaUntilNextLevel",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "cumulativeMana",
						type: "uint256",
					},
				],
				internalType: "struct TokiemonNFT.Skill",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "address",
				name: "operator",
				type: "address",
			},
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "manaAmount",
				type: "uint256",
			},
		],
		name: "levelUpSkill",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "manaSystem",
		outputs: [
			{
				internalType: "contract ManaSystem",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "pause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tier",
				type: "uint256",
			},
		],
		name: "removeRarityProbability",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "callerConfirmation",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "salePrice",
				type: "uint256",
			},
		],
		name: "royaltyInfo",
		outputs: [
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "royaltyReceiver",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tier",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "communityId",
				type: "string",
			},
			{
				internalType: "address",
				name: "paymentToken",
				type: "address",
			},
			{
				components: [
					{
						internalType: "uint8",
						name: "level",
						type: "uint8",
					},
					{
						internalType: "uint32",
						name: "manaPerLevelMultiplier",
						type: "uint32",
					},
					{
						internalType: "uint32",
						name: "manaUntilNextLevel",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "cumulativeMana",
						type: "uint256",
					},
				],
				internalType: "struct TokiemonNFT.Skill[]",
				name: "initialSkills",
				type: "tuple[]",
			},
		],
		name: "safeMint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes",
			},
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_manaSystem",
				type: "address",
			},
		],
		name: "setManaSystem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint96",
				name: "feeNumerator",
				type: "uint96",
			},
		],
		name: "setRoyaltyInfo",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "skillMaxLevels",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "tierToRarityProbabilities",
		outputs: [
			{
				internalType: "uint16",
				name: "common",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "uncommon",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "rare",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "epic",
				type: "uint16",
			},
			{
				internalType: "uint16",
				name: "legendary",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "tokenByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "tokenOfOwnerByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "unpause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tier",
				type: "uint256",
			},
			{
				components: [
					{
						internalType: "uint16",
						name: "common",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "uncommon",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "rare",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "epic",
						type: "uint16",
					},
					{
						internalType: "uint16",
						name: "legendary",
						type: "uint16",
					},
				],
				internalType: "struct TokiemonNFT.RarityProbabilities",
				name: "probs",
				type: "tuple",
			},
		],
		name: "updateRarityProbability",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "skillId",
				type: "uint256",
			},
			{
				internalType: "uint8",
				name: "newMaxLevel",
				type: "uint8",
			},
		],
		name: "updateSkillMaxLevel",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256[]",
				name: "skillIds",
				type: "uint256[]",
			},
			{
				components: [
					{
						internalType: "uint8",
						name: "level",
						type: "uint8",
					},
					{
						internalType: "uint32",
						name: "manaPerLevelMultiplier",
						type: "uint32",
					},
					{
						internalType: "uint32",
						name: "manaUntilNextLevel",
						type: "uint32",
					},
					{
						internalType: "uint256",
						name: "cumulativeMana",
						type: "uint256",
					},
				],
				internalType: "struct TokiemonNFT.Skill[]",
				name: "updatedSkills",
				type: "tuple[]",
			},
		],
		name: "updateTokiemonSkills",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;

export const marketplaceAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_tokiemon",
				type: "address",
			},
			{
				internalType: "address",
				name: "_devWallet",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_devFeePercentage",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "listingPrice",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "IncorrectValueSent",
		type: "error",
	},
	{
		inputs: [],
		name: "MarketplaceNotApproved",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "OnlyTokiemonOwner",
		type: "error",
	},
	{
		inputs: [],
		name: "ReentrancyGuardReentrantCall",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "TokiemonNotListed",
		type: "error",
	},
	{
		inputs: [],
		name: "ZeroAddressNotAllowed",
		type: "error",
	},
	{
		inputs: [],
		name: "ZeroPriceNotAllowed",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "seller",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Cancelled",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "seller",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "Listed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "buyer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "Sold",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "buyToken",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "cancelListing",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "devFeePercentage",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "devWallet",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllListings",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "seller",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
				],
				internalType: "struct TokiemonMarketplace.Listing[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "getListing",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "seller",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
				],
				internalType: "struct TokiemonMarketplace.Listing",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "listToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "listingById",
		outputs: [
			{
				internalType: "address",
				name: "seller",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "tokiemon",
		outputs: [
			{
				internalType: "contract IERC721",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
] as const;

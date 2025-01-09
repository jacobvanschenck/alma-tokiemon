import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
	solidity: "0.8.28",
	networks: {
		base: {
			url: "https://mainnet.base.org",
		},
		hardhat: {
			forking: {
				url: "https://mainnet.base.org",
			},
		},
	},
};

export default config;

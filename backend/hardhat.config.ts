import { type HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";

const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const BASESCAN_API_KEY = vars.get("BASESCAN_API_KEY");

const config: HardhatUserConfig = {
	solidity: "0.8.28",
	networks: {
		base: {
			url: "https://mainnet.base.org",
			accounts: [PRIVATE_KEY],
		},
		hardhat: {
			forking: {
				url: "https://mainnet.base.org",
			},
		},
	},
	etherscan: {
		apiKey: { base: BASESCAN_API_KEY },
	},
};

export default config;

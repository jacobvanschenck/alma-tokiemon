import hre, { viem } from "hardhat";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";

const DEPLOYER_ADDRESS = "0x4ef8a935292339553e1799a0bbaa25d3ba38f096";

async function main() {
	console.log(
		`\n====================Check Balances: ${hre.network.name}====================\n\n`,
	);

	console.log("__________Init\n");
	const pubClient = await viem.getPublicClient();

	console.log("\n__________Check Balance\n");
	console.log(
		"Deployer balance: ",
		await pubClient.getBalance({ address: DEPLOYER_ADDRESS }),
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

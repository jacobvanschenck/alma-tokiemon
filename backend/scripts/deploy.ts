import hre, { viem } from "hardhat";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";
import { type Address, getContract } from "viem";

const TOKIEMON_ADDRESS =
	"0x802187c392b15CDC8df8Aa05bFeF314Df1f65C62" as Address;

async function main() {
	console.log(
		`\n====================Deploy: ${hre.network.name}====================\n\n`,
	);

	console.log("__________Init\n");
	const pubClient = await viem.getPublicClient();
	const [deployer] = await viem.getWalletClients();

	const marketplace = await hre.viem.deployContract("TokiemonMarketplace", [
		TOKIEMON_ADDRESS,
		deployer.account.address,
		500n,
	]);

	console.log("\n__________Check Deployment\n");
	console.log(`Marketplace deployed to: ${marketplace.address}`);
	console.log(`\tTokiemon: ${await marketplace.read.tokiemon()}`);
	console.log(`\tDev wallet: ${await marketplace.read.devWallet()}`);
	console.log(
		`\tDev percentage point: ${await marketplace.read.devFeePercentage()}`,
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

import hre, { viem } from "hardhat";
import { vars } from "hardhat/config";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";
import { type Address, formatEther, getContract, parseEther } from "viem";
import { waitForTransactionReceipt } from "viem/_types/actions/public/waitForTransactionReceipt";
import { privateKeyToAccount } from "viem/accounts";

const MARKETPLACE_ADDRESS =
	"0x03fc1d23bdcf9451e70ce8aec80b214995cb0404" as Address;

const TOKIEMON_ADDRESS =
	"0x802187c392b15CDC8df8Aa05bFeF314Df1f65C62" as Address;

async function main() {
	console.log(
		`\n====================List: ${hre.network.name}====================\n\n`,
	);

	console.log("__________Init\n");
	const pubClient = await viem.getPublicClient();

	const user = privateKeyToAccount(`Ox${vars.get("PRIVATE_KEY")}` as Address);

	console.log(`User Account: ${user.address}`);

	const marketplace = await hre.viem.getContractAt(
		"TokiemonMarketplace",
		MARKETPLACE_ADDRESS,
	);

	console.log("\n__________Check Deployment\n");
	console.log(`Marketplace deployed to: ${marketplace.address}`);
	console.log(`\tTokiemon: ${await marketplace.read.tokiemon()}`);
	console.log(`\tDev wallet: ${await marketplace.read.devWallet()}`);
	console.log(
		`\tDev percentage point: ${await marketplace.read.devFeePercentage()}`,
	);

	console.log("\n__________List Tokiemon\n");
	const hash = await marketplace.write.cancelListing([45221n], {
		account: user,
	});
	await pubClient.waitForTransactionReceipt({ hash });

	const listing = await marketplace.read.getListing([45221n]);

	console.log(`Listing seller: ${listing.seller}`);
	console.log(`Listing price: ${formatEther(listing.price)}ETH`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

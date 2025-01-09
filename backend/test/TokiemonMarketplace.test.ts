import {
	time,
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { type Address, getAddress, parseEther, zeroAddress } from "viem";

describe("TokiemonMarketplace", () => {
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.
	async function deployMarketplace() {
		// Contracts are deployed using the first signer/account by default
		const [owner, seller, buyer, dev] = await hre.viem.getWalletClients();

		const tokiemon = await hre.viem.deployContract("TokiemonMock", [
			owner.account.address,
		]);

		const marketplace = await hre.viem.deployContract("TokiemonMarketplace", [
			tokiemon.address,
			dev.account.address,
			500n,
		]);

		const publicClient = await hre.viem.getPublicClient();

		await tokiemon.write.safeMint([seller.account.address]);
		await tokiemon.write.safeMint([buyer.account.address]);
		await tokiemon.write.setApprovalForAll([marketplace.address, true], {
			account: seller.account,
		});

		return {
			marketplace,
			tokiemon,
			owner,
			seller,
			buyer,
			dev,
			publicClient,
		};
	}

	describe("Listing", () => {
		it("Should allow a user to list a tokiemon", async () => {
			const { marketplace, seller } = await loadFixture(deployMarketplace);

			await marketplace.write.listToken([0n, parseEther("1")], {
				account: seller.account,
			});

			const listing = await marketplace.read.listings([0n]);

			expect(listing[0]).to.equal(getAddress(seller.account.address));
			expect(listing[1]).to.equal(parseEther("1"));
		});

		it("Should not allow a price of 0", async () => {
			const { marketplace, seller } = await loadFixture(deployMarketplace);

			await expect(
				marketplace.write.listToken([0n, parseEther("0")], {
					account: seller.account,
				}),
			).to.be.rejectedWith("ZeroPriceNotAllowed");
		});

		it("Should not allow another user to list", async () => {
			const { marketplace, buyer } = await loadFixture(deployMarketplace);

			await expect(
				marketplace.write.listToken([0n, parseEther("1")], {
					account: buyer.account,
				}),
			).to.be.rejectedWith("OnlyTokiemonOwner");
		});

		it("Should not allow a listing if marketplace is unapproved", async () => {
			const { marketplace, buyer } = await loadFixture(deployMarketplace);

			await expect(
				marketplace.write.listToken([1n, parseEther("1")], {
					account: buyer.account,
				}),
			).to.be.rejectedWith("MarketplaceNotApproved");
		});
	});

	describe("Canceling ", () => {
		it("Should allow a user to cancel a listing", async () => {
			const { marketplace, seller } = await loadFixture(deployMarketplace);

			await marketplace.write.listToken([0n, parseEther("1")], {
				account: seller.account,
			});

			await marketplace.write.cancelListing([0n], {
				account: seller.account,
			});

			const listing = await marketplace.read.listings([0n]);

			expect(listing[0]).to.equal(zeroAddress);
			expect(listing[1]).to.equal(0n);
		});

		it("Should not allow a user cancel unlisted tokiemon", async () => {
			const { marketplace, seller } = await loadFixture(deployMarketplace);

			await expect(
				marketplace.write.cancelListing([0n], {
					account: seller.account,
				}),
			).to.be.rejectedWith("TokiemonNotListed");
		});

		it("Should not allow another user to cancel a listing", async () => {
			const { marketplace, seller, buyer } =
				await loadFixture(deployMarketplace);

			await marketplace.write.listToken([0n, parseEther("1")], {
				account: seller.account,
			});

			await expect(
				marketplace.write.listToken([0n, parseEther("1")], {
					account: buyer.account,
				}),
			).to.be.rejectedWith("OnlyTokiemonOwner");
		});
	});

	describe("Buying ", () => {
		it("Should allow a user to buy a listing", async () => {
			const { marketplace, tokiemon, seller, buyer } =
				await loadFixture(deployMarketplace);

			expect(await tokiemon.read.ownerOf([0n])).to.equal(
				getAddress(seller.account.address),
			);

			await marketplace.write.listToken([0n, parseEther("1")], {
				account: seller.account,
			});

			await marketplace.write.buyToken([0n], {
				account: buyer.account,
				value: parseEther("1"),
			});

			const listing = await marketplace.read.listings([0n]);

			expect(listing[0]).to.equal(zeroAddress);
			expect(listing[1]).to.equal(0n);

			expect(await tokiemon.read.ownerOf([0n])).to.equal(
				getAddress(buyer.account.address),
			);
		});

		it("Should transfer funds to dev wallet", async () => {
			const { marketplace, seller, buyer, dev, publicClient } =
				await loadFixture(deployMarketplace);

			const balance = await publicClient.getBalance({
				address: dev.account.address,
			});

			await marketplace.write.listToken([0n, parseEther("1")], {
				account: seller.account,
			});

			await marketplace.write.buyToken([0n], {
				account: buyer.account,
				value: parseEther("1"),
			});

			const updatedBalance = await publicClient.getBalance({
				address: dev.account.address,
			});

			expect(updatedBalance - balance).to.equal(parseEther("0.05"));
		});

		it("Should not allow a user to buy a listing that does not exist", async () => {
			const { marketplace, seller, buyer } =
				await loadFixture(deployMarketplace);

			await expect(
				marketplace.write.buyToken([0n], {
					account: buyer.account,
					value: parseEther("1"),
				}),
			).to.be.rejectedWith("TokiemonNotListed");
		});

		it("Should not allow a user to buy a listing with incorrect value", async () => {
			const { marketplace, seller, buyer } =
				await loadFixture(deployMarketplace);

			await marketplace.write.listToken([0n, parseEther("10")], {
				account: seller.account,
			});

			await expect(
				marketplace.write.buyToken([0n], {
					account: buyer.account,
					value: parseEther("1"),
				}),
			).to.be.rejectedWith("IncorrectValueSent");

			await expect(
				marketplace.write.buyToken([0n], {
					account: buyer.account,
					value: parseEther("11"),
				}),
			).to.be.rejectedWith("IncorrectValueSent");
		});
	});
});

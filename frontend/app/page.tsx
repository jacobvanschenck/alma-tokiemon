"use client";

import NFTListing from "@/components/NFTListing";
import { Button } from "@/components/ui/button";
import useAllListings from "@/hooks/useAllListings";
import useUserTokiemon from "@/hooks/useUserTokiemon";
import { type Address, formatEther } from "viem";
import { useAccount, useConnect } from "wagmi";

export type Listing = {
	seller?: Address;
	price?: bigint;
	tokenId: bigint;
};

export default function Page() {
	const { isConnected } = useAccount();

	const { data: allListings } = useAllListings();
	const { data: userListings } = useUserTokiemon();

	const handleBuy = (nft: Listing) => {
		if (isConnected) {
			// Implement actual buy logic here
			alert(`Buying ${nft.tokenId} for ${nft.price} ETH`);
		} else {
			alert("Please connect your wallet to buy this Tokiemon");
		}
	};

	const handleList = (nft: Listing) => {
		if (isConnected) {
			// Implement actual buy logic here
			alert(`Listing ${nft.tokenId} for ${formatEther(nft.price ?? 0n)} ETH`);
		}
	};

	const handleCancel = (nft: Listing) => {
		if (isConnected) {
			// Implement actual buy logic here
			alert(`Canceling ${nft.tokenId} for ${formatEther(nft.price ?? 0n)} ETH`);
		}
	};

	return (
		<div className="space-y-8">
			{isConnected && userListings && userListings.length > 0 && (
				<section className="p-4 bg-gb-dark pixel-borders">
					<h2 className="mb-4 text-2xl font-bold text-gb-lightest">
						Your Listed Tokiemon NFTs
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{allListings?.map((nft, index) => (
							<NFTListing
								key={nft.tokenId}
								id={nft.tokenId}
								price={nft.price}
								seller={nft.seller}
								cta={nft.price ? "Cancel Listing" : "List"}
								action={() => {
									if (nft.price) {
										handleCancel(nft);
									} else {
										handleList(nft);
									}
								}}
							/>
						))}
					</div>
				</section>
			)}

			<section className="p-4 bg-gb-dark pixel-borders">
				<h2 className="mb-4 text-2xl font-bold text-gb-lightest">
					All Listed Tokiemon NFTs
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{allListings?.map((nft) => (
						<NFTListing
							key={nft.tokenId}
							id={nft.tokenId}
							price={nft.price}
							seller={nft.seller}
							cta={"Buy Now"}
							action={() => handleBuy(nft)}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

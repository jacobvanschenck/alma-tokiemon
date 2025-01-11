"use client";

import NFTListing from "@/components/NFTListing";
import { Button } from "@/components/ui/button";
import useAllListings from "@/hooks/useAllListings";
import useUserTokiemon from "@/hooks/useUserTokiemon";
import { type Address, formatEther } from "viem";
import { useAccount, useConnect, useWriteContract } from "wagmi";

export type Listing = {
	seller?: Address;
	price?: bigint;
	tokenId: bigint;
	isListed: boolean;
};

export default function Page() {
	const { isConnected } = useAccount();

	const { data: allListings } = useAllListings();
	const { data: userListings } = useUserTokiemon();

	return (
		<div className="space-y-8">
			{isConnected && userListings && userListings.length > 0 && (
				<section className="p-4 bg-gb-dark pixel-borders">
					<h2 className="mb-4 text-2xl font-bold text-gb-lightest">
						Your Listed Tokiemon NFTs
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 min-h-72">
						{userListings?.map(
							(nft, index) =>
								!!nft && (
									<NFTListing
										key={nft.tokenId}
										nft={nft}
										isOwner={true}
										isListed={!!nft.isListed}
									/>
								),
						)}
					</div>
				</section>
			)}

			{!!allListings && allListings.length > 0 && (
				<section className="p-4 bg-gb-dark pixel-borders">
					<h2 className="mb-4 text-2xl font-bold text-gb-lightest">
						All Listed Tokiemon NFTs
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 min-h-72">
						{allListings?.map((nft) => (
							<NFTListing
								key={nft.tokenId}
								nft={nft}
								isOwner={false}
								isListed={true}
							/>
						))}
					</div>
				</section>
			)}
		</div>
	);
}

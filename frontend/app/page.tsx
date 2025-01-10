"use client";

import { useState, useEffect } from "react";
import NFTListing from "@/components/NFTListing";
import { Button } from "@/components/ui/button";
import useUserListings from "@/hooks/useUserListing";

// Mock data for NFTs
const mockNFTs = [
	{
		id: "1",
		name: "Tokiemon #1",
		image: "/placeholder.svg?height=200&width=200",
		price: "0.1",
	},
	{
		id: "2",
		name: "Tokiemon #2",
		image: "/placeholder.svg?height=200&width=200",
		price: "0.2",
	},
	{
		id: "3",
		name: "Tokiemon #3",
		image: "/placeholder.svg?height=200&width=200",
		price: "0.15",
	},
];

export default function Page() {
	const [isConnected, setIsConnected] = useState(false);
	const [userListings, setUserListings] = useState<typeof mockNFTs>([]);

	const { data } = useUserListings();
	console.log({ data });

	useEffect(() => {
		// Simulating wallet connection status
		const checkWalletConnection = () => {
			// Replace this with actual wallet connection check
			setIsConnected(localStorage.getItem("walletConnected") === "true");
		};

		checkWalletConnection();
		window.addEventListener("walletConnected", checkWalletConnection);

		return () => {
			window.removeEventListener("walletConnected", checkWalletConnection);
		};
	}, []);

	useEffect(() => {
		if (isConnected) {
			// Fetch user's listings when connected
			// This is a mock implementation
			setUserListings(mockNFTs.slice(0, 2));
		}
	}, [isConnected]);

	const handleBuy = (nft: (typeof mockNFTs)[0]) => {
		if (isConnected) {
			// Implement actual buy logic here
			alert(`Buying ${nft.name} for ${nft.price} ETH`);
		} else {
			alert("Please connect your wallet to buy NFTs");
		}
	};

	return (
		<div className="space-y-8">
			{isConnected && userListings.length > 0 && (
				<section className="p-4 bg-gb-dark pixel-borders">
					<h2 className="mb-4 text-2xl font-bold text-gb-lightest">
						Your Listed Tokiemon NFTs
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{userListings.map((nft) => (
							<NFTListing key={nft.id} {...nft} onBuy={() => handleBuy(nft)} />
						))}
					</div>
				</section>
			)}

			<section className="p-4 bg-gb-dark pixel-borders">
				<h2 className="mb-4 text-2xl font-bold text-gb-lightest">
					All Listed Tokiemon NFTs
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{mockNFTs.map((nft) => (
						<NFTListing key={nft.id} {...nft} onBuy={() => handleBuy(nft)} />
					))}
				</div>
			</section>
		</div>
	);
}

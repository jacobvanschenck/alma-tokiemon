import type { Listing } from "@/app/page";
import { marketplaceAbi, tokiemonAbi } from "@/lib/abis";
import { client } from "@/lib/client";
import { MARKETPLACE_ADDRESS, TOKIEMON_ADDRESS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { type Address, getAddress, zeroAddress } from "viem";
import { getL1ChainId } from "viem/zksync";
import { useAccount } from "wagmi";

export default function useUserTokiemon() {
	const { address } = useAccount();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["get-user-token-ids", address],
		queryFn: async () => {
			if (!address) return [];
			return (await getTokensIds(address)) ?? [];
		},
	});

	return {
		data,
		isLoading,
		isError,
	};
}

async function getTokensIds(address: Address) {
	const balance = await client.readContract({
		abi: tokiemonAbi,
		address: TOKIEMON_ADDRESS,
		functionName: "balanceOf",
		args: [address as Address],
	});

	const results = [] as Array<bigint | null>;

	for (let i = 0; i < Number(balance); i++) {
		const id = await getTokenIdByIndex(address, BigInt(i));
		results.push(id);
	}

	const listings = [] as Array<Listing | null>;

	for (const tokenId of results) {
		if (!tokenId) return;
		const listing = await getListing(address, tokenId);
		listings.push(listing);
	}

	return listings;
}

async function getListing(address: Address, tokenId: bigint) {
	try {
		const listing = await client.readContract({
			abi: marketplaceAbi,
			address: MARKETPLACE_ADDRESS,
			functionName: "getListing",
			args: [tokenId],
		});

		if (listing.seller === zeroAddress)
			return {
				tokenId,
				seller: address,
				price: undefined,
				isListed: false,
			} as Listing;
		return { ...listing, isListed: true } as Listing;
	} catch (err) {
		console.error(err);
		return null;
	}
}

async function getTokenIdByIndex(address: Address, index: bigint) {
	try {
		return await client.readContract({
			abi: tokiemonAbi,
			address: TOKIEMON_ADDRESS,
			functionName: "tokenOfOwnerByIndex",
			args: [address as Address, index as bigint],
		});
	} catch (err) {
		console.error(err);
		return null;
	}
}

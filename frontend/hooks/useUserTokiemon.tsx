import { Listing } from "@/app/page";
import { marketplaceAbi, tokiemonAbi } from "@/lib/abis";
import { client } from "@/lib/client";
import { MARKETPLACE_ADDRESS, TOKIEMON_ADDRESS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { type Address, getAddress } from "viem";
import { getL1ChainId } from "viem/zksync";
import { useAccount } from "wagmi";

export default function useUserTokiemon() {
	const { address } = useAccount();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["get-token-ids", address],
		queryFn: async () => {
			if (!address) return;
			return await getTokensIds(address);
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

	const results = new Array<bigint | null>(balance);

	for (let i = 0; i < balance; i++) {
		const id = await getTokenIdByIndex(address, BigInt(i));
		results.push(id);
	}

	const listings = [] as Array<Listing | null>;

	for (const tokenId of results) {
		if (!tokenId) return;
		const listing = await getListing(tokenId);
		listings.push(listing);
	}

	return listings;
}

async function getListing(tokenId: bigint) {
	try {
		const listing = await client.readContract({
			abi: marketplaceAbi,
			address: MARKETPLACE_ADDRESS,
			functionName: "getListing",
			args: [tokenId],
		});

		if (!listing)
			return { tokenId, seller: undefined, price: undefined } as Listing;
		return listing as Listing;
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

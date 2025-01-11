import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { type Address, getAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function useAllListings() {
	const { address } = useAccount();

	const { data, queryKey } = useReadContract({
		abi: marketplaceAbi,
		address: MARKETPLACE_ADDRESS,
		functionName: "getAllListings",
	});

	console.log({ queryKey });

	if (!address) return { data: null };

	return {
		data: data
			?.filter((d) => d.tokenId && d.seller !== getAddress(address))
			.map((d) => ({ ...d, isListed: true })),
	};
}

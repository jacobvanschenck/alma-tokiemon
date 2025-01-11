import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { type Address, getAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function useAllListings() {
	const { address } = useAccount();

	const { data } = useReadContract({
		abi: marketplaceAbi,
		address: MARKETPLACE_ADDRESS,
		functionName: "getAllListings",
	});

	return {
		data: data
			?.filter((d) => d.tokenId && d.seller !== getAddress(address as Address))
			.map((d) => ({ ...d, isListed: true })),
	};
}

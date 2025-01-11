import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { useAccount, useReadContract } from "wagmi";

export default function useAllListings() {
	const { data, queryKey } = useReadContract({
		abi: marketplaceAbi,
		address: MARKETPLACE_ADDRESS,
		functionName: "getAllListings",
	});

	return {
		data: data?.map((d) => ({ ...d, isListed: true })),
	};
}

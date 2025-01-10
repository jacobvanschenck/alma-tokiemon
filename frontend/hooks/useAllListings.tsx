import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { useReadContract } from "wagmi";

export default function useAllListings() {
	const { data } = useReadContract({
		abi: marketplaceAbi,
		address: MARKETPLACE_ADDRESS,
		functionName: "getAllListings",
	});

	return { data: data?.filter((d) => d.tokenId) };
}

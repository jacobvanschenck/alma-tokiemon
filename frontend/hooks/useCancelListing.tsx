import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { useCallback } from "react";
import { useWriteContract } from "wagmi";

export default function useCancelListing() {
	const { writeContract, isError, isPending } = useWriteContract();

	const cancelListing = useCallback(
		(props: { id: bigint }) =>
			writeContract({
				abi: marketplaceAbi,
				address: MARKETPLACE_ADDRESS,
				functionName: "cancelListing",
				args: [props.id],
			}),
		[writeContract],
	);

	return { cancelListing, isPending, isError };
}

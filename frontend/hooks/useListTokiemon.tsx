import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { useCallback } from "react";
import { useWriteContract } from "wagmi";

export default function useListTokiemon() {
	const { writeContract, isError, isPending, error } = useWriteContract();

	const listTokiemon = useCallback(
		(props: { id: bigint; price: bigint }) => {
			writeContract({
				abi: marketplaceAbi,
				address: MARKETPLACE_ADDRESS,
				functionName: "listToken",
				args: [props.id, props.price],
			});
		},
		[writeContract],
	);

	return { listTokiemon, isPending, isError };
}

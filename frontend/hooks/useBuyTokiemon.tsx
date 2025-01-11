import { marketplaceAbi } from "@/lib/abis";
import { config } from "@/lib/config";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Address } from "viem";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

export default function useBuyTokiemon() {
	const queryClient = useQueryClient();
	const { writeContract, isError, isPending } = useWriteContract({
		mutation: {
			onSettled: async (data) => {
				await waitForTransactionReceipt(config, {
					hash: data as Address,
				});
				queryClient.refetchQueries();
			},
		},
	});

	const buyTokiemon = useCallback(
		(props: { id: bigint; price: bigint }) =>
			writeContract({
				abi: marketplaceAbi,
				address: MARKETPLACE_ADDRESS,
				functionName: "buyToken",
				args: [props.id],
				value: props.price,
			}),
		[writeContract],
	);

	return { buyTokiemon, isPending, isError };
}

import { marketplaceAbi, tokiemonAbi } from "@/lib/abis";
import { config } from "@/lib/config";
import { MARKETPLACE_ADDRESS, TOKIEMON_ADDRESS } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Address } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

export default function useListTokiemon() {
	const queryClient = useQueryClient();
	const { writeContract, isError, isPending, error } = useWriteContract({
		mutation: {
			onSettled: async (data) => {
				await waitForTransactionReceipt(config, {
					hash: data as Address,
				});
				queryClient.refetchQueries();
			},
		},
	});
	const { address } = useAccount();

	const { data: isApproved } = useReadContract({
		abi: tokiemonAbi,
		address: TOKIEMON_ADDRESS,
		functionName: "isApprovedForAll",
		args: [address as Address, MARKETPLACE_ADDRESS],
	});

	const approveMarketplace = useCallback(() => {
		writeContract({
			abi: tokiemonAbi,
			address: TOKIEMON_ADDRESS,
			functionName: "setApprovalForAll",
			args: [MARKETPLACE_ADDRESS, true],
		});
	}, [writeContract]);

	const listTokiemon = useCallback(
		(props: { id: bigint; price: bigint }) => {
			if (!isApproved) approveMarketplace();
			writeContract({
				abi: marketplaceAbi,
				address: MARKETPLACE_ADDRESS,
				functionName: "listToken",
				args: [props.id, props.price],
			});
		},
		[writeContract, approveMarketplace, isApproved],
	);

	return { listTokiemon, isPending, isError };
}

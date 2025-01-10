import { marketplaceAbi, tokiemonAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS, TOKIEMON_ADDRESS } from "@/lib/constants";
import { useReadContract } from "wagmi";

export default function useUserListings() {
	const { data } = useReadContract({
		abi: tokiemonAbi,
		address: TOKIEMON_ADDRESS,
		functionName: "balanceOf",
		args: ["0x4ef8a935292339553e1799a0BBaa25D3ba38F096"],
	});

	return { data };
}

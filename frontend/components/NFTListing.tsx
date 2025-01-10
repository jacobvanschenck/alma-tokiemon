import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { tokiemonAbi } from "@/lib/abis";
import { TOKIEMON_ADDRESS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

interface NFTListingProps {
	id: bigint;
	price: bigint;
	seller: string;
	cta: string;
	action: () => void;
}

export default function NFTListing({
	id,
	price,
	seller,
	cta,
	action,
}: NFTListingProps) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["tokiemon", Number(id)],
		queryFn: async () => {
			const response = await fetch(
				`https://api.tokiemon.io/tokiemon/${Number(id)}`,
			);
			return await response.json();
		},
	});

	if (isError || isLoading) return null;

	return (
		<Card className="w-72 max-w-sm bg-gb-light pixel-borders">
			<CardHeader>
				<CardTitle className="text-gb-darkest">{data.name}</CardTitle>
				<CardTitle className="text-base text-gb-dark">
					Seller: {seller.slice(0, 8)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-hidden h-24 bg-gb-lightest pixel-borders-thin">
					<img
						src={data.image}
						alt={`tokiemon-${data.name}`}
						className="object-contain w-full h-full"
					/>
				</div>
				<p className="mt-2 text-lg font-semibold text-gb-darkest">
					Price: {formatEther(price)} ETH
				</p>
			</CardContent>
			<CardFooter>
				<Button
					onClick={action}
					className="w-full bg-gb-dark text-gb-lightest pixel-borders-thin hover:bg-gb-darkest"
				>
					{cta}
				</Button>
			</CardFooter>
		</Card>
	);
}

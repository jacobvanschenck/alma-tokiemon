import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NFTListingProps {
	id: string;
	name: string;
	image: string;
	price: string;
	onBuy: () => void;
}

export default function NFTListing({
	id,
	name,
	image,
	price,
	onBuy,
}: NFTListingProps) {
	return (
		<Card className="w-full max-w-sm bg-gb-light pixel-borders">
			<CardHeader>
				<CardTitle className="text-gb-darkest">{name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-hidden w-full h-48 bg-gb-lightest pixel-borders-thin">
					<img
						src={image}
						alt={name}
						className="object-contain w-full h-full"
					/>
				</div>
				<p className="mt-2 text-lg font-semibold text-gb-darkest">
					Price: {price} ETH
				</p>
			</CardContent>
			<CardFooter>
				<Button
					onClick={onBuy}
					className="w-full bg-gb-dark text-gb-lightest pixel-borders-thin hover:bg-gb-darkest"
				>
					Buy Now
				</Button>
			</CardFooter>
		</Card>
	);
}

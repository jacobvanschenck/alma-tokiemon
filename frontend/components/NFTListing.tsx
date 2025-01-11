"use client";

import type { Listing } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useBuyTokiemon from "@/hooks/useBuyTokiemon";
import useCancelListing from "@/hooks/useCancelListing";
import useListTokiemon from "@/hooks/useListTokiemon";
import { tokiemonAbi } from "@/lib/abis";
import { TOKIEMON_ADDRESS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";
import { Input } from "./ui/input";

export default function NFTListing(props: {
	nft: Listing;
	isOwner: boolean;
	isListed: boolean;
	isConnected: boolean;
}) {
	const [listPrice, setListPrice] = useState<string>("");
	const { data, isLoading, isError } = useQuery({
		queryKey: ["tokiemon", Number(props.nft.tokenId)],
		queryFn: async () => {
			const response = await fetch(
				`https://api.tokiemon.io/tokiemon/${Number(props.nft.tokenId)}`,
			);
			return await response.json();
		},
	});

	const { cancelListing, isPending: cancelPending } = useCancelListing();
	const { listTokiemon, isPending: listPending } = useListTokiemon();
	const { buyTokiemon, isPending: buyPending } = useBuyTokiemon();

	const action = !props.isOwner
		? buyTokiemon
		: props.isListed
			? cancelListing
			: listTokiemon;

	const getCaption = () => {
		if (!props.isOwner) return "Buy";
		if (props.isListed) return "Cancel Listing";
		return "List";
	};

	if (isError || isLoading) return null;

	return (
		<Card className="w-72 bg-gb-light pixel-borders group">
			<CardHeader>
				<CardTitle className="text-gb-darkest">{data.name}</CardTitle>
				{props.nft.seller && (
					<CardTitle className="text-base text-gb-dark">
						Owner: {props.nft.seller.slice(0, 8)}
					</CardTitle>
				)}
			</CardHeader>
			<CardContent>
				<div className="flex relative ease-in-out">
					<div className="overflow-hidden w-full h-40 bg-gb-lightest pixel-borders-thin">
						<img
							src={data.image}
							alt={`tokiemon-${data.name}`}
							className="object-contain w-full h-full transition-opacity duration-150 group-hover:opacity-0"
						/>
					</div>
					<div className="absolute pt-2 pl-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
						{/* @ts-ignore */}
						{data.attributes.map((a) => (
							<p className="text-gb-darkest" key={a.trait_type}>
								<span className="font-semibold">{a.trait_type}: </span>
								{a.value}
							</p>
						))}
					</div>
				</div>
				{props.nft.price && (
					<p className="mt-2 text-lg font-semibold text-gb-darkest">
						Price: {formatEther(props.nft.price)} ETH
					</p>
				)}
			</CardContent>
			<CardFooter className="gap-2">
				{props.isOwner && !props.isListed && (
					<Input
						value={listPrice}
						onChange={(e) => setListPrice(e.target.value)}
					/>
				)}
				<Button
					disabled={props.isOwner && !props.isListed && !listPrice}
					onClick={(e) => {
						e.preventDefault();
						if (!props.isConnected)
							return alert("Connect your wallet to get started");
						if (!props.isOwner)
							return buyTokiemon({
								id: props.nft.tokenId,
								//@ts-ignore
								price: props.nft.price,
							});
						if (props.isListed) return cancelListing({ id: props.nft.tokenId });
						//@ts-ignore
						return (
							listPrice &&
							listTokiemon({
								id: props.nft.tokenId,
								price: parseEther(listPrice),
							})
						);
					}}
					className="w-full bg-gb-dark text-gb-lightest pixel-borders-thin hover:bg-gb-darkest"
				>
					{cancelPending || listPending || buyPending
						? "Working..."
						: getCaption()}
				</Button>
			</CardFooter>
		</Card>
	);
}

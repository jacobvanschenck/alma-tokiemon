"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/config";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export default function ChainProvider(props: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</WagmiProvider>
	);
}

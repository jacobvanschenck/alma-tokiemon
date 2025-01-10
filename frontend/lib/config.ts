import { http } from "wagmi";
import { base } from "wagmi/chains";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
	appName: "My RainbowKit App",
	projectId: "YOUR_PROJECT_ID",
	chains: [base],
	ssr: true,
});

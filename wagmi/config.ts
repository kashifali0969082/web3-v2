"use client"
import { createConfig, http } from "wagmi";
import { defineChain } from "viem"; 
import {
  tokenPocketWallet,
  walletConnectWallet,
  metaMaskWallet,
  rabbyWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
const projectId = "45a029651f37ec8e01c2e486810e6f3e";
export const customChain = defineChain({
  id: 146, 
  name: "Sonic", 
  nativeCurrency: { name: "Sonic", symbol: "S", decimals: 18 },
  rpcUrls: {
    default: { http: [" https://rpc.soniclabs.com"] }, 
  },
  blockExplorers: {
    default: {
      name: "sonic", 
      url: "https://sonicscan.org", 
    },
  },
});
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
          trustWallet,
          metaMaskWallet,
          tokenPocketWallet,
          rabbyWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "WEB3 SONIC",
    projectId: projectId,
  }
);

export const config = createConfig({
  chains: [customChain], 
  connectors: connectors,
  transports: {
    [customChain.id]: http(), 
  },
});



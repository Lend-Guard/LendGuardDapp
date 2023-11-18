
import React, {children} from "react";

import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";

const defaultChains = [arbitrum]
const projectId = process.env.REACT_APP_WALLET_CONNECT_KEY || "";

const alchemy = process.env.REACT_APP_ALCHEMY_KEY
  ? [
      alchemyProvider({
        apiKey: process.env.REACT_APP_ALCHEMY_KEY,
        priority: 1,
      }),
    ]
  : [];

const infura = process.env.REACT_APP_INFURA_KEY
  ? [
      infuraProvider({
        apiKey: process.env.REACT_APP_INFURA_KEY,
        priority: 1,
      }),
    ]
  : [];

const providers = [...alchemy,...infura,publicProvider({ priority: 3 }),];

const { chains, publicClient } = configureChains(defaultChains, providers, {
  pollingInterval: 60000,
});

const { connectors } = getDefaultWallets({
  appName: "lendguard",
  projectId: projectId,
  chains,
});

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  logger: {
    warn: null,
  },
});

const WalletProvider = ({ children }) => {

  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider
        chains={chains} theme={darkTheme()} modalSize="compact">
        <div>{children}</div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProvider;
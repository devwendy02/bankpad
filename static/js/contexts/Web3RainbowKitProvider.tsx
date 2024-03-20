import React from 'react'
import {
  AvatarComponent,
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {
  // rainbowWallet,
  walletConnectWallet,
  trustWallet,
  metaMaskWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets'
import { WalletIcon } from "components/Icons"
import { CHAINS } from 'config/chains'
import { useTheme } from 'hooks/useTheme'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  [publicProvider()]
)

const projectId = process.env.REACT_APP_PROJECT_ID || 'YOUR_PROJECT_ID'
const appName = "BANKPAD";

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      // rainbowWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      // phantomWallet({ chains }),
      // okxWallet({ projectId, chains }),
      coinbaseWallet({ appName, chains })
    ],
  },
])

// @ts-ignore
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <WalletIcon
      width={size}
      height={size} />
  )
};

export default function Web3RainbowKitProvider({ children }: { children: any }): any {
  const { theme } = useTheme()

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        // showRecentTransactions={true}
        // avatar={CustomAvatar}
        theme={theme == 'dark' ? darkTheme() : lightTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

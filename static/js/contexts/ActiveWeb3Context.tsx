import { DEFAULT_CHAIN } from 'config/chains'
import React, { createContext, ReactNode, useMemo } from 'react'
import {
  useAccount,
  useConnect,
  useNetwork,
  usePublicClient,
  useSwitchNetwork,
  useWalletClient
} from 'wagmi'

export const ActiveWeb3Context = createContext<{}>({})

export default function ActiveWeb3Provider({ children }: { children: ReactNode }): any {
  // @ts-ignore
  const { address, connector, isConnecting, isConnected, isReconnecting } = useAccount()
  const { chain } = useNetwork()
  const chainId = chain?.id || DEFAULT_CHAIN.id

  const { error } = useConnect({ chainId: chain?.id, connector })
  const publicClient = usePublicClient({ chainId })
  const { data: walletClient } = useWalletClient({ chainId })
  const { switchNetwork } = useSwitchNetwork()

  const value = useMemo(
    () => ({
        account: address,
        chainId,
        chain,
        connector,
        isConnecting,
        isReconnecting,
        isConnected,
        publicClient,
        walletClient,
        library: undefined, // we leave this props for the future usage
        error,
        switchNetwork,
      }),
    [
      address,
      chainId,
      chain,
      connector,
      error,
      isConnected,
      isConnecting,
      isReconnecting,
      publicClient,
      walletClient,
      switchNetwork
    ]
  )

  return <ActiveWeb3Context.Provider value={value}>{children}</ActiveWeb3Context.Provider>
}

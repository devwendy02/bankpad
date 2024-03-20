// @ts-nocheck
import {
  Abi,
  PublicClient,
  WalletClient,
  getContract as viemGetContract
} from 'viem'
import { Address, erc20ABI, erc721ABI, mainnet } from 'wagmi'
import UniswapV2PairABI from 'config/abi/uni-pair.json'

// Addresses
import { viemClients } from 'utils/viem'
import { DEFAULT_CHAIN } from 'config/chains'

// ABI

export const getContract = <TAbi extends Abi | unknown[], TWalletClient extends WalletClient>({
  abi,
  address,
  chainId = DEFAULT_CHAIN.id,
  publicClient,
  signer,
}: {
  abi: TAbi
  address: string
  chainId?: number
  signer?: TWalletClient
  publicClient?: PublicClient
}) => {
  const c = viemGetContract({
    abi,
    address: (address as Address),
    publicClient: publicClient ?? viemClients[chainId],
    walletClient: signer,
  })
  return {
    ...c,
    account: signer?.account,
    chain: signer?.chain,
  }
}

export const getERC20Contract = (address: Address, chainId?: number, signer?: WalletClient) => {
  return getContract({ abi: erc20ABI, address, chainId, signer })
}

export const getERC721Contract = (address: Address, chainId?: number, signer?: WalletClient) => {
  return getContract({ abi: erc721ABI, address, chainId, signer })
}

export const getMainnetEthUsdtPairContract = () => {
  return getContract({
    abi: UniswapV2PairABI,
    address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852', // ETH-USDT pair
    chainId: mainnet.id,
    publicClient: viemClients[mainnet.id]
  })
}

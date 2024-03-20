import { useMemo } from 'react'
import { Abi, Address } from 'viem'
import { useWalletClient } from 'wagmi'

import {
  getMigrationAddressMap,
  getTokenFactoryAddressMap
} from 'utils/addressHelpers'

import {
  getContract,
} from 'utils/contractHelpers'

import migrationAbi from 'config/abi/bank-migration.json'
import tokenFactoryAbi from 'config/abi/bank-token-factory.json'
import bankTokenAbi from 'config/abi/bank-token.json'

import { useActiveWeb3 } from './useActiveWeb3'

export const useBankTokenFactoryContract = () => {
  return useContract(getTokenFactoryAddressMap(), tokenFactoryAbi)
}

export const useBankTokenContract = (address) => {
  return useContract(address, bankTokenAbi)
}

export const useBankMigrationContract = () => {
  return useContract(getMigrationAddressMap(), migrationAbi)
}

// returns null on errors
export function useContract<TAbi extends Abi | unknown[]>(
  addressOrAddressMap: string | { [chainId: number]: Address } | undefined,
  abi?: TAbi,
) {
  const { chainId } = useActiveWeb3()
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!addressOrAddressMap || !abi || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract({
        abi,
        address,
        chainId,
        signer: walletClient,
      })
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, abi, chainId, walletClient])
}


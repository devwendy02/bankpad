// @ts-nocheck
import { CHAINS } from 'config/chains'
import { TransactionReceipt, createPublicClient, http, PublicClient } from 'viem'
import { useCallback } from 'react'
import { WaitForTransactionArgs, waitForTransaction } from 'wagmi/actions'
import { useActiveWeb3 } from './useActiveWeb3'

const viemClientsPublicNodes = CHAINS.reduce((prev, cur) => {
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport: http(cur.rpcUrls.public.http[0], {
        timeout: 15_000,
      }),
      batch: {
        multicall: {
          batchSize: 1024 * 200,
        },
      },
    }),
  }
}, {} as Record<number, PublicClient>)

export function usePublicNodeWaitForTransaction() {
  const { chainId } = useActiveWeb3()

  const waitForTransaction_ = useCallback(
    async (opts: WaitForTransactionArgs): Promise<TransactionReceipt> => {
      // our custom node might be late to sync up
      if (viemClientsPublicNodes[chainId]) {
        return viemClientsPublicNodes[chainId].waitForTransactionReceipt(opts)
      }
      return waitForTransaction({ ...opts, chainId })
    },
    [chainId],
  )

  return {
    waitForTransaction: waitForTransaction_,
  }
}

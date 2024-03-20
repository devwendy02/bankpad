// @ts-nocheck
import { useCallback } from 'react'
import {
  Abi,
  Account,
  Address,
  CallParameters,
  Chain,
  GetFunctionArgs,
  InferFunctionName,
  WriteContractParameters,
} from 'viem'
import { EstimateContractGasParameters } from 'viem/_types/actions/public/estimateContractGas'
import { useWalletClient } from 'wagmi'
import { SendTransactionResult } from 'wagmi/actions'
import { calculateGasMargin } from 'utils'
import useGasPrice from './useGasPrice'
import { useActiveWeb3 } from './useActiveWeb3'

export function useCallWithGasPrice() {
  const gasPrice = useGasPrice()
  const { chainId, publicClient, } = useActiveWeb3()
  const { data: walletClient } = useWalletClient()

  /**
   * Perform a contract call with a gas price returned from useGasPrice
   * @param contract Used to perform the call
   * @param methodName The name of the method called
   * @param methodArgs An array of arguments to pass to the method
   * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
   * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
   */
  // 

  const callWithGasPriceWithSimulate = useCallback(
    async <
      TAbi extends Abi | unknown[],
      TFunctionName extends string = string,
      _FunctionName = InferFunctionName<TAbi, TFunctionName>,
      Args = TFunctionName extends string
      ? GetFunctionArgs<TAbi, TFunctionName>['args']
      : _FunctionName extends string
      ? GetFunctionArgs<TAbi, _FunctionName>['args']
      : never,
    >(
      contract: { abi: TAbi; account: Account; chain: Chain; address: Address },
      methodName: InferFunctionName<TAbi, TFunctionName>,
      methodArgs?: Args extends never ? undefined : Args,
      overrides?: Omit<CallParameters, 'chain' | 'to' | 'data'>,
    ): Promise<SendTransactionResult> => {

      const gas = await publicClient.estimateContractGas({
        abi: contract.abi,
        address: contract.address,
        account: walletClient.account,
        functionName: methodName,
        args: methodArgs,
        gasPrice,
        value: 0,
        ...overrides,
      } as unknown as EstimateContractGasParameters)

      const res = await walletClient.writeContract({
        abi: contract.abi,
        address: contract.address,
        account: walletClient.account,
        functionName: methodName,
        args: methodArgs,
        gasPrice,
        gas: calculateGasMargin(gas),
        value: 0n,
        ...overrides,
      } as unknown as WriteContractParameters)

      const hash = res

      return {
        hash,
      }
    },
    [chainId, gasPrice, walletClient],
  )

  return { callWithGasPrice: callWithGasPriceWithSimulate }
}

import { useCallback } from 'react'
import { ETH_ADDRESS } from 'config'
import { BIG_MAX_UINT256, bigIntToBigNumber } from 'utils/bigNumber'
import { getERC20Contract } from 'utils/contractHelpers'
import { useActiveWeb3 } from './useActiveWeb3'
import { useCallWithGasPrice } from './useCallWithGasPrice'

export default function useApproveToken() {
  const { account, walletClient, chainId } = useActiveWeb3()
  const { callWithGasPrice } = useCallWithGasPrice()

  const checkAllowance = useCallback(async (token, spender) => {
    if (token.toLowerCase() == ETH_ADDRESS.toLowerCase())
      return BIG_MAX_UINT256

    const tokenContract = getERC20Contract(token, chainId)
    const allowance = await tokenContract.read.allowance([account, spender])
    return allowance
  }, [account, chainId])

  const handleApprove = useCallback(async (token, spender, allowance, walletClient) => {
    const tokenContract = getERC20Contract(token, chainId, walletClient)
    return await tokenContract.write.approve([spender, allowance])
  }, [walletClient, chainId, callWithGasPrice])

  return { onApprove: handleApprove, checkAllowance }
}

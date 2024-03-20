import { useFeeData } from 'wagmi'
import { useActiveWeb3 } from "./useActiveWeb3"

export default function useGasPrice(): string {
  const { chainId, chain } = useActiveWeb3()
  const { data } = useFeeData({
    chainId,
    enabled: true,
    watch: true,
  })
  
  if (chain?.testnet) {
    return data?.maxPriorityFeePerGas?.toString()
  }
  
  return data?.gasPrice?.toString()
}

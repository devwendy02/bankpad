import { useCallback, useMemo, useState } from 'react'
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import { useBankTokenContract } from 'hooks/useContract';
import { usePublicNodeWaitForTransaction } from 'hooks/usePublicNodeWaitForTransaction';
import { useTokenProject } from '../context/TokenContext';

export default function useUpdateToken() {
  const { account, chainId, walletClient } = useActiveWeb3()
  const { waitForTransaction } = usePublicNodeWaitForTransaction()
  const [hash, setHash] = useState('')

  const { project } = useTokenProject()
  const bankTokenContract = useBankTokenContract(project?.contract_address)
  const { callWithGasPrice } = useCallWithGasPrice()

  const onUpdateTax = useCallback(async (buyTax, sellTax, treasuryTax) => {
    // const { hash } = await callWithGasPrice(
    //   bankTokenContract,
    //   'updateTaxes',
    //   [buyTax, sellTax, treasuryTax])
    setHash('')
    const hash_ = await bankTokenContract.write.updateTaxes(
      [buyTax, sellTax, treasuryTax]
    )
    setHash(hash_)
    const receipt = await waitForTransaction({ hash: hash_ })

    return receipt
  }, [bankTokenContract])

  const onUpdateLimit = useCallback(async (holdLimit, txLimit) => {
    // const { hash } = await callWithGasPrice(
    //   bankTokenContract,
    //   'updateMaxLimit',
    //   [holdLimit, txLimit])
    setHash('')
    const hash_ = await bankTokenContract.write.updateMaxLimit(
      [holdLimit, txLimit]
    )
    setHash(hash_)
    const receipt = await waitForTransaction({ hash: hash_ })

    return receipt
  }, [bankTokenContract])

  const onRenounce = useCallback(async () => {
    // const { hash } = await callWithGasPrice(
    //   bankTokenContract,
    //   'renounceOwnership',
    //   [])
    setHash('')
    const hash_ = await bankTokenContract.write.renounceOwnership([])
    const receipt = await waitForTransaction({ hash: hash_ })
    setHash(hash_)

    return receipt
  }, [bankTokenContract])

  const onEnableTrading = useCallback(async () => {
    // const { hash } = await callWithGasPrice(
    //   bankTokenContract,
    //   'enableTrading',
    //   [])
    setHash('')
    const hash_ = await bankTokenContract.write.enableTrading([])
    const receipt = await waitForTransaction({ hash: hash_ })
    setHash(hash_)

    return receipt
  }, [bankTokenContract])

  return { onUpdateTax, onUpdateLimit, onRenounce, onEnableTrading, hash }
}


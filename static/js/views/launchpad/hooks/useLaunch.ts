// @ts-nocheck
import { useCallback, useMemo, useState } from 'react'
import { encodeAbiParameters, zeroAddress } from 'viem';
import { useServiceFee } from 'contexts/BankServiceContext';
import { ETH_ADDRESS } from 'config';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import useApproveToken from 'hooks/useApproveToken';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import { useBankTokenFactoryContract } from 'hooks/useContract';
import { usePublicNodeWaitForTransaction } from 'hooks/usePublicNodeWaitForTransaction';
import { getTokenFactoryAddress } from 'utils/addressHelpers';
import { getDecimalAmount } from 'utils/formatBalance';
import { useTokenDraft } from '../context/TokenContext';

export function useLaunch() {
  const [hash, setHash] = useState('')
  const { account, chainId, walletClient } = useActiveWeb3()
  const { waitForTransaction } = usePublicNodeWaitForTransaction()
  const tokenFactoryContract = useBankTokenFactoryContract()
  const { draft } = useTokenDraft()
  const serviceFee = useServiceFee()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { checkAllowance, onApprove } = useApproveToken()

  const tokenFactoryAddress = useMemo(() => getTokenFactoryAddress(chainId), [chainId])

  const _handleApprove = useCallback(async (tokenAddress, amount) => {
    const allowance = await checkAllowance(tokenAddress, tokenFactoryAddress)
    if (allowance < amount) {
      const hash = await onApprove(tokenAddress, tokenFactoryAddress, amount)
      const receipt = await waitForTransaction({ hash })
      if (!receipt?.status) throw ("Approve failed. Please try again.")
    }
  }, [tokenFactoryAddress])

  const onLaunch = useCallback(async (trading_delay, can_enable_trading) => {
    // if paired token is not ETH, pass approve process
    const pairedTokenAddress = draft?.pair_address
    if (pairedTokenAddress != ETH_ADDRESS)
      await _handleApprove(
        pairedTokenAddress,
        BigInt(getDecimalAmount(draft?.pair_amount, 6).toFixed())
      )

    const distribParam = encodeAbiParameters([
      { name: 'supply', type: 'uint256' },
      { name: 'teamAccount', type: 'address' },
      { name: 'teamAlloc', type: 'uint16' },
    ], [
      BigInt(getDecimalAmount(draft?.total_supply).toFixed()),
      draft?.team_allocation_address || zeroAddress,
      draft?.team_allocation_percent * 100
    ])

    const antiBotParam = encodeAbiParameters([
      { name: 'holdLimit', type: 'uint16' },
      { name: 'txLimit', type: 'uint16' },
      { name: 'antiDumpLimit', type: 'uint16' },
      { name: 'antiSniperOn', type: 'bool' },
    ], [
      draft?.max_tokens_per_wallet_percent * 100,
      draft?.max_tokens_per_transaction_percent * 100,
      0,
      draft?.snipe_auto_burn
    ])

    const taxParam = encodeAbiParameters([
      { name: 'dexRouter', type: 'address' },
      { name: 'pairedToken', type: 'address' },
      { name: 'taxPayAccount', type: 'address' },
      { name: 'treasuryAccount', type: 'address' },
      { name: 'buyTax', type: 'uint16' },
      { name: 'sellTax', type: 'uint16' },
      { name: 'treasuryTax', type: 'uint16' }
    ], [
      draft?.pair_provider_address,
      pairedTokenAddress,
      draft?.tax_payout_address || zeroAddress,
      draft?.treasury_payout_address || zeroAddress,
      draft?.buy_tax * 100,
      draft?.sell_tax * 100,
      draft?.treasury_tax * 100
    ])

    const seconds_month = 30n * 3600n * 24n
    const seconds_year = 360n * 3600n * 24n

    const lpParam = encodeAbiParameters([
      { name: 'isLPBurn', type: 'bool' },
      { name: 'isTradingDelayed', type: 'bool' },
      { name: 'isTradingDisabled', type: 'bool' },
      { name: 'pairedTokenAmount', type: 'uint256' },
      { name: 'lockPeriod', type: 'uint256' }
    ], [
      draft?.lp_burned,
      trading_delay,
      can_enable_trading,
      // @ts-ignore
      BigInt(getDecimalAmount(draft?.pair_amount,
        !pairedTokenAddress || pairedTokenAddress == ETH_ADDRESS ? 18 : 6).toFixed()),
      BigInt(draft?.lp_lock_period || 0) *
      (draft?.lp_locked_for_years ? seconds_year : seconds_month)
    ])

    // @ts-ignore
    let msgValue = getDecimalAmount(serviceFee?.launch)
    if (trading_delay)
      // @ts-ignore
      msgValue = msgValue.plus(getDecimalAmount(serviceFee?.trading_delay))
    if (can_enable_trading)
      // @ts-ignore
      msgValue = msgValue.plus(getDecimalAmount(serviceFee?.enable_trading))
    if (pairedTokenAddress == ETH_ADDRESS)
      msgValue = msgValue.plus(getDecimalAmount(draft?.pair_amount))
    if (!draft?.lp_burned) {
      // @ts-ignore
      msgValue = msgValue.plus(getDecimalAmount(serviceFee?.lock_liquidity))
    }

    const launchConf = {
      uuid: draft?.uuid,
      name: draft?.name,
      symbol: draft?.symbol,
      distribParam,
      antiBotParam,
      taxParam,
      lpParam
    }

    // const { hash } = await callWithGasPrice(
    //   tokenFactoryContract,
    //   'createERC20',
    //   [launchConf],
    //   { from: account, value: BigInt(msgValue.toFixed()) })
    // const receipt = await waitForTransaction({ hash })

    setHash('')
    const hash_ = await tokenFactoryContract.write.createERC20([launchConf], {
      from: account, value: BigInt(msgValue.toFixed())
    });
    setHash(hash_)
    const receipt = await waitForTransaction({ hash: hash_ })

    return receipt
  }, [account, draft, tokenFactoryContract, serviceFee, walletClient])

  return { onLaunch, hash }
}

import { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { API_ENDPOINT } from 'config/endpoints';
import { useAuth } from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';
import {
  useCreationStep,
  useTokenDraft,
  useTokenProject,
  useTokenUUID
} from '../context/TokenContext';
import { TokenCreationStep } from '../types';
import { formatTelegramFromInput, formatTwitterFromInput, formatWebsiteFromInput } from '../util';
import { isAddress } from 'viem';
import { useServiceLimit } from 'contexts/BankServiceContext';
import { ETH_ADDRESS } from 'config';

export function useChangePage() {
  const { token: jwtToken } = useAuth()
  const { failed } = useNotification()
  const currentStep = useCreationStep()
  const serviceLimit = useServiceLimit()
  const uuid = useTokenUUID()
  const { project, updateProject } = useTokenProject()
  const { draft } = useTokenDraft()
  const history = useHistory()

  const handleUpdateApiCall = useCallback(async (obj) => {
    const response = await fetch(
      `${API_ENDPOINT}/launches/${uuid}`, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(obj)
    }
    );
    const result = await response.json()
    return result
  }, [jwtToken, uuid])

  const onChangePage = useCallback(async (newStep: TokenCreationStep) => {
    if (currentStep == newStep) return

    try {
      // Before change page, save updates first
      try {
        if (currentStep == TokenCreationStep.DETAILS) {
          await handleSaveDetails()
        } else if (currentStep == TokenCreationStep.DISTRIBUTION) {
          await handleSaveDistribution()
        } else if (currentStep == TokenCreationStep.ANTIBOT) {
          await handleSaveAntiBot()
        } else if (currentStep == TokenCreationStep.TAX) {
          await handleSaveTaxes()
        } else if (currentStep == TokenCreationStep.LIQUIDITY) {
          await handleSaveLiquidity()
        }
      } catch (err) {
        if (currentStep < newStep)
          throw err
      }

      validateForChangingStep(newStep)

      if (newStep == TokenCreationStep.DETAILS) {
        history.push(`/launchpad/${uuid}/token_details`)
      } else if (newStep == TokenCreationStep.DISTRIBUTION) {
        history.push(`/launchpad/${uuid}/distribution`)
      } else if (newStep == TokenCreationStep.ANTIBOT) {
        history.push(`/launchpad/${uuid}/antibot`)
      } else if (newStep == TokenCreationStep.TAX) {
        history.push(`/launchpad/${uuid}/taxes`)
      } else if (newStep == TokenCreationStep.LIQUIDITY) {
        history.push(`/launchpad/${uuid}/liquidity`)
      } else if (newStep == TokenCreationStep.REVIEW) {
        history.push(`/launchpad/${uuid}/review`)
      }
    } catch (err) {
      failed(err?.toString())
    }

  }, [project, draft, uuid, currentStep])

  const validateForChangingStep = (step: TokenCreationStep) => {
    if (step == TokenCreationStep.DISTRIBUTION) {
      if (!draft?.name || !draft?.symbol || !draft?.telegram_url || draft?.total_supply <= 0)
        throw ("Please complete the previous steps");
    } else if (step == TokenCreationStep.TAX) {
      if (draft?.max_tokens_per_transaction_percent <= 0 || draft?.max_tokens_per_wallet_percent <= 0) {
        throw ("Please complete the previous steps");
      }
    } else if (step == TokenCreationStep.LIQUIDITY) {
      const buyTax = Math.floor(Number(draft?.buy_tax) * 100) / 100
      const sellTax = Math.floor(Number(draft?.sell_tax) * 100) / 100
      const treasuryTax = Math.floor(Number(draft?.treasury_tax) * 100) / 100
      if ((buyTax > 0 || sellTax > 0) && !draft?.tax_payout_address)
        throw ("Please complete the previous steps");
      if (treasuryTax > 0 && !draft?.treasury_payout_address)
        throw ("Please complete the previous steps");
    } else if (step == TokenCreationStep.REVIEW) {
      if (draft?.pair_amount <= 0)
        throw ("Please complete the previous steps");
    }
  }

  const handleSaveDetails = async () => {
    const trimmedTokenName = draft?.name?.trim()
    const trimmedTokenSymbol = draft?.symbol?.trim()
    const trimmedTelegram = draft?.telegram_url?.trim()
    const trimmedTwitter = draft?.twitter_url?.trim()
    const trimmedWebsite = draft?.website_url?.trim()
    const totalSupply = draft?.total_supply

    if (!trimmedTokenName) throw ("Token name is required")
    if (!trimmedTokenSymbol) throw ("Token symbol is required")
    if (trimmedTokenSymbol.length > 32) throw ("Max 32 characters can be set for token symbol")
    if (!trimmedTelegram) throw ("A valid telegram group is required")
    if (totalSupply <= 0) throw ("Invalid total supply")

    // Nothing changed, no need to call api
    if (project?.name == trimmedTokenName
      && project?.symbol == trimmedTokenSymbol
      && project?.telegram_url == trimmedTelegram
      && project?.twitter_url == trimmedTwitter
      && project?.website_url == trimmedWebsite
      && project?.total_supply == totalSupply) return

    const result = await handleUpdateApiCall({
      name: trimmedTokenName,
      symbol: trimmedTokenSymbol,
      total_supply: totalSupply,
      telegram_url: formatTelegramFromInput(trimmedTelegram),
      twitter_url: formatTwitterFromInput(trimmedTwitter),
      website_url: formatWebsiteFromInput(trimmedWebsite)
    })
    if (result?.uuid) updateProject(result)
    else throw (result?.message || "Something went wrong")
  }

  const handleSaveDistribution = async () => {
    const teamAddressLower = draft?.team_allocation_address?.trim()?.toLowerCase();
    const teamAllocPercent = Math.floor(Number(draft?.team_allocation_percent) * 100) / 100
    // const reflectionsPercent = draft?.reflections_percent

    if (teamAllocPercent < 0 || teamAllocPercent > draft?.max_team_allocation_percent)
      throw ("Team supply allocation is out of range")
    // if (reflectionsPercent < 0 || reflectionsPercent > serviceLimit?.max_reflections)
    //   throw ("Token reflections is out of range")
    if (teamAllocPercent > 0) {
      if (!teamAddressLower) throw ("Team supply address is required")
      if (!isAddress(teamAddressLower)) throw ("Invalid team supply address")
    }

    // Nothing changed, no need to call api
    if (
      project?.team_allocation_address == teamAddressLower
      && project?.team_allocation_percent == teamAllocPercent
      // && project?.reflections_percent == reflectionsPercent
    ) return

    const result = await handleUpdateApiCall({
      team_allocation_address: teamAddressLower,
      team_allocation_percent: teamAllocPercent,
      // reflections_percent: reflectionsPercent
    })
    if (result?.uuid) updateProject(result)
    else throw (result?.message || "Something went wrong")
  }

  const handleSaveAntiBot = async () => {
    const maxTxLimit = Math.floor(Number(draft?.max_tokens_per_transaction_percent) * 100) / 100
    const maxHoldLimit = Math.floor(Number(draft?.max_tokens_per_wallet_percent) * 100) / 100
    const isSnipeAutoBurnOn = Boolean(draft?.snipe_auto_burn)

    if (maxTxLimit < serviceLimit?.min_tokens_per_transaction
      || maxTxLimit > serviceLimit?.max_tokens_per_transaction)
      throw ("Max tokens per transaction is out of range")
    if (maxHoldLimit < serviceLimit?.min_tokens_per_wallet
      || maxHoldLimit > serviceLimit?.max_tokens_per_wallet)
      throw ("Max tokens per wallet is out of range")

    if (maxTxLimit > maxHoldLimit)
      throw ("Max tokens per transaction should be less than max tokens per wallet")

    // Nothing changed, no need to call api
    if (project?.max_tokens_per_transaction_percent == maxTxLimit
      && project?.max_tokens_per_wallet_percent == maxHoldLimit
      && project?.snipe_auto_burn == isSnipeAutoBurnOn) return

    const result = await handleUpdateApiCall({
      max_tokens_per_transaction_percent: maxTxLimit,
      max_tokens_per_wallet_percent: maxHoldLimit,
      snipe_auto_burn: isSnipeAutoBurnOn
    })
    if (result?.uuid) {
      updateProject(result)
    } else {
      throw (result?.message || "Something went wrong")
    }
  }

  const handleSaveTaxes = async () => {
    const buyTax = Math.floor(Number(draft?.buy_tax) * 100) / 100
    const sellTax = Math.floor(Number(draft?.sell_tax) * 100) / 100
    const treasuryTax = Math.floor(Number(draft?.treasury_tax) * 100) / 100
    const taxPayoutAddress = draft?.tax_payout_address?.trim()?.toLowerCase()
    const treasuryPayoutAddress = draft?.treasury_payout_address?.trim()?.toLowerCase()

    if (buyTax < 0 || buyTax > serviceLimit?.max_buy_tax) throw ("Buy tax is out of range")
    if (sellTax < 0 || sellTax > serviceLimit?.max_sell_tax) throw ("Sell tax is out of range")
    if (treasuryTax < 0 || treasuryTax > serviceLimit?.max_treasury_tax) throw ("Tresaury / Staking tax is out of range")
    if (!(buyTax == 0 && sellTax == 0) && !isAddress(taxPayoutAddress?.toLowerCase()))
      throw ("Tax payout address is required")
    if (treasuryTax != 0 && !isAddress(treasuryPayoutAddress?.toLowerCase()))
      throw ("Treasury payout address is required")

    // Nothing changed, no need to call api
    if (
      project?.buy_tax == buyTax
      && project?.sell_tax == sellTax
      && project?.tax_payout_address == taxPayoutAddress
      && project?.treasury_tax == treasuryTax
      && project?.treasury_payout_address == treasuryPayoutAddress
    ) return

    const result = await handleUpdateApiCall({
      buy_tax: buyTax,
      sell_tax: sellTax,
      tax_payout_address: taxPayoutAddress,
      treasury_tax: treasuryTax,
      treasury_payout_address: treasuryPayoutAddress
    })
    if (result?.uuid) updateProject(result)
    else throw (result?.message || "Something went wrong")
  }

  const handleSaveLiquidity = async () => {
    const minPairAmount = draft?.pair_address == ETH_ADDRESS
      ? serviceLimit?.min_pair_eth
      : serviceLimit?.min_pair_usdc

    if (draft?.pair_amount < minPairAmount) throw (`Pair amount is required`)
    if (!draft?.lp_burned && draft?.lp_lock_period < 1) throw ("Invalid Liquidity lock period")

    const result = await handleUpdateApiCall({
      pair_provider: draft?.pair_provider,
      pair_address: draft?.pair_address,
      pair_amount: draft?.pair_amount,
      trading_delay: draft?.trading_delay,
      lp_burned: draft?.lp_burned,
      lp_lock_period: !draft?.lp_burned ? draft?.lp_lock_period : null,
      lp_locked_for_years: draft?.lp_locked_for_years
    })
    if (result?.uuid) {
      updateProject(result)
    } else {
      throw (result?.message || "Something went wrong")
    }
  }

  return { onChangePage }
}

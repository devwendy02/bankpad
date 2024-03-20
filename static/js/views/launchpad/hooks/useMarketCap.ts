import { useMemo } from 'react'
import { useEthPrice } from 'contexts/BankServiceContext';
import { ETH_ADDRESS } from 'config';
import { useTokenDraft } from '../context/TokenContext';

export function useMarketCap() {
  const ethPrice = useEthPrice()
  const { draft } = useTokenDraft()

  const { price, marketcap } = useMemo(() => {
    if (!draft || !ethPrice) return { price: 0, marketcap: 0 }
    const { 
      total_supply, 
      team_allocation_percent, 
      pair_address, 
      pair_amount } = draft
   
    const token_liquidity_amount = total_supply * (100 - team_allocation_percent) / 100
    if (!token_liquidity_amount) return {price: 0, marketcap: 0}

    let price = pair_amount / token_liquidity_amount
    if (pair_address == ETH_ADDRESS) price *= ethPrice
    const marketcap = total_supply * price

    return { price, marketcap }
  }, [ethPrice, draft])

  return { price, marketcap }
}

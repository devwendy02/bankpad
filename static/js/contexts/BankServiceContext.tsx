import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { API_ENDPOINT } from 'config/endpoints'
import { Dex, ServiceFee, ServiceLimit } from 'config/types'
import { useActiveWeb3 } from 'hooks/useActiveWeb3'
import { useAuth } from 'hooks/useAuth'
import useRefresh from 'hooks/useRefresh'
import { getMainnetEthUsdtPairContract } from 'utils/contractHelpers'
import { formatBigInt, getBalanceAmount } from 'utils/formatBalance'
import { bigIntToBigNumber } from 'utils/bigNumber'

const StateContext = createContext<{
  dexs: Dex[],
  serviceFee: ServiceFee,
  serviceLimit: ServiceLimit,
  ethPrice: number
}>({
  dexs: [],
  serviceFee: undefined,
  serviceLimit: undefined,
  ethPrice: 0
})

export const useServiceLimit = () => {
  const { serviceLimit } = useContext(StateContext)
  return serviceLimit
}

export const useServiceFee = () => {
  const { serviceFee } = useContext(StateContext)
  return serviceFee
}

export const useDexs = () => {
  const { dexs } = useContext(StateContext)
  return dexs
}

export const useEthPrice = () => {
  const { ethPrice } = useContext(StateContext)
  return ethPrice
}

export default function BankServiceProvider({ children }: { children: ReactNode }): any {
  const [dexs, setDexs] = useState<Dex[]>([])
  const [serviceFee, setServiceFee] = useState<ServiceFee>()
  const [serviceLimit, setServiceLimit] = useState<ServiceLimit>()
  const [ethPrice, setEthPrice] = useState(0)

  const { chainId } = useActiveWeb3()
  const { authDone, token: jwtToken } = useAuth()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (jwtToken && authDone && chainId) {
      (async () => {
        try {
          const response = await fetch(
            `${API_ENDPOINT}/launches/limits/${chainId}`, {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${jwtToken}`,
            })
          }
          );
          const result = await response.json()
          setServiceLimit(result)
        } catch (err) {
          console.error(err)
        }

        try {
          const response = await fetch(
            `${API_ENDPOINT}/launches/fees/${chainId}`, {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${jwtToken}`,
            })
          }
          );
          const result = await response.json()
          setServiceFee(result)
        } catch (err) {
          console.error(err)
        }
      })()
    }
  }, [authDone, jwtToken, chainId])

  useEffect(() => {
    if (jwtToken && authDone && chainId) {
      (async () => {
        try {
          const response = await fetch(
            `${API_ENDPOINT}/pairs?filter=${chainId}`, {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${jwtToken}`,
            })
          }
          );
          const result = await response.json()
          setDexs(result)
        } catch (err) {
          console.error(err)
        }
      })()
    }
  }, [authDone, jwtToken, chainId])

  useEffect(() => {
    (async () => {
      try {
        const mainnetEthUsdtPairContract = getMainnetEthUsdtPairContract()
        const reserves = await mainnetEthUsdtPairContract.read.getReserves()
        if (!reserves) return
        // @ts-ignore
        const [reserve0, reserve1] = reserves // token0: ETH, token1: USDT
        const reserve0_number = getBalanceAmount(bigIntToBigNumber(reserve0))
        const reserve1_number = getBalanceAmount(bigIntToBigNumber(reserve1), 6)
        setEthPrice(reserve1_number.div(reserve0_number).toNumber())
      } catch (err) {
        console.error(err)
      }
    })()
  }, [slowRefresh])

  return <StateContext.Provider value={{ dexs, serviceFee, serviceLimit, ethPrice }}>
    {children}
  </StateContext.Provider>
}

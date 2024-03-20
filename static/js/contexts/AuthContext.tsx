import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { signMessage } from 'wagmi/actions'
import { BANK_ACCOUNT_KEY, BANK_AUTH_KEY, BANK_REF_ID } from 'config'
import { useActiveWeb3 } from 'hooks/useActiveWeb3'
import useNotification from 'hooks/useNotification'
import { isUserRejected } from 'utils/sentry'
import { API_ENDPOINT } from 'config/endpoints'

export const AuthContext = createContext<{
  token: string
  refId: string
  authDone: boolean
}>({
  token: '',
  refId: '',
  authDone: false
})

export default function AuthProvider({ children }: { children: ReactNode }): any {
  const [token, setToken] = useState('')
  const [refId, setRefId] = useState('')
  const [signing, setSigning] = useState(false)
  const [authDone, setAuthDone] = useState(false)
  const {
    account,
    chain,
    error,
    isConnected,
    isConnecting,
    isReconnecting
  } = useActiveWeb3()
  const { success, failed } = useNotification()

  useEffect(() => {
    if (!refId) {
      let localStorageId = localStorage.getItem(BANK_REF_ID)
      if (!localStorageId) {
        let arr = new Uint8Array(20);
        window.crypto.getRandomValues(arr);
        localStorageId = Array.from(arr, (num) => num.toString(16)).join('')
        localStorage.setItem(BANK_REF_ID, localStorageId)
      }
      setRefId(localStorageId)
    }
  }, [])

  const handleAuth = async () => {
    try {
      setSigning(true)
      const epochTime = Math.floor(Date.now() / 1000);
      const message = `Generating signature for authentication in BankPad #${account}#${epochTime}`
      const signature = await signMessage({ message })

      if (!signature) {
        throw ('Signature generation failed')
      }

      const response = await fetch(
        `${API_ENDPOINT}/auth/wallet`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `address=${account}&signature=${signature}&message=${message}`
      }
      );
      const result = await response.json()
      if (result.jwt_token) {
        localStorage.setItem(`${BANK_AUTH_KEY}_${chain.id}`, result.jwt_token)
        localStorage.setItem(BANK_ACCOUNT_KEY, account)
      } else throw "Something went wrong"
    } catch (err) {
      if (!isUserRejected(err)) {
        console.error(err)
        failed(err?.toString());
      }
    } finally {
      setSigning(false)
    }
  }

  useEffect(() => {
    if (isConnecting || isReconnecting) return
    if (!account || !chain || chain.unsupported) {
      localStorage.removeItem(BANK_ACCOUNT_KEY)
      setToken('')
      setAuthDone(true)
    }
    else if (isConnected) {
      const authKey = localStorage.getItem(`${BANK_AUTH_KEY}_${chain.id}`)
      const authAccount = localStorage.getItem(BANK_ACCOUNT_KEY)
      if (authKey && account == authAccount) {
        setToken(authKey)
        setAuthDone(true)
      }
      else if (!signing) { 
        setToken('')
        handleAuth() 
      }
    }
  }, [account, chain, isConnected, isConnecting, isReconnecting, signing])

  return <AuthContext.Provider value={{ token, refId, authDone }}>{children}</AuthContext.Provider>
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { API_ENDPOINT } from 'config/endpoints';
import { useAuth, useRefId } from 'hooks/useAuth';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';

export function useCreate() {
  const { token: jwtToken } = useAuth()
  const refId = useRefId()
  const { chainId } = useActiveWeb3()

  const onCreate = useCallback(async () => {
    const response = await fetch(
      `${API_ENDPOINT}/launches`, {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        "ref_id": refId
      }),
      body: JSON.stringify({ "chain_id": chainId })
    }
    );
    const result = await response.json()
    return result
  }, [jwtToken, chainId])

  return { onCreate }
}

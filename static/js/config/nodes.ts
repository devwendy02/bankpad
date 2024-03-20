import { polygon, goerli, mainnet } from 'wagmi/chains'
import { getNodeRealUrlV2 } from 'utils/nodeReal'

export const PUBLIC_NODES: Record<number, readonly string[]> = {
  [mainnet.id]: [
    // getNodeRealUrlV2(mainnet.id, '1659dfb40aa24bbb8153a677b98064d7'),
    // 'https://eth.llamarpc.com',
    // 'https://cloudflare-eth.com',
    `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
  ].filter(Boolean),
  [goerli.id]: [
    // getNodeRealUrlV2(goerli.id, '8a4432e42df94dcca2814fde8aea2a2e'),
    // 'https://eth-goerli.public.blastapi.io',
    // 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
  ].filter(Boolean),
  [polygon.id]: [...polygon.rpcUrls.public.http].filter(Boolean),
}


import { mainnet as mainnet_, polygon, goerli as goerli_ } from 'wagmi/chains';

const mainnet = {
  ...mainnet_,
  rpcUrls: {
    alchemy: {
      http: ["https://eth-goerli.g.alchemy.com/v2"],
      webSocket: ["wss://eth-goerli.g.alchemy.com/v2"]
    },
    infura: {
      http: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`],
      webSocket: [`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_ID}`]
    },
    default: {
      http: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`]
    },
    public: {
      http: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`]
    }
  }
}

const goerli = {
  ...goerli_,
  rpcUrls: {
    alchemy: {
      http: ["https://eth-goerli.g.alchemy.com/v2"],
      webSocket: ["wss://eth-goerli.g.alchemy.com/v2"]
    },
    infura: {
      http: [`https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`],
      webSocket: [`wss://goerli.infura.io/ws/v3/${process.env.REACT_APP_INFURA_ID}`]
    },
    default: {
      http: [`https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`]
    },
    public: {
      http: [`https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`]
    }
  }
}

export const CHAINS = [
  mainnet,
  goerli
]

export const DEFAULT_CHAIN = mainnet


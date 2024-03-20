import { CHAINS, DEFAULT_CHAIN } from "config/chains"

export function getBlockExploreLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainId?: number,
): string {
  const chain = CHAINS.find((c) => c.id == chainId)
  if (!chain) return DEFAULT_CHAIN.blockExplorers?.default.url ?? ''
  switch (type) {
    case 'transaction': {
      return `${chain.blockExplorers.default.url}/tx/${data}`
    }
    case 'token': {
      return `${chain.blockExplorers.default.url}/token/${data}`
    }
    case 'block': {
      return `${chain.blockExplorers.default.url}/block/${data}`
    }
    case 'countdown': {
      return `${chain.blockExplorers.default.url}/block/countdown/${data}`
    }
    default: {
      return `${chain.blockExplorers.default.url}/address/${data}`
    }
  }
}

export const isChainSupported = (network?: string): network is string =>
  // @ts-ignore
  !!network && CHAINS.map((c) => c.network).includes(network.toLowerCase())

// add 10%
export function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str

export function formatNum(value : any) {
  let intValue : any = Math.floor(value);
  if (intValue < 10) {
    return '' + parseFloat(value).toPrecision(2);
  } else if (intValue < 1000) {
    return '' + intValue;
  } else if (intValue < 1000000) {
    return (intValue / 1000).toFixed(1) + 'K';
  } else if (intValue < 1000000000) {
    return (intValue / 1000000).toFixed(1) + 'M';
  } else {
    return (intValue / 1000000000).toFixed(1) + 'B';
  }
}

export const putCommas = (value) => {
  try {

    if (value >= 0) {
      const cn1 = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // const cn1 = value.toLocaleString('en-US');
      return cn1;
    } else {
      return '';
    }
  } catch (err) {
    return value
  }
}

export function isSameAddress(addr1, addr2) {
  return addr1?.toLowerCase() == addr2?.toLowerCase()
}

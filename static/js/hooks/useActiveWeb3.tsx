import React, { useContext } from "react";
import { ActiveWeb3Context } from "contexts/ActiveWeb3Context";

/** Requires that BlockUpdater be installed in the DOM tree. */
export function useActiveWeb3(): {
  account?: any;
  chainId?: number;
  chain?: any;
  connector?: any;
  isConnecting?: boolean;
  isReconnecting?: boolean;
  isConnected?: boolean;
  library?: any;
  publicClient?: any;
  walletClient?: any;
  error?: any;
  switchNetwork?: any;
} {
  const data = useContext(ActiveWeb3Context);
  return data;
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import _ from "lodash";
import { goerli, mainnet } from "viem/chains";
import { erc20ABI } from "wagmi";
import migrationABI from "config/abi/bank-migration.json";
import BankHolderMerkle from "config/merkle/bank-holders-merkle.json";
import { useActiveWeb3 } from "hooks/useActiveWeb3";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "utils/bigNumber";
import { isSameAddress } from "utils";
import { getMigrationAddress } from "utils/addressHelpers";

export const TokenPairs = {
  [mainnet.id]: {
    old: "0x9360C489056b64D5003Bf22f4f31458e31cc8028",
    new: "0xf19693068120185664E211F619c4F0530cE07088",
  },
  [goerli.id]: {
    old: "0x8E2e4A0574D7160Bd632c96a48161d4727813399",
    new: "0x79F1a3ec59496C2b767e00Ea4CafBE3e552f443c",
  },
};

const initialStateData = {
  oldBalance: BIG_ZERO,
  migratedBalance: BIG_ZERO,
  migratableBalance: BIG_ZERO,
  migrationFee: BIG_ZERO,
  proof: [],
};

const StateContext = createContext<{
  oldBalance: BigNumber;
  migratedBalance: BigNumber;
  migratableBalance: BigNumber;
  migrationFee: BigNumber;
  proof: any;
}>(initialStateData);

export const useStateData = () => {
  const {
    oldBalance,
    migratableBalance,
    migratedBalance,
    migrationFee,
    proof,
  } = useContext(StateContext);
  return {
    oldBalance,
    migratableBalance,
    migratedBalance,
    migrationFee,
    proof,
  };
};

export default function StateProvider({ children }: { children: ReactNode }) {
  const { chainId, account, publicClient } = useActiveWeb3();
  const [stateData, setStateData] = useState(initialStateData);

  useEffect(() => {
    (async () => {
      try {
        if (account && chainId && chainId in TokenPairs) {
          let newStateData = { ...stateData };
          // search merkle tree to get the account hold data
          // @ts-ignore
          const accountMerkleData = BankHolderMerkle.items.find((item) =>
            isSameAddress(item.account, account)
          );
          if (accountMerkleData)
            newStateData = {
              ...newStateData,
              migratableBalance: new BigNumber(accountMerkleData.from_amount),
              proof: accountMerkleData.proof,
            };

          // read contract data
          const [oldBalance, migratedBalance, migrationFee] =
            await publicClient.multicall({
              contracts: [
                {
                  abi: erc20ABI,
                  address: TokenPairs[chainId].old,
                  functionName: "balanceOf",
                  args: [account],
                },
                {
                  abi: migrationABI,
                  address: getMigrationAddress(chainId),
                  functionName: "claimedAmounts",
                  args: [account],
                },
                {
                  abi: migrationABI,
                  address: getMigrationAddress(chainId),
                  functionName: "feePrice",
                  args: [],
                },
              ],
            });
          newStateData = {
            ...newStateData,
            oldBalance: new BigNumber(oldBalance.result.toString()),
            migratedBalance: new BigNumber(migratedBalance.result.toString()),
            migrationFee: new BigNumber(migrationFee.result.toString()),
          };

          setStateData(newStateData);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [account, chainId]);

  return (
    <StateContext.Provider
      value={{
        ...stateData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

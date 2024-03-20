import { useCallback, useMemo, useState } from "react";
import { useActiveWeb3 } from "hooks/useActiveWeb3";
import useApproveToken from "hooks/useApproveToken";
import { usePublicNodeWaitForTransaction } from "hooks/usePublicNodeWaitForTransaction";
import { getMigrationAddress } from "utils/addressHelpers";
import { useBankMigrationContract } from "hooks/useContract";
import { TokenPairs } from "../context/MigrationContext";

export function useMigrate() {
  const { account, chainId, walletClient } = useActiveWeb3();
  const { checkAllowance, onApprove } = useApproveToken();
  const { waitForTransaction } = usePublicNodeWaitForTransaction();

  const migrationContractAddress = useMemo(
    () => getMigrationAddress(chainId),
    [chainId]
  );
  const bankMigrationContract = useBankMigrationContract();

  const _handleApprove = useCallback(
    async (tokenAddress, amount) => {
      const allowance = await checkAllowance(
        tokenAddress,
        migrationContractAddress
      );
      if (allowance < amount) {
        const hash = await onApprove(
          tokenAddress,
          migrationContractAddress,
          amount,
          walletClient
        );
        const receipt = await waitForTransaction({ hash });
        if (!receipt?.status) throw "Approve failed. Please try again.";
      }
    },
    [migrationContractAddress]
  );

  const onMigrate = useCallback(
    async (oldToken, fromAmount, toAmount, fee, proof) => {
      await _handleApprove(oldToken, fromAmount);
      const hash_ = await bankMigrationContract.write.migratee(
        [fromAmount, toAmount, proof],
        {
          from: account,
          value: fee,
        }
      );
      const receipt = await waitForTransaction({ hash: hash_ });
      return receipt;
    },
    [account, chainId, bankMigrationContract]
  );

  return { onMigrate };
}

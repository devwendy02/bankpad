import { useMemo, useRef, useState } from "react";
import moment from "moment";
import Button from "components/Butttons/Button";
import Header1 from "components/Typography/Header1";
import useNotification from "hooks/useNotification";
import IconButton from "components/Butttons/IconButton";
import { Copy } from "components/Icons";
import { useActiveWeb3 } from "hooks/useActiveWeb3";
import { formatNumber, getBalanceNumber } from "utils/formatBalance";
import { isUserRejected } from "utils/sentry";
import { TokenPairs, useStateData } from "./context/MigrationContext";
import { useMigrate } from "./hooks/useMigrate";
import useApproveToken from "../../hooks/useApproveToken";

const cls = {
  headerContainerClass:
    "px-3 border border-gray-200 rounded-md bg-gray-19 dark:bg-dark-3 dark:border-dark-1 md:pl-4 md:pr-5 mb-5",
  headerWrapClass: "flex justify-center pt-5 pb-3 relative mb-2.5",
  mainContentClass: "flex justify-center",
  leftClass: "w-full",
  leftContentClass:
    "pb-8 bg-gray-19 dark:bg-dark-3 rounded-md border-gray-300 border dark:border-dark-1 py-4 px-6 sm:px-8",
  rowClass:
    "flex pt-2.5 pb-5 border-b dark:border-dark-8 items-center border-gray-300 gap-3",
  rowLeftClass: "w-1/2 text-base md:w-5/12 dark:text-white",
  rowRightClass: "w-1/2 text-base truncate md:w-7/12 dark:text-white",
  rowRightClass1: "flex-1 w-1/2 min-w-0 text-base md:w-7/12 dark:text-white",
};

export default function Migration() {
  const [pendingTx, setPendingTx] = useState(false);
  const { failed, success } = useNotification();
  const {
    migratableBalance,
    migratedBalance,
    migrationFee,
    oldBalance,
    proof,
  } = useStateData();
  const { chainId } = useActiveWeb3();
  const { onMigrate } = useMigrate();
  const { onApprove } = useApproveToken();

  const tokenPair = useMemo(
    () => (chainId in TokenPairs ? TokenPairs[chainId] : null),
    [chainId]
  );

  const inputEl = useRef<HTMLInputElement>(null);
  const onClickCopy = (address) => {
    if (inputEl && inputEl.current) {
      navigator.clipboard.writeText(address);
      success("Copied address!");
    }
  };

  const handleApprove = async () => {

  }

  const handleMigrate = async () => {
    try {
      setPendingTx(true);
      const receipt = await onMigrate(
        tokenPair.old,
        migratableBalance.toFixed(),
        migratableBalance.toFixed(),
        migrationFee.toFixed(),
        proof
      );
      if (!receipt?.status) {
        failed("Something went wrong. Please try again.");
      } else {
        success("New bank token migrated to your wallet!");
      }
    } catch (err) {
      if (!isUserRejected(err)) {
        console.error(err);
        failed("Something went wrong. Please try again.");
      }
    } finally {
      setPendingTx(false);
    }
  };

  return (
    <>
      <div className={cls.headerContainerClass}>
        <div className={cls.headerWrapClass}>
          <Header1 text="Bank Migration" />
        </div>
      </div>

      <div className={cls.mainContentClass}>
        <div className={cls.leftClass}>
          <div className={cls.leftContentClass}>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>Old Bank Token</div>
              <div className={cls.rowRightClass1}>
                <div className="flex items-center gap-2">
                  <div className="relative mt-1 group">
                    {/* <!-- Tooltip --> */}
                    <IconButton
                      icon={<Copy />}
                      tooltip="Copy address"
                      onClick={() => {
                        onClickCopy(tokenPair ? tokenPair.old : "");
                      }}
                      no_bg
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p ref={inputEl} className="pr-4 truncate">
                      {tokenPair ? tokenPair.old : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>New Bank Token</div>
              <div className={cls.rowRightClass1}>
                <div className="flex items-center gap-2">
                  <div className="relative mt-1 group">
                    {/* <!-- Tooltip --> */}
                    <IconButton
                      icon={<Copy />}
                      tooltip="Copy address"
                      onClick={() => {
                        onClickCopy(tokenPair ? tokenPair.new : "");
                      }}
                      no_bg
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p ref={inputEl} className="pr-4 truncate">
                      {tokenPair ? tokenPair.new : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>Old Balance</div>
              <div className={cls.rowRightClass}>
                {formatNumber(getBalanceNumber(oldBalance), 0, 3)}
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>Migrated Balance</div>
              <div className={cls.rowRightClass}>
                {formatNumber(getBalanceNumber(migratedBalance), 0, 3)}
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>Migratable Balance</div>
              <div className={cls.rowRightClass}>
                {formatNumber(getBalanceNumber(migratableBalance), 0, 3)}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Button
                  label="MIGRATE"
                  onClick={handleMigrate}
                  disabled={
                      pendingTx || !migratableBalance?.isGreaterThan(migratedBalance)
                  }
                  fullBtn
                  outline
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

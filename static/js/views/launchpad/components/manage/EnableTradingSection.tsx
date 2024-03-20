import { useState } from "react"
import Header6 from "components/Typography/Header6"
import ToggleButton from 'components/Butttons/ToggleButton';
import { useActiveWeb3 } from "hooks/useActiveWeb3"
import useNotification from "hooks/useNotification"
import { isSameAddress } from "utils"
import { isUserRejected } from "utils/sentry"
import useUpdateToken from "../../hooks/useUpdateToken"
import { useEventStatus, useTokenProject } from "../../context/TokenContext"
import TransactionModal from "../TransactionModal"

const EnableTradingSection = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { account } = useActiveWeb3()
  const { setEventEmitted } = useEventStatus()
  const { onEnableTrading, hash } = useUpdateToken()
  const { failed } = useNotification()
  const { project } = useTokenProject()

  const handleEnableTrading = async () => {
    try {
      setEventEmitted(false)
      setPendingTx(true)
      setShowModal(true)
      const receipt = await onEnableTrading()
      if (!receipt?.status) {
        failed('Something went wrong. Please try again.')
      }
    } catch (err) {
      if (!isUserRejected(err)) {
        console.error(err)
        failed('Something went wrong. Please try again.')
      }
      setShowModal(false)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    isSameAddress(account, project?.owner_address)
      && project?.can_enable_trading
      ? (
        <>
          <ToggleButton label='Enable Trading'
            checked={pendingTx}
            disabled={pendingTx}
            onChange={handleEnableTrading}
          />
          <TransactionModal
            showModal={showModal}
            setShowModal={setShowModal}
            title={<Header6 text="Enabling" span="Trading" />}
            titleAfter={<Header6 text="Enabled" span="Trading" />}
            hash={hash}
          />
        </>
      ) : <></>
  )
}

export default EnableTradingSection

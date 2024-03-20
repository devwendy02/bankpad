import { useState } from "react"
import Header6 from "components/Typography/Header6"
import Note from "components/Widgets/Note"
import { useActiveWeb3 } from "hooks/useActiveWeb3"
import useNotification from "hooks/useNotification"
import { isSameAddress } from "utils"
import { isUserRejected } from "utils/sentry"
import useUpdateToken from "../../hooks/useUpdateToken"
import { useEventStatus, useTokenProject } from "../../context/TokenContext"
import TransactionModal from "../TransactionModal"

const RenounceSection = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { account, chainId } = useActiveWeb3()
  const { setEventEmitted } = useEventStatus()
  const { onRenounce, hash } = useUpdateToken()
  const { failed } = useNotification()
  const { project } = useTokenProject()

  const handleRenounce = async () => {
    try {
      setEventEmitted(false)
      setPendingTx(true)
      setShowModal(true)
      const receipt = await onRenounce()
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
    isSameAddress(account, project?.owner_address) ? (
      <>
        <Note
          note={`Tax must be less than ${project?.max_tax_to_renounce}% to renounce your contract`}
          onClick={handleRenounce}
          disabled={
            pendingTx
            || Number(project?.buy_tax) > Number(project?.max_tax_to_renounce)
            || Number(project?.sell_tax) > Number(project?.max_tax_to_renounce)
            || Number(project?.treasury_tax) > Number(project?.max_tax_to_renounce)
          }
        />
        <TransactionModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={<Header6 text="Renouncing" span="Ownership" />}
          titleAfter={<Header6 text="Renounced" span="Ownership" />}
          hash={hash}
        />
      </>
    ) : <></>
  )
}

export default RenounceSection

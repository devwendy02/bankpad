import { ClockIconFill, FourStarRound, LoadingBars, ModalBg2, ModalBg3 } from "components/Icons"
import CustomModal from "components/Modal/CustomModal"
import { useActiveWeb3 } from "hooks/useActiveWeb3"
import { useEventStatus } from "../context/TokenContext"
import { getBlockExploreLink } from "utils"

interface Props {
  hash: string
  showModal: boolean
  setShowModal: (flag) => void
  title: any
  titleAfter: any
  content?: any
  contentAfter?: any
}

function TransactionModal({
  hash,
  showModal,
  setShowModal,
  title,
  titleAfter,
  content,
  contentAfter
}: Props) {
  const { eventEmitted } = useEventStatus()
  const { chain } = useActiveWeb3()

  return (
    <CustomModal
      showModal={showModal}
      setShowModal={setShowModal}
      children={
        <>
          <div className="relative z-10 w-full max-w-screen-sm m-auto overflow-hidden bg-white border rounded-2xl dark:border-gray-18 border-gray-19 dark:bg-dark-1">
            <button className="absolute z-10 right-2 top-2" onClick={() => setShowModal(false)}>
              <ClockIconFill />
            </button>

            <div className="popup-modal relative">
              <ModalBg2 className="popup-modal-top-image hidden w-full dark:block" />
              <ModalBg3 className="w-full dark:hidden" />
              {eventEmitted
                ? <img src="/assets/imgs/yes.png" alt="" className="absolute inset-0 z-10 w-2/12 m-auto sm:w-28" />
                : <LoadingBars className="absolute inset-0 z-10 w-2/12 m-auto sm:w-25" />
              }
            </div>

            <div className="px-6 pt-5 pb-11">
              {eventEmitted ? titleAfter : title}
              <div className="mb-4 space-y-2">
                {content}
              </div>

              {eventEmitted && contentAfter ? (
                contentAfter
              ) : hash ? (
                <div className='flex justify-center'>
                  <a
                    className='font-medium text-yellow-2 dark:text-yellow-1 text-underline'
                    href={getBlockExploreLink(hash, "transaction", chain?.id)}
                    target='_blank'>
                    View on explorer
                  </a>
                </div>
              ) : (<></>)
              }
            </div>
          </div>
        </>}
    />
  )
}

export default TransactionModal

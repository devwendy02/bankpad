import { useEffect, useMemo, useRef, useState } from 'react';
import Button from 'components/Butttons/Button';
import StyledTextInput2 from 'components/Form/StyledTextInput2';
import { FourStarRound } from 'components/Icons';
import Header6 from 'components/Typography/Header6';
import Tiny from 'components/Typography/Tiny';
import { useServiceLimit } from 'contexts/BankServiceContext';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import useNotification from 'hooks/useNotification';
import { isSameAddress } from 'utils';
import { isUserRejected } from 'utils/sentry';
import { useEventStatus, useTokenProject } from '../../context/TokenContext';
import useUpdateToken from '../../hooks/useUpdateToken';
import TransactionModal from '../TransactionModal';

const AntiBotSection = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [txLimit, setTxLimit] = useState(0)
  const [holdLimit, setHoldLimit] = useState(0)

  const { account } = useActiveWeb3()
  const { setEventEmitted } = useEventStatus()
  const { project } = useTokenProject()
  const serviceLimit = useServiceLimit()
  const { failed } = useNotification()
  const { onUpdateLimit, hash } = useUpdateToken()

  useEffect(() => {
    if (project) {
      setTxLimit(project.max_tokens_per_transaction_percent)
      setHoldLimit(project.max_tokens_per_wallet_percent)
    }
  }, [project])

  const isOwner = useMemo(() => isSameAddress(account, project?.owner_address), [account, project])
  const txLimitAmount = useMemo(() => {
    if (project && txLimit)
      return project.total_supply * txLimit / 100
    return 0
  }, [project, txLimit])

  const holdLimitAmount = useMemo(() => {
    if (project && holdLimit)
      return project.total_supply * holdLimit / 100
    return 0
  }, [project, holdLimit])

  const handleUpdateLimit = async () => {
    try {
      if (holdLimit * 1 < project?.max_tokens_per_wallet_percent
        || txLimit * 1 < project?.max_tokens_per_transaction_percent) {
        failed('Max limits can be increased only')
        return
      }

      if (holdLimit * 1 > serviceLimit?.max_tokens_per_wallet
        || txLimit * 1 > serviceLimit?.max_tokens_per_transaction) {
        failed('Too much max limits')
        return
      }

      if (holdLimit * 1 < txLimit * 1) {
        failed('Max tokens per transaction should be less than max tokens per wallet')
        return
      }
      setEventEmitted(false)
      setPendingTx(true)
      setShowModal(true)
      const receipt = await onUpdateLimit(
        Math.floor(holdLimit * 100), Math.floor(txLimit * 100)
      )
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
    <div className="px-5 py-6">
      <StyledTextInput2
        type="number"
        label={'Max tokens per trade'}
        min={serviceLimit?.min_tokens_per_transaction}
        max={serviceLimit?.max_tokens_per_transaction}
        value={txLimit}
        onChange={(e) => setTxLimit(e.target.value)}
        start_icon={'%'}
        disabled={project?.renounced || !isOwner}
        isError1={txLimit && txLimit > serviceLimit?.max_tokens_per_transaction}
        errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_tokens_per_transaction}</span>`}
        isError2={txLimit && txLimit < serviceLimit?.min_tokens_per_transaction}
        errorMessage2={`Value should not be less than <span>${serviceLimit?.min_tokens_per_transaction}</span>`}
        className="mb-5"
        low_text={'The maximum number of tokens that can be traded in a single transaction'}
        symbol={project?.symbol}
        secondValeu={txLimitAmount}
        isEndIconHidden
      />

      <StyledTextInput2
        label={'Max tokens per wallet'}
        min={serviceLimit?.min_tokens_per_wallet}
        max={serviceLimit?.max_tokens_per_wallet}
        value={holdLimit}
        onChange={(e) => setHoldLimit(e.target.value)}
        start_icon={'%'}
        disabled={project?.renounced || !isOwner}
        isError1={holdLimit && holdLimit > serviceLimit?.max_tokens_per_wallet}
        errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_tokens_per_wallet}</span>`}
        isError2={holdLimit && holdLimit < serviceLimit?.min_tokens_per_wallet}
        errorMessage2={`Value should not be less than <span>${serviceLimit?.min_tokens_per_wallet}</span>`}
        className="mb-5"
        low_text={'The maximum number of tokens a single wallet can hold'}
        symbol={project?.symbol}
        secondValeu={holdLimitAmount}
        isEndIconHidden
      />
      {
        isOwner && <Button
          label='UPDATE ANTI-BOT'
          onClick={handleUpdateLimit}
          disabled={pendingTx}
          fullBtn
        />
      }

      <TransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={<Header6 text="Updating" span="Anti-Bot" />}
        titleAfter={<Header6 text="Updated" span="Anti-Bot" />}
        content={(
          <>
            <div className="flex items-center space-x-4">
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Update max tokens per trade to <span className="font-medium dark:text-yellow-1">{txLimit} %</span></>} />
            </div>
            <div className="flex items-center space-x-4">
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Update max tokens per wallet to <span className="font-medium dark:text-yellow-1">{holdLimit} %</span></>} />
            </div>
          </>
        )}
        hash={hash}
      />
    </div>
  )
}

export default AntiBotSection

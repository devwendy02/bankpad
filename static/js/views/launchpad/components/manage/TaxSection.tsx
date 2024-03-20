import { useEffect, useMemo, useState } from 'react';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import useNotification from 'hooks/useNotification';
import { isSameAddress } from 'utils';
import { isUserRejected } from 'utils/sentry';
import StyledTextInput1 from 'components/Form/StyledTextInput1';
import Button from 'components/Butttons/Button';
import Connector from 'components/Widgets/Connector';
import Header6 from 'components/Typography/Header6';
import { FourStarRound } from 'components/Icons';
import Tiny from 'components/Typography/Tiny';
import {
  useEventStatus,
  useTokenProject
} from '../../context/TokenContext';
import useUpdateToken from '../../hooks/useUpdateToken';
import TransactionModal from '../TransactionModal';

const TaxSection = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [buyTax, setBuyTax] = useState(0)
  const [sellTax, setSellTax] = useState(0)
  const [treasuryTax, setTreasuryTax] = useState(0)

  const { project } = useTokenProject()
  const { onUpdateTax, hash } = useUpdateToken()
  const { success, failed } = useNotification()
  const { account } = useActiveWeb3()
  const { setEventEmitted } = useEventStatus()

  const isOwner = useMemo(() => isSameAddress(account, project?.owner_address), [account, project])
  const bankpadBuyTax = useMemo(() => {
    if (buyTax)
      return Math.floor(buyTax * project.tax_payout_fee * 100) / 10000
    return 0
  }, [buyTax])
  const bankpadSellTax = useMemo(() => {
    if (sellTax)
      return Math.floor(sellTax * project.tax_payout_fee * 100) / 10000
    return 0
  }, [sellTax])
  const bankpadTreasuryTax = useMemo(() => {
    if (treasuryTax)
      return Math.floor(treasuryTax * project.tax_payout_fee * 100) / 10000
    return 0
  }, [treasuryTax])

  const handleUpdateTax = async () => {
    try {
      if (buyTax * 1 > Math.max(project?.max_buy_tax_after, project?.buy_tax)
        || sellTax * 1 > Math.max(project?.max_sell_tax_after, project?.sell_tax)
        || treasuryTax * 1 > Math.max(project?.max_treasury_tax_after, project?.treasury_tax)) {
        failed('Invalid tax values configured')
        return
      }
      setPendingTx(true)
      setShowModal(true)
      setEventEmitted(false)
      const receipt = await onUpdateTax(
        Math.floor(buyTax * 100),
        Math.floor(sellTax * 100),
        Math.floor(treasuryTax * 100)
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

  useEffect(() => {
    if (project) {
      setBuyTax(project.buy_tax)
      setSellTax(project.sell_tax)
      setTreasuryTax(project.treasury_tax)
    }
  }, [project])

  return (
    <div className="px-5 py-6">
      <StyledTextInput1
        type="number"
        label={'Buy Tax'}
        href='https://docs.bankai.app/bankpad/features-of-bankpad/token-launching/setting-up-taxes'
        linkLabel={'Understand taxes'}
        min={0}
        value={buyTax}
        max={project?.max_buy_tax_after}
        onChange={(e) => setBuyTax(e.target.value)}
        isError1={buyTax * 1 > Math.max(project?.max_buy_tax_after, project?.buy_tax)}
        errorMessage1={`Value should not be greater than <span>${Math.max(project?.max_buy_tax_after, project?.buy_tax)}</span>`}
        start_icon={'%'}
        disabled={project?.renounced || !isOwner}
        className=""
        low_left_text={`${bankpadBuyTax}% BankPad tax`}
        low_right_text='Total buy tax:'
        low_right_value={`${Math.floor((buyTax * 1 + bankpadBuyTax) * 100) / 100}%`}
      />
      <Connector type='vertical' icon='plus' />
      <StyledTextInput1
        type="number"
        label={'Sell Tax'}
        min={0}
        max={project?.max_sell_tax_after}
        value={sellTax}
        onChange={(e) => setSellTax(e.target.value)}
        isError1={sellTax * 1 > Math.max(project?.max_sell_tax_after, project?.sell_tax)}
        errorMessage1={`Value should not be greater than <span>${Math.max(project?.max_sell_tax_after, project?.sell_tax)}</span>`}
        start_icon={'%'}
        disabled={project?.renounced || !isOwner}
        className="mb-5 -mt-8"
        low_left_text={`${bankpadSellTax}% BankPad tax`}
        low_right_text='Total sell tax:'
        low_right_value={`${Math.floor((sellTax * 1 + bankpadSellTax) * 100) / 100}%`}
      />

      <StyledTextInput1
        label={'Treasury Tax'}
        min={0}
        max={project?.max_treasury_tax_after}
        value={treasuryTax}
        onChange={(e) => setTreasuryTax(e.target.value)}
        isError1={treasuryTax * 1 > Math.max(project?.max_treasury_tax_after, project?.treasury_tax)}
        errorMessage1={`Value should not be greater than <span>${Math.max(project?.max_treasury_tax_after, project?.treasury_tax)}</span>`}
        start_icon={'%'}
        disabled={project?.renounced || !isOwner}
        className="mb-8"
        low_left_text={`${bankpadTreasuryTax}% BankPad tax`}
        low_right_text='Total treasury tax:'
        low_right_value={`${Math.floor((treasuryTax * 1 + bankpadTreasuryTax) * 100) / 100}%`}
      />
      {
        isOwner && <Button
          label='UPDATE TAXES'
          onClick={handleUpdateTax}
          disabled={pendingTx}
          fullBtn
        />
      }

      <TransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={<Header6 text="Updating" span="Taxes" />}
        titleAfter={<Header6 text="Updated" span="Taxes" />}
        content={(
          <>
            <div className="flex items-center space-x-4">
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Update buy tax to <span className="font-medium dark:text-yellow-1">{buyTax} %</span></>} />
            </div>
            <div className="flex items-center space-x-4">
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Update sell tax to <span className="font-medium dark:text-yellow-1">{sellTax} %</span></>} />
            </div>
            <div className="flex items-center space-x-4">
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Update treasury tax to <span className="font-medium dark:text-yellow-1">{treasuryTax} %</span></>} />
            </div>
          </>
        )}
        hash={hash}
      />
    </div>
  )
}

export default TaxSection

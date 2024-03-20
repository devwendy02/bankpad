import { useEffect, useMemo, useState } from 'react';
import { isAddress } from 'viem';
import { useServiceLimit } from 'contexts/BankServiceContext';
import { useTokenDraft, useTokenProject } from '../../context/TokenContext';
import { useChangePage } from '../../hooks/useChangePage';
import { TokenCreationStep } from '../../types';
import TextInput from 'components/Form/TextInput';
import Header3 from 'components/Typography/Header3';
import P from 'components/Typography/P';
import Note from 'components/Widgets/Note';
import StyledTextInput1 from 'components/Form/StyledTextInput1';
import Connector from 'components/Widgets/Connector';
import Label1 from 'components/Typography/Label1';
import SetUserButton from 'components/Butttons/SetUserButton';
import Pannel from 'components/Widgets/Pannel';
import Header4 from 'components/Typography/Header4';
import SwitchOnOff from 'components/Butttons/SwitchOnOff';
import { Plus } from 'components/Icons';
import Tiny from 'components/Typography/Tiny';
import StepButton from 'components/Butttons/StepButton';

interface Props {
  setIsLoading?: any;
}

export default function Taxes({ setIsLoading }: Props) {
  const [isTreasuryEnabled, enableTreasury] = useState(false)

  const serviceLimit = useServiceLimit()
  const { project } = useTokenProject()
  const { draft, updateDraft } = useTokenDraft()
  const { onChangePage } = useChangePage()

  useEffect(() => {
    enableTreasury(project?.treasury_tax > 0 && project?.treasury_payout_address)
  }, [project])

  const bankpadBuyTax = useMemo(() => {
    if (!draft || !serviceLimit) return 0
    return Math.floor(draft.buy_tax * serviceLimit.tax_payout_fee * 100) / 10000;
  }, [draft, serviceLimit])

  const totalBuyTax = useMemo(() => {
    if (!draft) return 0
    return Math.floor((Number(draft.buy_tax) + bankpadBuyTax) * 100) / 100
  }, [draft, bankpadBuyTax])

  const bankpadSellTax = useMemo(() => {
    if (!draft || !serviceLimit) return 0
    return Math.floor(draft.sell_tax * serviceLimit.tax_payout_fee * 100) / 10000;
  }, [draft, serviceLimit])

  const totalSellTax = useMemo(() => {
    if (!draft) return 0
    return Math.floor((Number(draft.sell_tax) + bankpadSellTax) * 100) / 100
  }, [draft, bankpadSellTax])

  const bankpadTreasuryTax = useMemo(() => {
    if (!draft || !serviceLimit) return 0
    return Math.floor(draft.treasury_tax * serviceLimit.tax_payout_fee * 100) / 10000;
  }, [draft, serviceLimit])

  const totalTreasuryTax = useMemo(() => {
    if (!draft) return 0
    return Math.floor((Number(draft.treasury_tax) + bankpadTreasuryTax) * 100) / 100
  }, [draft, bankpadTreasuryTax])

  return (
    <>
      <Header3 text="Buy & sell taxes" />
      <div className="max-w-screen-lg lg:pr-36">
        <P text="Optionally add a buy and/or sell tax on Uniswap V2 trades. Taxes are auto-sold for ETH at regular intervals." />
      </div>
      <div className="">
        <Note
          note="Tax values you set now can only be decreased later, never increased above set value."
          subText1="BankPad adds a small tax on top of your sell tax as a service fee."
          subText2={`Our tax is removed ${serviceLimit?.tax_payout_duration_days} days after your token launches, or when your tax is set to 0%.`}
          className="flex-col !items-start"
        />
        <div className="mb-8">
          <div className="grid mb-2 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <StyledTextInput1
                type="number"
                label={'Buy tax'}
                placeholder={0}
                min={0}
                max={serviceLimit?.max_buy_tax}
                value={draft?.buy_tax}
                onChange={(evt) => {
                  updateDraft({ buy_tax: evt.target.value })
                }}
                isError1={draft?.buy_tax > serviceLimit?.max_buy_tax}
                errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_buy_tax}</span>`}
                start_icon={'%'}
                size="sm"
                className=""
                low_left_text={`${bankpadBuyTax || 0}% BankPad tax`}
                low_right_text="Total buy tax:"
                low_right_value={`${totalBuyTax || 0}%`}
              />
            </div>

            <Connector type="horizontal" icon="plus" className="-mt-8 sm:-mt-0" lineSize="h-6" />
            <div className="-mt-8 sm:col-span-5 sm:-mt-0">
              <StyledTextInput1
                type="number"
                label={'Sell tax'}
                placeholder={0}
                min={0} max={serviceLimit?.max_sell_tax}
                value={draft?.sell_tax}
                onChange={(evt) => {
                  updateDraft({ sell_tax: evt.target.value })
                }}
                isError1={draft?.sell_tax > serviceLimit?.max_sell_tax}
                errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_sell_tax}</span>`}
                start_icon={'%'}
                className=""
                low_left_text={`${bankpadSellTax || 0}% BankPad tax`}
                low_right_text="Total sell tax:"
                low_right_value={`${totalSellTax || 0}%`}
                size="sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Label1 text="Tax payout address" />
          <TextInput
            inputClassName="pr-16"
            placeholder="Wallet address"
            value={draft?.tax_payout_address}
            onChange={(evt) => {
              updateDraft({ tax_payout_address: evt.target.value })
            }}
            isError1={draft?.tax_payout_address && !isAddress(draft?.tax_payout_address?.trim()?.toLowerCase())}
            errorMessage1={"Invalid wallet address"}
            end_Btn={<SetUserButton onClick={() => {
              updateDraft({ tax_payout_address: draft?.owner_address })
            }} />}
            className="mb-2"
            size="sm"
          />
          <P text="This is the address to which earned taxes will be paid out to." small />
        </div>
        <Pannel>
          <div className="flex items-center justify-between">
            <Header4 text="Treasury/Staking" />
            <SwitchOnOff
              switched={isTreasuryEnabled}
              onChange={(val) => {
                if (!val) {
                  updateDraft({ treasury_tax: '0', treasury_payout_address: null })
                }
                enableTreasury(val)
              }}
            />
          </div>
          {
            isTreasuryEnabled &&
            <>
              <div className="mt-4">
                <div className="mb-4">
                  <P medium text="Additional optional taxes for treasury or staking pool" />
                </div>
                <div className="grid sm:grid-cols-12">
                  <div className="sm:col-span-4 md:col-span-3">
                    <TextInput
                      type="number"
                      inputClassName="input-active"
                      placeholder={0}
                      value={draft?.treasury_tax}
                      onChange={(evt) => {
                        updateDraft({ treasury_tax: evt.target.value })
                      }}
                      min={0}
                      max={serviceLimit?.max_treasury_tax}
                      isError1={draft?.treasury_tax > serviceLimit?.max_treasury_tax}
                      errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_treasury_tax}</span>`}
                      start_icon={'%'}
                    />
                  </div>
                  <Connector type="horizontal" icon="right" />
                  <div className="sm:col-span-6 md:col-span-7">
                    <TextInput
                      inputClassName="input-active pr-16"
                      placeholder="Wallet address"
                      value={draft?.treasury_payout_address}
                      onChange={(evt) => {
                        updateDraft({ treasury_payout_address: evt.target.value })
                      }}
                      isError1={draft?.treasury_payout_address
                        && !isAddress(draft?.treasury_payout_address?.trim()?.toLowerCase())}
                      errorMessage1={"Invalid wallet address"}
                      end_Btn={<SetUserButton onClick={() => {
                        updateDraft({ treasury_payout_address: draft?.owner_address })
                      }} />}

                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-between">
                <div className="flex items-center">
                  <Plus className="opacity-70 dark:opacity-100" />
                  <Tiny text={`${bankpadTreasuryTax || 0}% BankPad tax`} className="text-sm ml-2" />
                </div>
                <Tiny subText={'Total treasury/staking tax:'} text={`${totalTreasuryTax || 0}%`} subTextClassName="text-sm mr-2" />
              </div>
            </>
          }
        </Pannel>

      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-9">

        <StepButton
          label="Anti-Bot"
          onClick={() => {
            onChangePage(TokenCreationStep.ANTIBOT)
          }}
          startIcon={<i className="fas fa-arrow-left" />}
        />

        <StepButton
          label="Liquidity"
          endIcon={<i className="fas fa-arrow-right" />}
          onClick={() => {
            onChangePage(TokenCreationStep.LIQUIDITY)
          }}
        />


      </div>
    </>
  )
}

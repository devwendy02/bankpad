import {useMemo} from 'react';
import CustomDropdown from 'components/dropdown/CustomDropdown';
import {useDexs, useServiceLimit} from 'contexts/BankServiceContext';
import {ETH_ADDRESS} from 'config';
import {putCommas} from 'utils';
import {formatPrice} from 'utils/formatBalance';
import {useTokenDraft} from '../../context/TokenContext';
import {useChangePage} from '../../hooks/useChangePage';
import {useMarketCap} from '../../hooks/useMarketCap';
import {LockPeriod, TokenCreationStep} from '../../types';
import TextInput from 'components/Form/TextInput';
import Header3 from 'components/Typography/Header3';
import P from 'components/Typography/P';
import Connector from 'components/Widgets/Connector';
import Label1 from 'components/Typography/Label1';
import Tiny from 'components/Typography/Tiny';
import Pannel from 'components/Widgets/Pannel';
import Header4 from 'components/Typography/Header4';
import SwitchOnOff from 'components/Butttons/SwitchOnOff';
import SwitchLockBurn from 'components/Butttons/SwitchLockBurn';
import {FourStar} from 'components/Icons';
import StepButton from 'components/Butttons/StepButton';

interface Props {
    setIsLoading?: any;
}

export default function Liquidity({setIsLoading}: Props) {
    const {onChangePage} = useChangePage()
    const {draft, updateDraft} = useTokenDraft()
    const serviceLimit = useServiceLimit()
    const dexs = useDexs()
    const {marketcap} = useMarketCap()

    const dex = useMemo(() => dexs?.find((dex) => dex.name == draft?.pair_provider), [draft, dexs])

    const pairToken = useMemo(() => {
        if (!dex || !draft) return {label: 'ETH', value: ETH_ADDRESS}
        const pairToken_ = dex.currencies.find((tk) => tk.address == draft.pair_address)
        if (pairToken_) return {label: pairToken_.symbol.toUpperCase(), value: pairToken_.address}
        return {label: 'ETH', value: ETH_ADDRESS}
    }, [dex, draft])

    const minPairAmount = useMemo(() => {
        if (draft?.pair_address == ETH_ADDRESS) return serviceLimit?.min_pair_eth || 0
        return serviceLimit?.min_pair_usdc || 0
    }, [serviceLimit, draft])

    const availableTokens = useMemo(() => {
        if (draft) return draft.total_supply * (100 - draft.team_allocation_percent) / 100
        return 0
    }, [draft])


    const periodCatList = [
        {label: LockPeriod.MONTHS, value: LockPeriod.MONTHS},
        {label: LockPeriod.YEARS, value: LockPeriod.YEARS},
    ]

    const dexList = dexs?.map((dex) => ({label: dex.display_name, value: dex.name}))

    const pairTokenList = useMemo(() => {
        if (!dex) return []
        return dex.currencies.map((tk, k) => (
            {label: tk.symbol.toUpperCase(), value: tk.address}
        ))
    }, [dex])

    return (
        <>
            <Header3 text="Initial Liquidity"/>
            <div className="max-w-screen-lg lg:pr-36">
                <P text={`Pair the remainder of your token supply with an amount of ${pairToken.label} you choose to set up the initial liquidity pool.`}/>
            </div>
            <div className="">
                <div className="grid items-center mb-8 xl:grid-cols-12 gap-y-3">
                    <div className="xl:col-span-5">
                        <div className="grid items-end grid-cols-12 gap-y-3 sm:gap-y-0 mb-3">
                            <div className="col-span-full xl:col-span-9">
                                <Label1 text="Exchange (DEX)"/>

                                <div className="flex items-center">
                                    <div className="w-6/12 react-dropdown-wrapper ts-wrapper dark:!bg-dark-3 !bg-gray-19 rounded-md dark:text-white single full select-UniSwap">
                                        <CustomDropdown
                                            value={dex
                                                ? {label: dex.display_name, value: dex.name}
                                                : dexList.length > 0 ? dexList[0] : {
                                                    label: "Uniswap V2",
                                                    value: "uniswap_v2"
                                                }}
                                            options={dexList}
                                            onChange={(value) => {
                                                updateDraft({pair_provider: value})
                                            }}/>
                                    </div>
                                    <div className="w-1/12 h-px dark:bg-gray-15/35 bg-gray-19"></div>
                                    <div className="w-5/12 react-dropdown-wrapper ts-wrapper dark:!bg-dark-3 !bg-gray-19 rounded-md dark:text-white single full select-ETH">
                                        <CustomDropdown
                                            options={pairTokenList}
                                            value={pairToken}
                                            onChange={(value) => {
                                                updateDraft({pair_address: value})
                                            }}/>
                                    </div>
                                </div>
                            </div>
                            <Connector type="horizontal" icon="right" className="hidden xl:col-span-3 xl:flex"/>

                        </div>
                        <Tiny subText="The DEX, amount you would like to add as liquidity" className=""/>

                    </div>

                    <div className="xl:col-span-7">
                        <div className="grid grid-cols-12">
                            <div className="col-span-4 pt-7 lg:pt-8 mr-3 sm:mr-0">
                                <TextInput
                                    type="number"
                                    label={<>Deposit {pairToken.label} </>}
                                    placeholder={0}
                                    min={minPairAmount}
                                    value={draft?.pair_amount}
                                    onChange={(evt) => {
                                        updateDraft({pair_amount: evt.target.value})
                                    }}
                                    isError1={draft?.pair_amount > 0 && draft?.pair_amount < minPairAmount}
                                    errorMessage1={`Pair amount should be greater than <span>${minPairAmount}${pairToken.label === 'ETH' ? ' ETH' : ' USDC'}</span>`}
                                    size="sm"
                                    start_icon={
                                        <img
                                            src={`/assets/icons/${draft?.pair_address}.png`}
                                            style={{width: '21px', height: '21px'}} alt=""/>
                                    }
                                />
                            </div>

                            <div className="hidden sm:block col-span-2 pt-7 lg:pt-8">
                                <Connector type="horizontal" icon="plus" className=" !flex-row" noLine/>
                            </div>

                            <div className="col-span-8 sm:col-span-6 pt-7 lg:pt-8 mb-2">
                                <TextInput
                                    label={'Deposit tokens'}
                                    value={putCommas(availableTokens) || 0}
                                    end_icon={<>{draft?.symbol}</>}
                                    size="sm"
                                />
                                <Tiny subText="Tokens from the pool" className="mt-3 text-right flex-1 block"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center w-full max-w-screen-lg mx-auto mb-8">
                    <div className="w-full h-0.5 dark:bg-dark-3 absolute inset-x-0"></div>
                    <div className="relative pr-3.5 bg-gray-19 dark:bg-dark-8 rounded-md flex items-center justify-between max-w-2xl w-full mx-auto">
                        <input type="text" id="" value="Market cap at launch" disabled
                               className="w-full px-5 py-3 text-lg font-medium rounded-md bg-gray-19 dark:bg-dark-8 md:py-4 dark:text-white placeholder:dark:text-gray-5"
                               placeholder="Market cap at launch"></input>
                        <span className="text-lg font-medium text-gray-500 dark:text-gray-13">{`$${formatPrice(marketcap)}`}</span>
                    </div>
                </div>
                <div className="pt-6">
                    <Pannel>
                        <div className="flex items-center justify-between">
                            <Header4 text="Lock or burn liquidity"/>
                            <SwitchLockBurn
                                switched={draft?.lp_burned}
                                onChange={(val) => {
                                    const lockProps = val ? {lp_lock_period: 1, lp_locked_for_years: false} : {}
                                    updateDraft({
                                        lp_burned: val,
                                        ...lockProps
                                    })
                                }}
                            />

                        </div>
                        <div className="mt-6 flex flex-col">
                            {!draft?.lp_burned
                              ? <div>
                                <P medium text="The amount of time you're willing to lock the initial liquidity you're adding for your token." />
                                <P medium text='After the initial lock period expires, you are free to withdraw the LP tokens or lock them again.' />
                                <div className="mt-4">
                                  <Label1 text="LP token lock period"/>
                                  <div className="grid grid-cols-12 mb-2.5">
                                    <div className="col-span-6 sm:col-span-5 mr-3 sm:mr-0">
                                      <TextInput
                                        type="number"
                                        inputClassName="input-active"
                                        label={'LP token lock period'}
                                        placeholder={0}
                                        min={1}
                                        value={draft?.lp_lock_period}
                                        onChange={(evt) => {
                                            updateDraft({lp_lock_period: evt.target.value})
                                        }}
                                        disabled={draft?.lp_burned}
                                        size="sm"
                                      />
                                    </div>
                                    <div className="hidden sm:block">
                                        <Connector type="horizontal" icon="right" className="col-span-2" noLine/>
                                    </div>
                                    <div className="col-span-6 sm:col-span-5">
                                      <div className="react-dropdown-wrapper input-active ts-wrapper dark:!bg-dark-3 !bg-gray-19 rounded-md dark:text-white single full select-month">
                                        <CustomDropdown
                                          options={periodCatList}
                                          value={draft?.lp_locked_for_years ? periodCatList[1] : periodCatList[0]}
                                          onChange={(value) => {
                                              updateDraft({
                                                  lp_locked_for_years:
                                                      value == LockPeriod.YEARS ? true : false
                                              })
                                          }}/>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <FourStar className="text-yellow-2 dark:text-yellow-1 w-5 h-5"/>
                                    <p className="text-base dark:text-yellow-1">Liquidity will be locked by
                                      <span className="text-base text-gray-400 dark:text-gray-4"> <a href="https://app.uncx.network/services/lock-liquidity/" target="_blank">Unicrypt locking service</a></span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                                :
                                <div>
                                    <P medium text='Your initial LP will be sent to the dead address which makes it ‘burnt’' />
                                    <P medium text='This means you can no longer access the initial LP tokens after the token is created' />
                                </div>
                            }
                        </div>
                    </Pannel>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-9">
                <StepButton
                    label="Taxes"
                    onClick={() => {
                        onChangePage(TokenCreationStep.TAX)
                    }}
                    startIcon={<i className="fas fa-arrow-left"/>}
                />
                <StepButton
                    label="Review & Launch "
                    endIcon={<i className="fas fa-arrow-right"/>}
                    onClick={() => {
                        onChangePage(TokenCreationStep.REVIEW)
                    }}
                />

            </div>
        </>
    )
}

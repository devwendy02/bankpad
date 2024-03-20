import { useEffect, useMemo, useRef, useState } from 'react';
import toast, { } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { getAddress } from 'viem';
import { CircularProgress } from "@mui/material";
import ExpandView from 'components/ExpandView';
import { ETH_ADDRESS } from 'config';
import { useDexs, useServiceFee } from 'contexts/BankServiceContext';
import useNotification from 'hooks/useNotification';
import { getBlockExploreLink, putCommas } from 'utils';
import { BIG_ZERO } from 'utils/bigNumber';
import { formatPrice } from 'utils/formatBalance';
import { isUserRejected } from 'utils/sentry';
import { useLaunch } from '../../hooks/useLaunch';
import { useMarketCap } from '../../hooks/useMarketCap';
import { useEventStatus, useTokenDraft } from '../../context/TokenContext';
import Header3 from 'components/Typography/Header3';
import P from 'components/Typography/P';
import Header4 from 'components/Typography/Header4';
import ExpanPannel from 'components/ExpandView/ExpanPannel';
import ExpanRow from 'components/ExpandView/ExpanRow';
import Pannel from 'components/Widgets/Pannel';
import { CheckIconBlue, ClockIconFill, Copy, FourStarRound, LoadingBars, ModalBg2, ModalBg3 } from 'components/Icons';
import Dvider2 from 'components/Widgets/Dvider2';
import Dvider3 from 'components/Widgets/Dvider3';
import Tiny from 'components/Typography/Tiny';
import TinyRed from 'components/Typography/TinyRed';
import Header6 from 'components/Typography/Header6';
import Button from 'components/Butttons/Button';
import Header7 from 'components/Typography/Header7';
import Switch from 'components/Butttons/Switch';
import CustomModal from 'components/Modal/CustomModal';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import TransactionModal from '../TransactionModal';
import Note from "../../../../components/Widgets/Note";

interface Props {
  setIsLoading?: any;
}

interface RowProps {
  label?: any;
  value?: any
  span?: string
  link?: string
  linkLabel?: string
  label2?: string
}

function ReviewDetailRow({ label, value, span, link, linkLabel, label2 }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <FourStarRound className="shrink-0" />
        <p className="text-sm dark:text-white">{label}
          {span && <span className="font-medium text-yellow-2 dark:text-yellow-1">{span}</span>}
          {link && <a href={link} target='_blank' className="font-medium text-gray-400 dark:text-gray-4">{linkLabel}</a>}
        </p>
      </div>

      {value && <div className="flex items-center gap-1">
        {value !== 'Not sure'}
        <div className="text-base font-medium text-right dark:text-white whitespace-nowrap">
          {value}
          <span className="ml-2 text-sm font-bold text-gray-400 dark:text-gray-4">{label2}</span>
        </div>
      </div>
      }
    </div>
  )
}

export default function Review({ setIsLoading }: Props) {
  const [pendingTx, setPendingTx] = useState(false)
  const [isExpaned, setIsExpanedx] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { setEventEmitted } = useEventStatus()

  const { chain } = useActiveWeb3()
  const chainCurrencySymbol = useMemo(() => chain?.nativeCurrency?.symbol || 'ETH', [chain])

  const [tradingConf, setTradingConf] = useState<{
    trading_delay: boolean, can_enable_trading: boolean
  }>({ trading_delay: false, can_enable_trading: false })

  const { draft } = useTokenDraft()
  const serviceFee = useServiceFee()
  const { success, failed } = useNotification()
  const { onLaunch, hash } = useLaunch()

  useEffect(() => {
    if (draft?.uuid) {
      const storageValue = localStorage.getItem(`launchpad-${draft?.uuid}-trading-conf`)
      if (storageValue) {
        const tradingConfObj = JSON.parse(storageValue)
        setTradingConf({ ...tradingConfObj })
      }
    }
  }, [draft?.uuid])

  const handleSwitch1 = (checked) => {
    const trading_delay = checked
    const can_enable_trading = trading_delay && tradingConf.can_enable_trading
      ? false : tradingConf.can_enable_trading
    setTradingConf({ trading_delay, can_enable_trading })
    localStorage.setItem(
      `launchpad-${draft?.uuid}-trading-conf`,
      JSON.stringify({ trading_delay, can_enable_trading })
    )
  }

  const handleSwitch2 = (checked) => {
    const can_enable_trading = checked
    const trading_delay = can_enable_trading && tradingConf.trading_delay
      ? false : tradingConf.trading_delay
    setTradingConf({ trading_delay, can_enable_trading })
    localStorage.setItem(
      `launchpad-${draft?.uuid}-trading-conf`,
      JSON.stringify({ trading_delay, can_enable_trading })
    )
  }

  const { marketcap, price } = useMarketCap()

  const requiredETH = useMemo(() => {
    if (!serviceFee || !draft) return ''
    let amount = BIG_ZERO
    amount = amount.plus(serviceFee.launch)

    if (draft.pair_address == ETH_ADDRESS) amount = amount.plus(draft.pair_amount)
    if (!draft.lp_burned) amount = amount.plus(serviceFee.lock_liquidity)
    if (tradingConf.trading_delay) amount = amount.plus(serviceFee.trading_delay)
    if (tradingConf.can_enable_trading) amount = amount.plus(serviceFee.enable_trading)
    return amount.toNumber()
  }, [serviceFee, draft, tradingConf])

  const telegramUrl = useMemo(() => {
    if (!draft) return '-'
    const telegram_url = draft.telegram_url
    if (!telegram_url) return '-'
    if (telegram_url.startsWith('https://t.me/')) return telegram_url
    return `https://t.me/${telegram_url}`
  }, [draft])

  const twitterUrl = useMemo(() => {
    if (!draft) return '-'
    const twitter_url = draft.twitter_url
    if (!twitter_url) return '-'
    if (twitter_url.startsWith('https://twitter.com/')) return twitter_url
    return `https://twitter.com/${twitter_url}`
  }, [draft])

  const websiteUrl = useMemo(() => {
    if (!draft) return '-'
    const website_url = draft.website_url
    if (!website_url) return '-'
    if (website_url.startsWith('https://')) return website_url
    return `https://${website_url}`
  }, [draft])

  const dexs = useDexs()
  const dex = useMemo(() => {
    return dexs?.find((dx) => dx.name === draft?.pair_provider)
  }, [draft, dexs])
  const pair_token = useMemo(() => {
    return dex?.currencies?.find((tk) => tk.address === draft?.pair_address)
  }, [dex, draft])
  // const [setLoading] = useLoader()
  const history = useHistory()

  const inputEl = useRef<HTMLInputElement>(null);
  const onCopy = () => {
    if (inputEl && inputEl.current) {
      navigator.clipboard.writeText(draft?.contract_address);
      toast.success('Copied Address!');
    }
  };

  const handleLaunch = async () => {
    try {
      setIsExpanedx(false)
      setPendingTx(true)
      setShowModal(true)
      setEventEmitted(false)
      const receipt = await onLaunch(tradingConf.trading_delay, tradingConf.can_enable_trading)
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
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-2">
        <div>
          <Header3 text='Review & Launch' />
          <div className="max-w-screen-lg lg:pr-36">
            <P text='Almost there! Review your token details and once finished you’re all good to launch.' />
          </div>
        </div>
        <div>
          <CircularProgress variant="determinate" value={100}
            sx={{
              color: '#FFE68B',
              // background: '#262626',
              borderRadius: 32,
            }}
            size={32}
          />
        </div>
      </div>

      <div className="mb-5">
        <ExpandView
          title='Token Details'
          isExpaned={isExpaned}
          children={
            <>
              <ExpanPannel>
                <ExpanRow label='TOKEN NAME' value={draft?.name} />
                <ExpanRow label='TOKEN SYMBOL' value={draft?.symbol} />
                <ExpanRow label='TOTAL SUPPLY' value={`${putCommas(draft?.total_supply)} ${draft?.symbol || ""}`} />
                <ExpanRow label='TELEGRAM' value={telegramUrl} />
                <ExpanRow label='TWITTER' value={twitterUrl} />
                <ExpanRow label='WEBSITE' value={websiteUrl} />
              </ExpanPannel>
            </>
          }
        />
        <Dvider2 />

        <ExpandView
          title='Distribution'
          isExpaned={isExpaned}
          children={
            <>
              <ExpanPannel>
                <ExpanRow
                  label='TEAM SUPPLY ALLOCATION'
                  value={draft?.team_allocation_percent > 0
                    ? `${draft?.team_allocation_percent} % = ${putCommas(draft?.total_supply * draft?.team_allocation_percent / 100)} ${draft?.symbol}`
                    : '-'}
                />
                <ExpanRow
                  label='TEAM SUPPLY ADDRESS'
                  value={draft?.team_allocation_address
                    ? getAddress(draft?.team_allocation_address) : '-'}
                />
              </ExpanPannel>
            </>
          }
        />
        <Dvider2 />

        <ExpandView
          title='Anti-Bot'
          isExpaned={isExpaned}
          children={
            <>
              <ExpanPannel>
                <ExpanRow
                  label='MAX TOKENS PER TRANSACTION'
                  value={draft?.max_tokens_per_transaction_percent > 0
                    ? `${draft?.max_tokens_per_transaction_percent} % = ${putCommas(draft?.total_supply * draft?.max_tokens_per_transaction_percent / 100)} ${draft?.symbol || ''}`
                    : '-'}
                />
                <ExpanRow
                  label='MAX TOKENS PER WALLET'
                  value={draft?.max_tokens_per_wallet_percent > 0
                    ? `${draft?.max_tokens_per_wallet_percent} % = ${putCommas(draft?.total_supply * draft?.max_tokens_per_wallet_percent / 100)} ${draft?.symbol || ''}`
                    : '-'}
                />
              </ExpanPannel>
            </>
          }
        />
        <Dvider2 />

        <ExpandView
          isExpaned={isExpaned}
          title='Taxes'
          children={
            <>
              <ExpanPannel>
                <ExpanRow
                  label='BUY TAX'
                  value={draft?.buy_tax > 0
                    ? `${draft?.buy_tax}% + ${draft?.buy_tax / 10}% BankPad tax = ${draft?.buy_tax * 11 / 10}% total buy tax`
                    : '-'}
                />

                <ExpanRow
                  label='SELL TAX'
                  value={draft?.sell_tax > 0
                    ? `${draft?.sell_tax}% + ${draft?.sell_tax / 10}% BankPad tax = ${draft?.sell_tax * 11 / 10}% total sell tax`
                    : '-'}
                />
                <ExpanRow
                  label='TAX PAYOUT ADDRESS'
                  value={draft?.tax_payout_address ? getAddress(draft?.tax_payout_address) : '-'}
                />
                <ExpanRow
                  label='TREASURY/STAKING TAX'
                  value={draft?.treasury_tax > 0
                    ? `${draft?.treasury_tax}% + ${draft?.treasury_tax / 10}% Bankpad tax = ${draft?.treasury_tax * 11 / 10}% total treasury tax`
                    : '-'}
                />
                <ExpanRow
                  label='TREASURY PAYOUT ADDRESS'
                  value={draft?.treasury_payout_address ? getAddress(draft?.treasury_payout_address) : '-'}
                />
              </ExpanPannel>
            </>
          }
        />
        <Dvider2 />

        <ExpandView
          isExpaned={isExpaned}
          title='Liquidity'
          children={
            <>
              <ExpanPannel>
                <ExpanRow
                  label={`${pair_token ? pair_token.symbol.toUpperCase() : 'ETH'} TO PAIR WITH TOKEN`}
                  value={draft?.pair_amount > 0
                    ? `${putCommas(draft?.pair_amount)} ${(pair_token?.symbol || 'ETH').toUpperCase()}`
                    : '-'}
                />
                <ExpanRow
                  label={`TOKEN TO PAIR WITH ${pair_token ? pair_token.symbol.toUpperCase() : 'ETH'}`}
                  value={draft?.team_allocation_percent > 0
                    ? putCommas(draft?.total_supply - draft?.total_supply * draft?.team_allocation_percent / 100)
                    : `${putCommas(draft?.total_supply)} ${draft?.symbol || ''}`}

                />
                <ExpanRow
                  label='MARKET CAP AT LAUNCH'
                  value={`$${formatPrice(marketcap)}`}
                />
                <ExpanRow
                  label='TOKEN PRICE'
                  value={`$${formatPrice(price)}`}
                />
                <ExpanRow
                  label='LP TOKEN LOCK DURATION'
                  value={draft?.lp_burned ? 'Burn LP' : `${draft?.lp_lock_period || ""} ${draft?.lp_locked_for_years ? 'Years' : 'Months'}`}
                />
              </ExpanPannel>
            </>
          }
        />
      </div>

      <Pannel>
        <Header4 text='Fees breakdown' />
        <div className="space-y-2">
          <ReviewDetailRow
            label='BankPad service fee'
            value={serviceFee ? `${serviceFee.launch}` : '-'}
            label2={chainCurrencySymbol}
          />
          <ReviewDetailRow
            label='Unicrypt service fee (for locking LP tokens)'
            value={serviceFee ? `${serviceFee.lock_liquidity}` : '-'}
            label2={chainCurrencySymbol}
          />
          <ReviewDetailRow
            label={<>Funds required for <span className='color1' style={{ textTransform: 'capitalize' }}>{dex?.display_name}</span> liquidity pool</>}
            value={draft?.pair_address == ETH_ADDRESS ? `${draft?.pair_amount || 0}` : 'Not Set'}
            label2={draft?.pair_address == ETH_ADDRESS ? chainCurrencySymbol : ''}
          />

          <div className="flex -mt-3 space-x-3">
            <div className="grow">
              <div className="flex items-center justify-between gap-3 mt-1 ml-12">
                <Header7 text={` Total ${chainCurrencySymbol}`} />
                <div className="flex space-x-2">
                  <Header7 text={requiredETH ? `${requiredETH} ${chainCurrencySymbol}` : '-'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Pannel>
      <Dvider2 />
      <Pannel>
        <Header4 text='Add-ons' />
        <div className="space-y-2">
          <div>
            <div className="flex mb-3 space-x-3">
              <div className="relative flex pb-9">
                <div className="w-2.5 h-0.5 bg-gray-19 dark:bg-dark-4 mt-3 absolute left-0 -translate-x-full"></div>
                <div className="absolute w-0.5 bg-gray-19 dark:bg-dark-4 h-full -left-2.5 mt-3"></div>
                <div className="flex mt-1">
                  <Switch onChange={handleSwitch1} switched={tradingConf.trading_delay} noBorder id='delay-1' />
                </div>
              </div>

              <div className="grow">
                <div className="flex items-center justify-between mb-1\.5">
                  <Tiny text='Delay trading' />
                  <div className="flex items-center gap-1">
                    <div className="text-base font-medium text-right dark:text-white shrink-0 whitespace-nowrap">
                      {serviceFee ? `${serviceFee.trading_delay}` : '-'}
                      <span className="ml-2 text-sm font-bold text-gray-400 dark:text-gray-4">{chainCurrencySymbol}</span>
                    </div>
                  </div>
                </div>
                <div className="w-9/12">
                  <Tiny subText='Delay trading for 60 seconds so you can have the contract address before trading is enabled' />
                </div>
              </div>
            </div>

            <div className="flex -mt-3 space-x-3">
              <div className="relative flex">
                <div
                    className="w-2.5 h-0.5 bg-gray-19 dark:bg-dark-4 mt-3 absolute left-0 -translate-x-full">
                </div>
                <div className="flex mt-1">
                  <Switch onChange={handleSwitch2} switched={tradingConf.can_enable_trading} noBorder id='delay-2' />
                </div>
              </div>

              <div className="grow">
                <div className="flex items-center justify-between mb-1\.5">
                  <Tiny text='Manually enable trading' />
                  <div className="flex items-center gap-1">
                    <div className="text-base font-medium text-right dark:text-white shrink-0 whitespace-nowrap">
                      {serviceFee ? `${serviceFee.enable_trading}` : '-'}
                      <span className="ml-2 text-sm font-bold text-gray-400 dark:text-gray-4">{chainCurrencySymbol}</span>
                    </div>
                  </div>
                </div>
                <div className="w-9/12">
                  <Tiny subText='Deploy the contract, add LP, but enable trading and launch the token within the next 7 days' />
                  <TinyRed text='Trading would be automatically enabled after 7 days from the time of contract creation if not enabled by the owner' noBorder={true}/>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Pannel>
      <Dvider2 />
      <Pannel>
        <Header4 text='Launch' />
        <ReviewDetailRow
          label='Deploy your contract and add initial liquidity on deploy.'
        />
        <ReviewDetailRow
          label={
            draft?.lp_burned
              ? 'Burn initial liquidity'
              : <>Lock liquidity on Unicrypt for <span className="font-medium dark:text-yellow-1 text-yellow-2">{`${draft?.lp_lock_period} ${draft?.lp_locked_for_years ? 'years' : 'months'}`}</span></>
          }
        />
        <ReviewDetailRow
          label='By deploying this contract, you are agreeing to BankPad'
          link='https://docs.bankai.app/legal/terms-of-service'
          linkLabel=' Terms of use.'
        />
      </Pannel>
      <div className="mt-4">
        {!tradingConf.can_enable_trading && !tradingConf.trading_delay &&
          <Note textColor="text-red-1" backgroundColor="bg-black-gradient" note='<div class="text-sm">IMPORTANT<br/>Your token will be live and tradable immediately after the contract is created.<br/>Select one of the add-ons if you would like to have the contact address before trading is enabled.</div>' />
        }
        <Button
            label='Launch Token'
            fullBtn
            onClick={handleLaunch}
            outline
        />
      </div>

      <TransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={<Header6 text="Launching" span={draft?.symbol} />}
        titleAfter={<Header6 text="Launched" span={draft?.symbol} />}
        content={(
          <>
            <div className="flex items-center space-x-4">
              {/* <CheckIconBlue /> */}
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Deploy your contract on the Ethereum chain</>} />
            </div>
            <div className="flex items-center space-x-4">
              {/* <CheckIconBlue /> */}
              <FourStarRound className="shrink-0" />
              <Tiny text={<>Adding <span className="font-medium dark:text-yellow-1">{`${putCommas(draft?.pair_amount || 0)} ${(pair_token?.symbol || 'ETH').toUpperCase()}`}</span> liquidity</>} />
            </div>
            <div className="flex items-center space-x-4">
              <FourStarRound className="shrink-0" />
              {/* <CheckIconBlue /> */}
              <Tiny text={
                draft?.lp_burned
                  ? 'Burn Liquidity'
                  : <>Lock liquidity on Unicrypt for <span className="font-medium dark:text-yellow-1 text-yellow-2">{`${draft?.lp_lock_period} ${draft?.lp_locked_for_years ? 'years' : 'months'}`}</span></>
              } />
            </div>
          </>
        )}
        contentAfter={(
          <>
            <div className="inline-flex items-center px-4 py-3 mb-4 space-x-2 rounded-md bg-gray-19 dark:bg-dark-3">
              <button className="" onClick={onCopy}><Copy /></button>
              <span ref={inputEl}
                className="text-sm break-all sm:text-base dark:text-white">{draft?.contract_address}</span>
            </div>
            <Button
              label='Manage Token'
              endIcon={<i className="fas fa-arrow-right" />}
              outline
              size='md'
              onClick={() => {
                setShowModal(false)
                history.push(`/launchpad/${draft?.uuid}`)
              }}
            />
          </>
        )}
        hash={hash}
      />
    </>
  )
}

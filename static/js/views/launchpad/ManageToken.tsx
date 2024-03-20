import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import { putCommas } from 'utils';
import Avatar from 'components/Widgets/Avatar';
import TokenState from 'components/Widgets/TokenState';
import IconButton from 'components/Butttons/IconButton';
import {
  BurnIcon1,
  ClockIconActive,
  ClockIconInActive,
  Copy,
  Etherscan,
  LockIcon1,
  Telegram,
  TwitterX,
  Webiste,
  Dextools
} from 'components/Icons';

import Tab from 'components/Widgets/Tab';
import Header2 from 'components/Typography/Header2';
import RenounceSection from './components/manage/RenounceSection';
import TaxSection from './components/manage/TaxSection';
import AntiBotSection from './components/manage/AntiBotSection';
import { useTokenProject } from './context/TokenContext';
import EnableTradingSection from './components/manage/EnableTradingSection';

const cls = {
  topContentClass: "dark:bg-dark-3 bg-gray-19 border-gray-300 rounded-md border dark:border-dark-1 p-2.5 mb-10",
  topWrapClass: "flex flex-wrap items-center justify-between gap-4",
  topLeftClass: "flex w-full gap-4 sm:items-center sm:gap-8 lg:w-auto",
  topLeftContentClass: "flex-1 min-w-0",
  divderClass: "hidden w-px mx-4 h-9 bg-gray-50 dark:bg-gray-8 sm:block",
  topRightClass: "md:ml-auto",
  topBtnsClass: "flex flex-wrap items-center gap-2",
  mainContentClass: "gap-6 space-y-6 xl:space-y-0 xl:grid xl:grid-cols-12",
  leftClass: "xl:col-span-7 2xl:col-span-8",
  rightClass: "border rounded-md xl:col-span-5 2xl:col-span-4 dark:border-gray-16 border-gray-19",
  leftContentClass: "pb-32 bg-gray-19 dark:bg-dark-3 rounded-md border-gray-300 border dark:border-dark-1 py-2.5 px-4 lg:pl-10",
  titleClass: "mb-4 text-xl font-semibold truncate md:text-4xl xl:text-40 dark:text-white",
  rowClass: "flex pt-2.5 pb-5 border-b dark:border-dark-8 items-center border-gray-300",
  rowLeftClass: "w-1/2 text-base md:w-5/12 dark:text-white",
  rowRightClass: "w-1/2 text-base truncate md:w-7/12 dark:text-white",
  rowRightClass1: "flex-1 w-1/2 min-w-0 text-base md:w-7/12 dark:text-white",
}

export default function ManageToken() {
  const [tabId, setTabId] = useState(0)
  const { project, isLoaded } = useTokenProject()
  const { account } = useActiveWeb3()
  const history = useHistory()

  const inputEl = useRef<HTMLInputElement>(null);
  const clickHandle = () => {
    if (inputEl && inputEl.current) {
      navigator.clipboard.writeText(project?.contract_address);
      toast.success('Copied Address!');
    }
  };

  useEffect(() => {
    if (isLoaded && !project) {
      history.replace('/launchpad')
    }
  }, [project, isLoaded])

  const onChangeTab = (newTab) => {
    if (newTab === 0) setTabId(newTab)
    else if (newTab === 1 && account) {
      setTabId(newTab)
    }
  }

  return (
    <>
      <div className={cls.topContentClass}>
        <div className={cls.topWrapClass}>
          <div className={cls.topLeftClass}>
            <Avatar
                avatar={`/assets/icons/${project?.pair_provider_address}.svg`}
                bedgeUrl={`/assets/icons/${project?.pair_address}.png`}
                size='big'
            />
            <div className={cls.topLeftContentClass}>
              <Header2 text={project?.name || 'Untitled'} />
              <div className={cls.topBtnsClass}>
                <TokenState state={project?.launched_at ? 'Live' : 'Deployed'} />

                {project?.telegram_url && <IconButton icon={<Telegram />} url={project?.telegram_url} size='sm' tooltip='Telegram' />}
                {project?.twitter_url && <IconButton icon={<TwitterX />} url={project?.twitter_url} size='sm' tooltip='Twitter/X' />}
                {project?.website_url && <IconButton icon={<Webiste />} url={project?.website_url} size='sm' tooltip='Website' />}
                <IconButton icon={<Etherscan />} url={'https://etherscan.io/token/' + project?.contract_address} size='sm' tooltip='Etherscan' />
                {project?.contract_address && <IconButton icon={<Dextools />} url={'https://www.dextools.io/app/en/ether/pair-explorer/' + project.contract_address} size='sm' tooltip='DexTools' />}

                <span className={cls.divderClass}></span>

                <div className="flex mr-1">
                  <IconButton
                    icon={project?.lp_burned ? <BurnIcon1 /> : <LockIcon1 />}
                    no_bg
                    tooltip={project?.lp_burned ? 'Liquidity burnt' : 'Liquidity locked'}
                  />
                </div>

                <div className="flex mx-1">
                  <IconButton
                    icon={project?.trading_delay || project?.can_enable_trading ? <ClockIconActive /> : <ClockIconInActive className="text-gray-400 dark:text-gray-8" />}
                    no_bg
                    tooltip={project?.trading_delay || project?.can_enable_trading ? 'Trading delayed' : ''}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cls.topRightClass}>
            <EnableTradingSection />
          </div>
        </div>
      </div>

      <div className={cls.mainContentClass}>
        <div className={cls.leftClass}>
          <RenounceSection />

          <div className={cls.leftContentClass}>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>
                Token Name
              </div>
              <div className={cls.rowRightClass}>
                {project?.name}
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>
                Token Symbol
              </div>
              <div className={cls.rowRightClass}>
                {project?.symbol}
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>
                Total Supply
              </div>
              <div className={cls.rowRightClass}>
                {putCommas(project?.total_supply)}
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>
                Contract Address
              </div>
              <div className={cls.rowRightClass1}>
                <div className="flex items-center gap-2">
                  <div className="relative mt-1 group">
                    {/* <!-- Tooltip --> */}
                    <IconButton
                      icon={<Copy />}
                      tooltip='Copy Contract'
                      onClick={clickHandle}
                      no_bg
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p ref={inputEl} className="pr-4 truncate">{project?.contract_address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>
                {project?.launched_at ? 'Launched at' : 'Deployed at'}
              </div>
              <div className={cls.rowRightClass}>
                {moment(project?.launched_at || project?.deployed_at).format('MMMM Do, YYYY hh:mm A')}
              </div>
            </div>
            <div className={cls.rowClass}>
              <div className={cls.rowLeftClass}>
                Max tokens per wallet
              </div>
              <div className={cls.rowRightClass}>
                {project?.max_tokens_per_wallet_percent}%
              </div>
            </div>
            <div className="flex pt-2.5 pb-5 items-center">
              <div className={cls.rowLeftClass}>
                Max tokens per transaction
              </div>
              <div className={cls.rowRightClass}>
                {project?.max_tokens_per_transaction_percent}%
              </div>
            </div>
          </div>

        </div>
        <div className={cls.rightClass}>
          <Tab tabList={['TAXES', 'ANTI-BOT']} tabId={tabId} onChangeTab={onChangeTab} buttonTab />
          {tabId === 0 && <TaxSection />}
          {tabId === 1 && <AntiBotSection />}
        </div>

      </div>
    </>
  )
}

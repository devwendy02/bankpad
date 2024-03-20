import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { TokenProject } from 'config/types';
import Bedge from 'components/Widgets/Bedge';
import Avatar from 'components/Widgets/Avatar';
import IconButton from 'components/Butttons/IconButton';
import { ArrowRight, BurnIcon1, ClockIcon, ClockIconActive, ClockIconInActive, LockIcon1, Telegram, TelegramIconLine, TwitterX } from 'components/Icons';

interface Props {
  project?: TokenProject
  index?: number
  isDraft?: boolean
}

export default function Card({ project, index, isDraft }: Props) {
  const history = useHistory()

  const onClickView = () => {
    project.contract_address ?
      history.push(`/launchpad/${project?.uuid}`) :
      history.push(`/launchpad/${project?.uuid}/token_details`)
  }

  const containerClass = "relative flex flex-col justify-between gap-8 px-4 py-5 bg-white rounded-md cursor-pointer md:flex-row md:items-center dark:bg-dark-3 hover:dark:bg-dark-4 hover:bg-gray-50 transition-all duration-200"
  const btnsClass = "flex items-center gap-3"
  const timeClass = "pr-5 text-base text-gray-500 border-gray-200 dark:text-gray-7 sm:py-3 dark:border-gray-8 md:border-r"
  const leftContentClass = "flex items-center justify-between gap-x-3 sm:gap-x-5 md:justify-end"

  return (
    <div className={containerClass} onClick={onClickView}>
      <Bedge iconUrl={`/assets/icons/${project?.pair_provider_address}.svg`} position="up-left" />

      <Avatar
        avatar={project?.name?.substring(0, 1)}
        symbol={project?.symbol}
        name={project?.name}
        bedgeUrl={`/assets/icons/${project?.pair_address}.png`}
        color={index % 4}
        isDraft={isDraft}
      />

      <div className={leftContentClass}>
        <p className={timeClass}>{project?.launched_at
          ? moment(project?.launched_at).fromNow()
          : moment(project?.created_at).fromNow()}</p>

        <div className={btnsClass}>
          <IconButton
            icon={
                project?.trading_delay || project?.can_enable_trading
                ? <ClockIconActive />
                : <ClockIconInActive className="text-gray-400 dark:text-gray-8" />
            }
            tooltip={project?.trading_delay || project?.can_enable_trading ? 'Trading delayed' : ''}
            no_bg
          />

          <IconButton
            icon={
              project?.lp_burned ? <BurnIcon1 /> : <LockIcon1 />
            }
            tooltip={project?.lp_burned ? 'Liquidity burnt' : 'Liquidity locked'}
            no_bg
          />

          <IconButton
            icon={<TwitterX />}
            url={project?.twitter_url}
          />

          <IconButton
            icon={<TelegramIconLine />}
            url={project?.telegram_url}
          />

          {/* <IconButton
            icon={<ArrowRight />}
            rounded_Full
            onClick={onClickButton}
          /> */}
        </div>
      </div>
    </div>
  );
}

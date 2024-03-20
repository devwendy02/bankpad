import { gravatarColor } from "utils/theme"
import Bedge from "./Bedge"

interface PropsType {
  bedgeUrl?: string
  symbol?: string
  name?: string
  avatar?: any
  color?: number
  size?: string
  isDraft?: boolean
}

function Avatar({ bedgeUrl, name, symbol, avatar, color, size = 'small', isDraft }: PropsType) {
  const contentClass = size === 'big' ? "relative flex items-center justify-center w-16 h-16 bg-white rounded-md sm:w-28 sm:h-28 dark:bg-dark-2 shrink-0" : "flex items-center gap-6"
  const avatarWrapClass = `shrink-0 gravatar gravatar--lg ${gravatarColor(name)}`
  const avatarClass = `uppercase`

  return (
    size === 'big' ?
      <div className={contentClass}>
        <img src={avatar} alt="" className="w-12 sm:w-16" />
        <Bedge iconUrl={bedgeUrl} />
      </div> :
      <div className={contentClass}>
        <div className={avatarWrapClass}>
          <span className={avatarClass}>{avatar || 'U'}</span>
          <Bedge iconUrl={bedgeUrl} />
        </div>
        <div className="">
          <p className="mb-1 text-base font-bold dark:text-dark-5 text-slate-300">
            {symbol || 'UNTITLED'}
            {isDraft && <span className="text-sm bg-yellow-50 text-yellow-2 dark:text-yellow-1 rounded dark:bg-dark-2 font-normal align-middle inline-flex items-center px-3 h-6 ml-3.5">Draft</span>}
          </p>

          <h5 className="text-xl font-semibold dark:text-white/80 text-slate-800">
            {name || 'Untitled'}
          </h5>
        </div>
      </div>
  )

}

export default Avatar;


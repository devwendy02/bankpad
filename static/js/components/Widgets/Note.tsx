import { ClockIcon, DotLine, FireWall, FourStar, WarningIcon } from "components/Icons"
import Bedge from "./Bedge"
import Button from "components/Butttons/Button"

interface PropsType {
  note?: string
  onClick?: any
  disabled?: boolean
  subText1?: string
  subText2?: string
  className?:string
  textColor?:string
  backgroundColor?:string
}
function Note({ note, onClick, disabled, subText1, subText2, className, textColor, backgroundColor }: PropsType) {

  const contentClass = `flex items-center justify-between gap-3 px-3 py-2 mb-8 rounded-md ${backgroundColor ? backgroundColor : 'dark:bg-dark-4 bg-yellow-2/20'} ${className || ''}`
  const subCotentClass = "flex space-x-2.5"
  const subWrapClass = "space-y-2"
  const iconClass = "shrink-0 opacity-70 dark:opacity-100"
  const subTextClass = "text-sm text-gray-700 font-roboto dark:text-gray-4"
  const subLineClass = "flex space-x-1.5"
  return (
    <div className={contentClass}>
      <div className="flex items-center space-x-2.5">
        <FourStar className={`shrink-0 ${textColor ? textColor : 'text-yellow-2 dark:text-yellow-1'}`} />
        <span className={`text-sm-md line-height-4 ${textColor ? textColor : 'text-yellow-2 dark:text-yellow-1'}`} dangerouslySetInnerHTML={{ __html: note }}/>
      </div>

      {onClick &&
        <Button
          startIcon={<FireWall className="w-4 sm:w-5" />}
          label="Renounce"
          onClick={onClick}
          disabled={disabled}
          noline
        />}
      {(subText1 || subText2) &&
        <div className={subCotentClass}>
          <DotLine className={iconClass} />
          <div className={subWrapClass}>
            <div className={subLineClass}>
              <WarningIcon className={iconClass} />
              <p className={subTextClass}>{subText1}</p>
            </div>

            <div className={subLineClass}>
              <ClockIcon className={iconClass} />
              <p className={subTextClass}>{subText2}</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Note;


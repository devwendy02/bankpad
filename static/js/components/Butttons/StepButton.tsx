import { HashLink } from 'react-router-hash-link'

interface PropsType {
  label?: string
  startIcon?: any
  endIcon?: any
  onClick?: any
  link?: any
}
function StepButton({ label, startIcon, endIcon, onClick, link }: PropsType) {

  const clx = "inline-flex items-center gap-3 px-5 py-3 bg-white border border-transparent rounded-md sm:px-7 sm:py-4 sm:text-base text-yellow-2 dark:text-yellow-1 dark:bg-dark-3 hover:dark:border-yellow-1 hover:border-yellow-2"
  return (
    <>
      {link ?
        <HashLink to={link} smooth className={clx}>
          {startIcon && startIcon}
          <span>{label}</span>
          {endIcon && endIcon}
        </HashLink> :
        <button className={clx} onClick={onClick && onClick}>
          {startIcon && startIcon}
          <span>{label}</span>
          {endIcon && endIcon}
        </button>
      }
    </>
  )

}

export default StepButton;

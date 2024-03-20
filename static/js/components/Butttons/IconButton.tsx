interface PropsType {
  icon?: any
  onClick?: any
  rounded_Full?: boolean
  no_bg?: boolean
  tooltip?: string
  url?: string
  size?:string
}
function IconButton({ icon, rounded_Full, onClick, no_bg, tooltip, url, size = 'md' }: PropsType) {

  const rounedFullClass = "items-center justify-center hidden w-10 h-10 transition-all bg-gray-100 rounded-full sm:flex dark:text-gray-9 hover:dark:text-white dark:bg-dark-2 hover:dark:bg-dark-9 hover:bg-slate-200"

  const noBgClass = ""
  const bgClass = size === 'md' ? "dark:text-gray-13 hover:dark:text-white sm:dark:bg-dark-6 rounded sm:py-2.5 sm:px-4 sm:hover:dark:bg-dark-3 sm:bg-gray-100 sm:hover:bg-slate-200" :"text-gray-400 rounded sm:px-2 sm:py-2 dark:text-gray-13 group-hover:dark:text-white sm:bg-gray-50 sm:dark:bg-dark-6"

  return (
    <>
      {rounded_Full ?
        <button className={rounedFullClass} onClick={onClick && onClick}>
          {icon && icon}

        </button> :
        (no_bg ?
          (tooltip ?
            <button aria-label={tooltip} data-microtip-position="top" role="tooltip" onClick={onClick && onClick}>
              {icon && icon}
            </button> :

            <button className={noBgClass} onClick={onClick && onClick}>
              {icon && icon}
            </button>
          )
          :
          (url ?
            (tooltip ?
              <a className={bgClass} href={url} target='_blank' aria-label={tooltip} data-microtip-position="top" role="tooltip">
              {icon && icon}
            </a>:
            <a className={bgClass} href={url} target='_blank' >
              {icon && icon}
            </a>
            ) :
            <button className={bgClass} onClick={onClick && onClick}>
              {icon && icon}
            </button>
          )

        )}

    </>
  )

}

export default IconButton;


interface PropsType {
  label?: string
  startIcon?: any
  endIcon?: any
  onClick?: any
  outline?: boolean
  noline?: boolean
  fullBtn?:boolean
  focusedBtn?: boolean
  isFocused?: boolean
  disabled?:boolean
  size ?: string
}
function Button({ label, startIcon, endIcon, onClick, outline, noline, focusedBtn, fullBtn, isFocused, disabled, size = 'sm'}: PropsType) {

  const outlineBtnClass = size === 'sm' ? "py-2 px-3 sm:px-5 border border-gray-100 bg-white dark:border-dark-1 rounded-md dark:bg-dark-2  space-x-1.5  hover:border-yellow-2 hover:dark:border-yellow-1 inline-flex items-center sm:space-x-2.5 font-medium text-yellow-2 dark:text-yellow-1 md:text-base sm:static absolute top-1.5 right-0 transition-all":
  "nline-flex items-center px-4 py-4 space-x-3 text-sm font-medium transition-all bg-white border rounded-md sm:px-6 dark:border-dark-1 border-gray-19 dark:bg-dark-2 hover:bg-transparent hover:dark:border-yellow-1 hover:border-yellow-2 dark:text-yellow-1 text-yellow-2 md:text-base"
  // dark:bg-dark-2 bg-white px-2.5 sm:px-5 py-2 rounded-md inline-flex items-center text-sm sm:text-base font-medium text-yellow-2 dark:text-yellow-1 space-x-2.5
  const nolineBtnClass = `dark:bg-dark-2 bg-white px-2.5 sm:px-5 py-2 rounded-md inline-flex items-center text-sm sm:text-base font-medium text-yellow-2 dark:text-yellow-1 space-x-2.5 ${disabled ? 'opacity-20 cursor-not-allowed':''}`

  const focusedBtnClass = isFocused ? "rounded px-6 py-2 font-semibold bg-white lg:text-base dark:bg-dark-2 dark:text-white" : "rounded px-6 py-2 font-semibold lg:text-base dark:text-white/70";
  const fullBtnClass= outline ?
    "block w-full py-4 text-base text-center bg-white border rounded-md px-14 font-roboto dark:text-yellow-1 text-yellow-2 dark:bg-dark-4 dark:border-yellow-1 border-yellow-2":
    "py-4 px-5 border dark:border-dark-1 rounded-md bg-white border-gray-19 text-yellow-2 dark:bg-dark-3 hover:bg-transparent hover:border-yellow-2 hover:dark:border-yellow-1 w-full text-center flex justify-center items-center sm:space-x-2.5 font-medium dark:text-yellow-1 text-sm md:text-base transition-all"
  return (
    <>
      {outline && !fullBtn &&
        <button className={outlineBtnClass} onClick={onClick} disabled = {disabled}>
          {startIcon && startIcon}
          <span className="inline-block">{label}</span>
          {endIcon && endIcon}
        </button>}

      {noline &&
        <button className={nolineBtnClass} onClick={onClick} disabled = {disabled}>
          {startIcon && startIcon}
          <span className="inline-block">{label}</span>
          {endIcon && endIcon}
        </button>

      }
      {focusedBtn &&
        <button className={focusedBtnClass} onClick={onClick} disabled = {disabled}>
          {label}
        </button>
      }
      {fullBtn &&
      <button className={fullBtnClass} onClick={onClick} disabled = {disabled}>
          {label}
      </button>
      }
    </>
  )

}

export default Button;

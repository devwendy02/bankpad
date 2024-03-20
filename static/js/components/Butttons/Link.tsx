

interface PropsType {
  href?: string
  label?: any
  endIcon?: any
  onClick?: any
  outline?: boolean
  noline?: boolean
  focusedBtn?: boolean
  isFocused?: boolean
  isBlank?:boolean
}
function Link({ href, label, isBlank = true}: PropsType) {

  const cls = "text-sm font-medium dark:text-yellow-1 text-yellow-2"

  return (
    <>
      {isBlank ?
      <a href={href} className={cls} target="_blank" rel="noreferrer" >{label}</a>:
      <a href={href} className={cls}>{label}</a>
      }

    </>
  )

}

export default Link;



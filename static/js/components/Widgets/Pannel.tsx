interface PropsType{
  children ?: any
}
function Pannel({children}:PropsType ) {
  const contentClass = "flex flex-col p-5 border border-gray-200 rounded-xl bg-gray-19 dark:bg-dark-3 dark:border-dark-1 flex gap-2"

  return (
    <div className={contentClass}>
      {children}
    </div>
  )

}

export default Pannel;


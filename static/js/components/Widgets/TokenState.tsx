interface PropsType{
  state ?: string
}
function TokenState({state}:PropsType ) {
  const stateWrapClass = state === 'Deployed' ? "inline-flex space-x-1.5 sm:space-x-2.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-md dark:bg-yellow-1/20 bg-yellow-2/20 items-center mr-1 mb-1 sm:mb-0 sm:mr-2 text-xs sm:text-lg font-semibold dark:text-yellow-1 text-yellow-2": "inline-flex space-x-1.5 sm:space-x-2.5 px-2 sm:px-3 py-2 rounded-md dark:bg-cyan-1/20 bg-cyan-2/20 items-center mr-1 sm:mr-2 text-xs sm:text-lg font-semibold dark:text-cyan-1 text-cyan-2"
  const stateDoeClass = state === 'Deployed' ? "w-2.5 h-2.5 rounded-full dark:bg-yellow-1 bg-yellow-2 shrink-0":"w-2.5 h-2.5 rounded-full dark:bg-cyan-1 bg-cyan-2 shrink-0"
  const stateTextClass = "hidden sm:inline-block"
  return (
    <div className={stateWrapClass}>
      <span className={stateDoeClass}></span>
      <span className={stateTextClass}>{state}</span>
    </div>
  )

}

export default TokenState;


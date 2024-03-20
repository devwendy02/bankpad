
interface PropsType {
  tabList: string[]
  tabId?: number
  onChangeTab?: any
  buttonTab?: boolean

}

function Tab({ tabList, tabId, buttonTab, onChangeTab }: PropsType) {
  const cls = {
    containerClass : buttonTab ? "flex items-center" : "flex items-center gap-4 sm:gap-8 group",
    activeBtnClass : "cursor-pointer transition inline-flex flex-col text-sm sm:text-base text-yellow-2 dark:text-yellow-1 border-b-2 border-yellow-2 dark:border-yellow-1 pb-3 group-hover:border-transparent group-hover:font-medium text-center group-hover:text-gray-600 group-hover:dark:text-white/70 hover:!border-yellow-2 hover:dark:!border-yellow-1 hover:!text-yellow-2  hover:dark:!text-yellow-1",
    noneActiveBtnClass : "cursor-pointer transition inline-flex flex-col text-sm sm:text-base font-medium text-gray-600 dark:text-white/70 border-b-2 border-transparent pb-3 group-hover:border-transparent group-hover:font-medium text-center hover:!border-yellow-2 hover:dark:!border-yellow-1",
    tabBtnClassActive : "border-b dark:border-yellow-1 border-yellow-2 text-yellow-2 bg-gray-19 dark:text-yellow-1 dark:bg-dark-3",
    tabBtnClassNoAcive : "border-b border-transparent dark:text-white/70 text-black/70 hover:dark:border-yellow-1 hover:border-yellow-2 hover:dark:text-yellow-1 hover:text-yellow-2",
    tabBtnClass : "flex items-center py-4 text-base border-b border-transparent dark:text-white/70 text-black/70 hover:dark:border-yellow-1 hover:border-yellow-2 hover:dark:text-yellow-1 hover:text-yellow-2"
   }

  return (
    <>
      {buttonTab ?
        <div className={cls.containerClass}>
          {tabList.map((d, k) => (
            <button className={`${cls.tabBtnClass} ${tabId === k ? cls.tabBtnClassActive : cls.tabBtnClassNoAcive} ${k === 0 ? 'justify-center w-32 rounded-tl-md' : 'w-full pl-8'}`}
              onClick={() => { onChangeTab(k) }} key={k}>{d}</button>
          ))}
        </div>
        :
        <ul className={cls.containerClass}>
          {tabList.map((d, k) => (
            <li key={k}>
              <div className={tabId === k ? cls.activeBtnClass : cls.noneActiveBtnClass} onClick={() => { onChangeTab(k) }} key={k}>{d}</div>
            </li>
          ))}
        </ul>
      }
    </>
  )

}

export default Tab;


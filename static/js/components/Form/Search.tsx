import { SearchIcon } from "components/Icons"

interface PropsType {
  value?: string
  onChange?: any
  onKeyUp?:any
  switched?: boolean
}
function Search({ value, onChange,onKeyUp }: PropsType) {

  const contentClass = "w-full lg:max-w-sm xl:max-w-md"
  const wrappClass = "relative flex items-center w-full"
  const inputClass = "w-full pl-10 pr-4 py-3 text-lg rounded-md bg-gray-19 dark:bg-dark-3 dark:text-white placeholder:dark:text-gray-5"
  const labelClass = "block mb-2 text-base font-medium md:text-lg dark:text-gray-4"
  const iconClass = "absolute pointer-events-none left-2"
  return (
      <>
        <div className={contentClass}>
          <label htmlFor="search" className={labelClass}>Search</label>
          <div className={wrappClass}>
            <SearchIcon className={iconClass}/>
            <input
                type="text"
                id="search"
                className={inputClass}
                placeholder="Enter token name or token symbol"
                value  = {value}
                onChange={onChange}
                onKeyUp = {onKeyUp}
            />
          </div>
        </div>
      </>
  )

}

export default Search;


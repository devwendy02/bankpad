import { BurnIcon, LockIcon } from "components/Icons"
import { useMemo } from "react"

interface PropsType {
  label?: string
  onChange?: any
  switched?: boolean
}
function SwitchLockBurn({ label, onChange, switched }: PropsType) {
  const contentClass = "flex items-center h-8 rounded-md bg-gray-19 dark:bg-dark-4"
  const lockBtnClass1 = "px-2 py-1 flex items-center gap-0.5 rounded-md shadow-sm shadow-gray-200 dark:shadow-black text-sm font-semibold h-9 dark:text-yellow-1 text-yellow-2 bg-white dark:bg-dark-4"
  const lockBtnClass2 = "flex items-center gap-0.5 px-2 py-1 text-sm font-semibold rounded-md h-9 dark:text-white"
  
  const butnBtnClass1 = "flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-md h-9 dark:text-white"
  const butnBtnClass2 = "flex items-center gap-2 px-3 py-1 text-sm font-semibold bg-white rounded-md shadow-sm shadow-gray-200 dark:shadow-black h-9 dark:text-yellow-1 text-yellow-2 dark:bg-dark-4"

  const isChecked = useMemo(() => switched, [switched])
  const handleChange = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <>

      <div className={contentClass}>
        <button className={!isChecked ? lockBtnClass1:lockBtnClass2} onClick={()=>handleChange(false)}>
          <LockIcon />
          <span>Lock</span>
        </button>

        <button className={!isChecked ? butnBtnClass1 : butnBtnClass2} onClick={()=>handleChange(true)}>
          <BurnIcon />

          <span>Burn</span>
        </button>
      </div>


      {/* <div className={contentClass}>
        <div className={wrappClass}>
          <input
            type="checkbox"
            checked={!!isChecked}
            name="toggle"
            id={`advanceToggle${label}`}
            className={inputClass}
            readOnly onClick={handleChange}
          />
          <label htmlFor={`advanceToggle${label}`}
            className={trackClass}></label>
        </div>
      </div> */}

    </>
  )

}

export default SwitchLockBurn;


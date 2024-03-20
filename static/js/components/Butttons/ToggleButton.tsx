interface PropsType {
  label?: string
  checked?: boolean
  onChange?: any
  disabled?: boolean
}
function ToggleButton({ label, disabled, checked, onChange }: PropsType) {

  const contentClass = `flex items-center px-5 py-3 bg-white rounded-md dark:bg-dark-2 ${disabled ? 'opacity-20 cursor-not-allowed':''}`
  const wrapClass = `relative inline-flex items-center w-6 h-5 mr-2 align-middle transition duration-200 ease-in select-none  ${disabled ? 'cursor-not-allowed':'cursor-pointer'}`

  const inputClass = `absolute w-3.5 h-3.5 rounded-full bg-gray-300 dark:bg-gray-4 appearance-none ${disabled ? 'cursor-not-allowed':'cursor-pointer'} mx-0.5 peer left-0 checked:left-1.5 checked:dark:bg-yellow-1 checked:bg-yellow-2 transition-all duration-100 ring-2 dark:ring-dark-2 ring-white before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:absolute flex items-center justify-center before:dark:bg-dark-2 before:bg-white`;
  const innerLabelClass = `lock w-6 h-2 overflow-hidden bg-gray-300 rounded-full ${disabled ? 'cursor-not-allowed':'cursor-pointer'} dark:bg-gray-4 peer-checked:dark:bg-yellow-1 peer-checked:bg-yellow-2`
  // const labelClass = "text-sm font-medium dark:text-yellow-1"
  const labelClass =  `text-sm font-medium dark:text-yellow-1  ${disabled ? 'cursor-not-allowed':'cursor-pointer'}`
  return (
    <>
      <div className={contentClass}>
        <div className={wrapClass}>
          <input
            type="checkbox"
            checked={checked}
            name="toggle" id="advanceToggle"
            disabled={disabled}
            className={inputClass}
            onChange={e=>onChange(e.target.checked)}
          />
          <label htmlFor="advanceToggle" className={innerLabelClass}></label>
        </div>
        <label htmlFor="advanceToggle" className={labelClass}>{label}</label>
      </div>
    </>
  )

}

export default ToggleButton;


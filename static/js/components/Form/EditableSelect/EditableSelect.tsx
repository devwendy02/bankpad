import React, { useEffect, useContext, useState, useMemo } from "react";
import Select from "react-dropdown-select";
import { putCommas } from "utils";
import "./style.scss";

interface PropsType {
  options?: any
  value?: any
  setValue?: any
}

const EditableSelect = ({ options, value, setValue }: PropsType) => {
  const [val, setVal] = useState(value);

  // Build a list of options
  const _options = useMemo(() => options?.map((d, k) => ({ label: putCommas(d), value: d })), [options, value]);

  useEffect(() => { setValue(val) }, [val])

  const onChange = (e: any) => {
    if (e.target.value === '') {
      setVal(0)
    } else {
      let { name, value } = e.target;
      value = value.replace(/,/g, '');
      // setData(prevState => ({ ...prevState, [name]: value}));
      setVal(parseFloat(value))
    }
  }
  const onChangeOption = (obj) => {
    setVal(parseFloat(obj[0].value));
  }

  const inputClass = "w-full px-4 py-3 text-lg rounded-md dark:bg-dark-3 bg-gray-19 dark:text-white placeholder:dark:text-gray-5"
  return (
    <>
      <div className="relative flex items-center">
        <input
          type="text"
          id="TokenSupply"
          placeholder="69,420,000"
          value={putCommas(value)}
          onChange={onChange}
          className={inputClass}
        />
        <div className="absolute right-0">
          <div className="w-auto relative">
            <Select
              className="dropdown-with-preset editable-select"
              options={_options}
              clearOnBlur={true}
              values={[]}
              onChange={onChangeOption}
              placeholder=""
              direction="ltr"
            />

            {/*<select onChange={onChangeOption} onClick={onClick} className="select-PRESETS" placeholder="PRESETS" autoComplete="off">*/}
            {/*  {options?.map((d, k) => (*/}
            {/*    <option value={d} key={k}>{putCommas(d)}</option>*/}
            {/*  ))}*/}
            {/*</select>*/}
            <div className="absolute top-1 right-0 pr-8 text-gray-400 dark:text-gray-700 pointer-events-none">PRESETS</div>

          </div>
        </div>
      </div>

    </>
  );
};

export default EditableSelect;

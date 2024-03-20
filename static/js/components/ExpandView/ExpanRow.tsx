import { useEffect, useState } from 'react';
import Expand from "react-expand-animated";
import { ArrowDwonIcon, CheckIconRed } from 'components/Icons';

interface Props {
  label?: string
  value?: string
}

const ExpanRow = ({ label, value }: Props) => {

  const contentClass = "flex items-center gap-3"
  const labelClass = "w-1/2 text-sm text-gray-400 sm:w-4/12 lg:w-3/12 dark:text-gray-4"
  const vlaueClass = "w-1/2 text-sm truncate sm:w-7/12 dark:text-white"
  return (
    <>
      <div className={contentClass} >
        <div className={labelClass}>
          {label}
        </div>
        <div className={vlaueClass}>{value}</div>
      </div>
    </>
  )
}
export default ExpanRow;

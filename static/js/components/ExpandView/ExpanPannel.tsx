import { useEffect, useState } from 'react';
import Expand from "react-expand-animated";
import { ArrowDwonIcon, CheckIconRed } from 'components/Icons';

interface Props {
  children?: any
}

const ExpanPannel = ({ children }: Props) => {

  const contentClass = "pt-6 space-y-4 invisible group-[.active]:visible transition-all delay-100 ease-in"
  return (
    <>
      <div className={contentClass} >
        {children}
      </div>
    </>
  )
}
export default ExpanPannel;
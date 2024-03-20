import { useEffect, useState } from 'react';
import Expand from "react-expand-animated";
import { ArrowDwonIcon, CheckIconGreen, CheckIconRed } from 'components/Icons';

interface Props {
  title?: string
  children: any
  isExpaned?: any
}

const ExpandView = ({ title, children, isExpaned }: Props) => {
  const [isExpand, setIsExpand] = useState(isExpaned);
  const styles = {
    open: { width: "100%" },
    close: { width: "100%" }
  };
  const transitions = ["height", "opacity", "background"];
  useEffect(() => {
    setIsExpand(isExpaned)
  }, [isExpaned])
  const contentClass = `px-6 py-4 border border-gray-200 rounded-xl bg-gray-19 dark:bg-dark-3 dark:border-dark-1 group ${isExpand ? 'active' : ''}`
  const titleContentClass = "flex items-center justify-between collapse-btn cursor-pointer"
  const titleClass = "text-lg dark:text-white"

  return (
    <>
      <div className={contentClass}>
        <div className={titleContentClass} onClick={() => { setIsExpand(!isExpand) }}>
          <div className="flex items-center gap-2.5">
            <CheckIconGreen className="text-white dark:text-dark-4" />
            <h6 className={titleClass}> {title}</h6>
          </div>
          <ArrowDwonIcon className="group-[.active]:rotate-180 transition-all" />
        </div>
        <Expand open={isExpand} duration={300} styles={styles} transitions={transitions}>
          {children}
        </Expand>
      </div>
    </>
  )
}
export default ExpandView;

// @ts-nocheck
import { useEffect } from 'react';

interface Props {
  percent?: number
  startValue?: any
  endValeu?: any
}

const Progress = ({ percent, startValue, endValeu }: Props) => {


  useEffect(() => {
    function addLine(percantage) {
      const lineBox = document.querySelector('#lines');
      lineBox.innerHTML = '';
      var amountLine = lineBox.clientWidth / 100 * 20;
      var progressDone = amountLine * percantage / 100;

      const dotLine = document.querySelector('#dotLine').style.width = percantage + '%';

      for (var i = 0; i < amountLine; i++) {
        if (i < progressDone) {
          if (i === Math.round(progressDone) - 1) {
            lineBox.innerHTML += '<div class="w-px h-4 bg-black dark:bg-white"></div>'
          } else {
            lineBox.innerHTML += '<span class="w-px h-4 bg-black dark:bg-white"></span>'
          }
        } else {
          lineBox.innerHTML += '<span class="w-px h-4 bg-gray-300 dark:bg-gray-17"></span>'
        }
      }
    };
    addLine(percent);
    var doit;
    clearTimeout(doit);
    setTimeout(() => {
      addLine(percent)
  }, 1000);


  }, [percent])

  const contentClass = "flex items-center gap-5"

  return (
    <>
      <div className={contentClass}>
        <div className="shrink-0">
          <span
            className="text-base bg-gray-200 dark:text-gray-15 font-medium px-1.5 dark:bg-gray-16 after:content-[''] after:w-0 after:h-0 after:border-t-[10px] after:top-0 relative after:border-b-[10px] after:border-l-[10px] after:translate-x-full after:absolute after:right-0 after:border-t-transparent after:border-b-transparent after:dark:border-l-gray-16">{startValue}</span>
        </div>
        <div className="relative flex items-center grow overflow-hidden" id="lineBox">
          <div className="absolute left-0 flex items-center" id="dotLine">
            <span className="w-full h-0.5 bg-gradient-to-l from-cyan-400 to-cyan-400/0"></span>
            <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
          </div>
          <div className="flex items-center w-full gap-1" id="lines"></div>
        </div>
        <div className="shrink-0">
          <span
            className="text-base bg-gray-200 dark:text-gray-15 font-medium px-1.5 dark:bg-gray-16 after:content-[''] after:w-0 after:h-0 after:border-t-[10px] after:top-0 relative after:border-b-[10px] after:border-r-[10px] after:-translate-x-full after:absolute after:left-0 after:border-t-transparent after:border-b-transparent after:dark:border-r-gray-16">{endValeu}</span>
        </div>
      </div>
    </>
  )
}

export default Progress

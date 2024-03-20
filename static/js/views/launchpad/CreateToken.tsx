
import { useCreationStep } from './context/TokenContext';
import TokenDetails from './components/creation/TokenDetails';
import Distribution from './components/creation/Distribution';
import AntiBot from './components/creation/AntiBot';
import Taxes from './components/creation/Taxes';
import Liquidity from './components/creation/Liquidity';
import Review from './components/creation/Review';
import { TokenCreationStep } from './types';
import CreateStep from './components/CreateStep/CreateStep';
import { useEffect, useRef } from 'react';

export default function CreateToken() {
  const step = useCreationStep()
  const contentClass = "max-w-screen-xl lg:pt-8 pt-3 2xl:pr-32"

  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [scrollRef, step])

  return (
    <>
      <CreateStep />
      <div ref={scrollRef}></div>
      <div className={contentClass}>
        {step === TokenCreationStep.DETAILS && (<TokenDetails />)}
        {step === TokenCreationStep.DISTRIBUTION && (<Distribution />)}
        {step === TokenCreationStep.ANTIBOT && (<AntiBot />)}
        {step === TokenCreationStep.TAX && (<Taxes />)}
        {step === TokenCreationStep.LIQUIDITY && (<Liquidity />)}
        {step === TokenCreationStep.REVIEW && (<Review />)}
      </div>
    </>
  )
}


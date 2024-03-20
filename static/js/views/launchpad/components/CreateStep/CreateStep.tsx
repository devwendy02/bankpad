import { useCreationStep } from "../../context/TokenContext"
import { useChangePage } from "../../hooks/useChangePage";
import { TokenCreationStep } from "../../types"
import Circle from "./Circle";

const CreateStep = () => {
  const step = useCreationStep()
  const isCompeted = (value: any) => {
    return value < step
  }

  const { onChangePage } = useChangePage()

  return (
    <>
      <div className="flex justify-between max-w-screen-xl">
        <Circle
          label="Token Details"
          isComplete={isCompeted(TokenCreationStep.DETAILS)}
          isActive={step === TokenCreationStep.DETAILS}
          onClick={() => onChangePage(TokenCreationStep.DETAILS)}
        />

        <Circle
          label="Distribution"
          isComplete={isCompeted(TokenCreationStep.DISTRIBUTION)}
          isActive={step === TokenCreationStep.DISTRIBUTION}
          onClick={() => onChangePage(TokenCreationStep.DISTRIBUTION)}
        />

        <Circle
          label="Anti-Bot"
          isComplete={isCompeted(TokenCreationStep.ANTIBOT)}
          isActive={step === TokenCreationStep.ANTIBOT}
          onClick={() => onChangePage(TokenCreationStep.ANTIBOT)}
        />

        <Circle
          label="Taxes"
          isComplete={isCompeted(TokenCreationStep.TAX)}
          isActive={step === TokenCreationStep.TAX}
          onClick={() => onChangePage(TokenCreationStep.TAX)}
        />

        <Circle
          label="Liquidity"
          isComplete={isCompeted(TokenCreationStep.LIQUIDITY)}
          isActive={step === TokenCreationStep.LIQUIDITY}
          onClick={() => onChangePage(TokenCreationStep.LIQUIDITY)}
        />

        <Circle
          label="Review & Launch"
          isComplete={isCompeted(TokenCreationStep.REVIEW)}
          isActive={step === TokenCreationStep.REVIEW}
          noLine
          onClick={() => onChangePage(TokenCreationStep.REVIEW)}
        />
      </div>

    </>

  )
}

export default CreateStep

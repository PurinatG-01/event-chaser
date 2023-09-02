import React from "react"
import { BaseTransactionStepProps, StepFooter } from "./StepFooter"

export default function StepSummary(props: Props) {
  const { onGoPrev, onGoNext } = props

  return (
    <div className="flex flex-col flex-grow">
      <StepFooter
        onGoPrev={onGoPrev}
        onGoNext={onGoNext}
        hidePrev={false}
        hideNext={false}
      />
    </div>
  )
}

interface Props extends BaseTransactionStepProps {}

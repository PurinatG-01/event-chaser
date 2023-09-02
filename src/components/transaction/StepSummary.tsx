import React from "react"
import {
  BaseTransactionStepProps,
  StepFooter,
} from "~/app/(index)/event/[id]/transaction/page"

export default function StepFinal(props: Props) {
  const { onGoPrev, onGoNext } = props

  return (
    <div className="flex flex-col flex-grow">
      StepFinal
      <StepFooter onGoPrev={onGoPrev} hidePrev={false} hideNext={true} />
    </div>
  )
}

interface Props extends BaseTransactionStepProps {}

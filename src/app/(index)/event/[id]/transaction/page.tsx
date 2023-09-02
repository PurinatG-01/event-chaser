"use client"
import React, { useMemo, useState } from "react"
import PageWrapper from "~/components/PageWrapper"
import dynamic from "next/dynamic"
import { BaseTransactionStepProps } from "~/components/transaction/StepFooter"

enum TRANSACTION_STEP {
  SELECT_CHANNEL = "SelectChannel",
  FORM_CHANNEL = "FormChannel",
  SUMMARY = "Summary",
}

const StepList = Object.entries(TRANSACTION_STEP).map((item, index) => {
  return {
    index: index,
    key: item[0],
    component: dynamic<BaseTransactionStepProps>(
      () => import(`~/components/transaction/Step${item[1]}`)
    ),
  }
})

export default function EbookTransactionByIdPage() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const DynamicComponent =
    useMemo<React.ComponentType<BaseTransactionStepProps> | null>(() => {
      return (
        StepList.find((step) => step.index == activeStep)?.component ?? null
      )
    }, [activeStep])
  return (
    <PageWrapper>
      <div className="p-4 py-8 flex flex-col w-full min-h-[60vh]">
        <TransactionStepper
          currentStep={activeStep}
          onClickStep={(stepIndex) => setActiveStep(stepIndex)}
        />
        <section className="flex-grow p-4 mt-4 border rounded-md border-base-300 flex flex-col">
          {!!DynamicComponent ? (
            <DynamicComponent
              onGoPrev={() => setActiveStep((prev) => prev - 1)}
              onGoNext={() => setActiveStep((prev) => prev + 1)}
            />
          ) : (
            <></>
          )}
        </section>
      </div>
    </PageWrapper>
  )
}

function TransactionStepper(props: TransactionStepperProps) {
  const { currentStep, onClickStep } = props
  const activeStep = currentStep ?? 0
  return (
    <ul className="steps">
      {StepList.map((step, index) => (
        <li
          className={`step cursor-pointer ${
            index <= activeStep ? "step-primary" : ""
          }`}
          key={index}
          onClick={() => {
            if (typeof onClickStep == "function") onClickStep(index)
          }}
        ></li>
      ))}
    </ul>
  )
}

interface TransactionStepperProps {
  // start at 0
  currentStep?: number
  onClickStep?: (stepIndex: number) => void
}

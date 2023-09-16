"use client"
import React, { useEffect, useMemo, useState } from "react"
import PageWrapper from "~/components/PageWrapper"
import dynamic from "next/dynamic"
import { BaseTransactionStepProps } from "~/components/transaction/StepFooter"
import TransactionStepProvider, {
  useTransactionStep,
} from "~/provider/useTransactionStep"
import { useTheme } from "styled-components"

enum TRANSACTION_STEP {
  SELECT_CHANNEL = "SelectChannel",
  FORM_CHANNEL = "FormChannel",
  SUMMARY = "Summary",
}

const StepList = [
  {
    index: 0,
    key: TRANSACTION_STEP.SELECT_CHANNEL,
    component: dynamic<BaseTransactionStepProps>(
      () =>
        import(
          `~/components/transaction/Step${TRANSACTION_STEP.SELECT_CHANNEL}`
        )
    ),
    title: "Select channel",
  },
  {
    index: 1,
    key: TRANSACTION_STEP.FORM_CHANNEL,
    component: dynamic<BaseTransactionStepProps>(
      () =>
        import(`~/components/transaction/Step${TRANSACTION_STEP.FORM_CHANNEL}`)
    ),
    title: "Channel detail",
  },
  {
    index: 2,
    key: TRANSACTION_STEP.SUMMARY,
    component: dynamic<BaseTransactionStepProps>(
      () => import(`~/components/transaction/Step${TRANSACTION_STEP.SUMMARY}`)
    ),
    title: "Summary",
  },
]

export default function EbookTransactionByIdPage() {
  const [activeStep, setActiveStep] = useState<number>(-1)
  const DynamicComponent =
    useMemo<React.ComponentType<BaseTransactionStepProps> | null>(() => {
      return (
        StepList.find((step) => step.index == activeStep)?.component ?? null
      )
    }, [activeStep])

  useEffect(() => {
    setActiveStep(0)
  }, [])

  return (
    <PageWrapper>
      <div className="p-4 py-8 flex flex-col w-full min-h-[60vh] mx-auto max-w-[600px]">
        <TransactionStepProvider>
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
        </TransactionStepProvider>
      </div>
    </PageWrapper>
  )
}

function TransactionStepper(props: TransactionStepperProps) {
  const { currentStep, onClickStep } = props
  const { passedStep } = useTransactionStep()
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
            if (typeof onClickStep == "function" && passedStep >= index)
              onClickStep(index)
          }}
        >
          {step.title}
        </li>
      ))}
    </ul>
  )
}

interface TransactionStepperProps {
  // start at 0
  currentStep?: number
  onClickStep?: (stepIndex: number) => void
}

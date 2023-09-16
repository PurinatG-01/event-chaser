"use client"
import React, { useEffect } from "react"
import { BaseTransactionStepProps, StepFooter } from "./StepFooter"
import {
  TRANSACTION_CHANNEL,
  useTransactionStep,
} from "~/provider/useTransactionStep"

export default function StepSummary(props: Props) {
  const { onGoPrev, onGoNext } = props
  const { channel, charge, purchaseTicket } = useTransactionStep()

  useEffect(() => {
    if (!!charge) return
    purchaseTicket()
  }, [])

  return (
    <div className="flex flex-col flex-grow">
      {!!charge && channel == TRANSACTION_CHANNEL.PROMPTPAY ? (
        <div className="flex flex-col mx-auto">
          <span className="text-lg font-bold mb-2">Charge id: {charge.id}</span>
          <span className="text-lg font-bold mb-2">
            Charge amount: {charge.amount / 100} Baht
          </span>
          <span className="text-lg font-bold mb-2">
            Charge status: {charge.status}
          </span>
          <img
            className="max-w-[400px] w-full rounded-sm overflow-hidden"
            src={charge.source.scannable_code.image.download_uri}
            alt="QR Promptpay code"
          />
        </div>
      ) : (
        <>Error occured: Cannot created charge</>
      )}
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

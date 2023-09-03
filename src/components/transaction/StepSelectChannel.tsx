"use client"
import React, { useCallback, useEffect, useState } from "react"
import { BaseTransactionStepProps, StepFooter } from "./StepFooter"
import {
  TRANSACTION_CHANNEL,
  useTransactionStep,
} from "~/provider/useTransactionStep"

const ChannelList = [
  {
    id: "promptpay",
    text: "Promptpay",
    value: TRANSACTION_CHANNEL.PROMPTPAY,
  },
  {
    id: "credit-card",
    text: "Credit card",
    value: TRANSACTION_CHANNEL.CREDIT_CARD,
  },
]

export default function StepSelectMethod(props: Props) {
  const { onGoNext } = props
  const { channel, setTransactionChannel } = useTransactionStep()

  const onClickChannel = (channel: TRANSACTION_CHANNEL) => {
    if (channel) setTransactionChannel(channel)
  }

  const handleOnGoNext = useCallback(() => {
    if (!onGoNext || !channel) return
    onGoNext()
  }, [channel, onGoNext])

  return (
    <div className="flex flex-col flex-grow">
      <ol className="flex flex-col gap-4 mt-auto">
        {ChannelList.map((_channel) => (
          <li
            key={_channel.id}
            className={`p-4 rounded border border-base-300 cursor-pointer hover:opacity-70 transition-all ${
              channel == _channel.value ? "text-white bg-primary" : ""
            }`}
            onClick={() => onClickChannel(_channel.value)}
          >
            {_channel.text}
          </li>
        ))}
      </ol>
      <StepFooter onGoNext={handleOnGoNext} hidePrev={true} hideNext={false} />
    </div>
  )
}

interface Props extends BaseTransactionStepProps {}

"use client"
import React, { ChangeEvent, useCallback } from "react"
import { BaseTransactionStepProps, StepFooter } from "./StepFooter"
import {
  MAX_TICKET_PER_TRANSACTION,
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
  const { channel, setTransactionChannel, setAmount } = useTransactionStep()
  const amountList = Array(MAX_TICKET_PER_TRANSACTION).fill(0)

  const onClickChannel = (channel: TRANSACTION_CHANNEL) => {
    if (channel) setTransactionChannel(channel)
  }

  const handleOnGoNext = useCallback(() => {
    if (!onGoNext || !channel) return
    setTimeout(() => {
      onGoNext()
    }, 300)
  }, [channel, onGoNext])

  return (
    <div className="flex flex-col flex-grow">
      <h3 className="mt-auto mb-4 text-xl font-bold">Select channel</h3>
      <ol className="flex flex-col gap-4 mb-6">
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
      <h3 className="text-xl font-bold mb-4">Select amount</h3>

      <select
        className="select select-bordered w-full"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setAmount(+e.target.value)
        }}
      >
        <option disabled>Select amount</option>
        {amountList.map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <StepFooter onGoNext={handleOnGoNext} hidePrev={true} hideNext={false} />
    </div>
  )
}

interface Props extends BaseTransactionStepProps {}

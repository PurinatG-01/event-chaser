"use client"
import React, { useState } from "react"
import {
  BaseTransactionStepProps,
  StepFooter,
} from "~/app/(index)/event/[id]/transaction/page"

const ChannelList = [
  {
    id: "promptpay",
    text: "Promptpay",
    value: "promptpay",
  },
  {
    id: "credit-card",
    text: "Credit card",
    value: "credit-card",
  },
]

export default function StepSelectMethod(props: Props) {
  const { onGoNext } = props
  const [activeChannel, setActiveChannel] = useState<string>("")

  const onClickChannel = (channel: string) => {
    setActiveChannel(channel)
  }

  return (
    <div className="flex flex-col flex-grow">
      <ol className="flex flex-col gap-4 mt-auto">
        {ChannelList.map((channel) => (
          <li
            key={channel.id}
            className={`p-4 rounded border border-base-300 cursor-pointer hover:opacity-70 transition-all ${
              activeChannel == channel.id ? "text-white bg-primary" : ""
            }`}
            onClick={() => onClickChannel(channel.id)}
          >
            {channel.text}
          </li>
        ))}
      </ol>
      <StepFooter onGoNext={onGoNext} hidePrev={true} hideNext={false} />
    </div>
  )
}

interface Props extends BaseTransactionStepProps {}

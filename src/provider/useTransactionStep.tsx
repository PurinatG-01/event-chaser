import { channel } from "diagnostics_channel"
import { useParams } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Charge } from "~/models/Charge"
import query from "~/utils/query"

export enum TRANSACTION_CHANNEL {
  PROMPTPAY = "promptpay",
  CREDIT_CARD = "credit-card",
}

export const MAX_TICKET_PER_TRANSACTION = 5

interface TransactionStateActions {
  setTransactionChannel: (channel: TRANSACTION_CHANNEL) => void
  setTransactionSuccess: (isPurchaseSuccess: boolean) => void
  setPassedStep: (passedStep: number) => void
  setEventId: (eventId: string) => void
  setAmount: (amount: number) => void
  purchaseTicket: () => void
}

interface TransactionState {
  channel: TRANSACTION_CHANNEL | ""
  eventId: string
  amount: number
  isPurchaseSuccess: boolean
  charge: Charge | null
  //   starting from 0
  passedStep: number
}

interface ProviderProps extends React.PropsWithChildren<{}> {}

const defaultTransactionState: TransactionState = {
  channel: "",
  eventId: "",
  amount: 1,
  isPurchaseSuccess: false,
  charge: null,
  passedStep: 0,
}

const TransactionStepContext = createContext<
  TransactionState & TransactionStateActions
>({
  ...defaultTransactionState,
  setTransactionChannel: (channel: TRANSACTION_CHANNEL) => {},
  setTransactionSuccess: (isPurchaseSuccess: boolean) => {},
  setPassedStep: (passedStep: number) => {},
  setAmount: (amount: number) => {},
  setEventId: (eventId: string) => {},
  purchaseTicket() {},
})

export const useTransactionStep = (): TransactionState &
  TransactionStateActions => useContext(TransactionStepContext)

export default function TransactionStepProvider(props: ProviderProps) {
  const [transactionState, setTransactionState] = useState<TransactionState>(
    defaultTransactionState
  )
  const params = useParams()

  const setTransactionChannel = (channel: TRANSACTION_CHANNEL) => {
    setTransactionState((prev) => ({ ...prev, channel }))
  }

  const setTransactionSuccess = (isPurchaseSuccess: boolean) => {
    setTransactionState((prev) => ({ ...prev, isPurchaseSuccess }))
  }

  const setPassedStep = (passedStep: number) => {
    setTransactionState((prev) => ({ ...prev, passedStep }))
  }

  const setEventId = (eventId: string) => {
    setTransactionState((prev) => ({ ...prev, eventId }))
  }

  const setAmount = (amount: number) => {
    if (amount > MAX_TICKET_PER_TRANSACTION && amount <= 0) return
    setTransactionState((prev) => ({ ...prev, amount }))
  }

  const resolverCharge = (charge: Charge) => {
    if (transactionState.channel == TRANSACTION_CHANNEL.PROMPTPAY) {
      setTransactionState((prev) => ({ ...prev, charge }))
    } else {
    }
  }

  const purchaseTicket = async () => {
    try {
      const formValue = {
        eventId: transactionState.eventId,
        amount: `${transactionState.amount}`,
        channel: transactionState.channel,
      }
      const formData = new FormData()
      for (const [key, value] of Object.entries(formValue)) {
        formData.append(key, value)
      }
      const response = await query()<{ charge: Charge}>("/payment/purchase/ticket", {
        method: "POST",
        data: formData,
      })
      if (response.data.data.charge) {
        resolverCharge(response.data.data.charge)
      } else {
        throw new Error("No charge data")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!!transactionState.channel) setPassedStep(1)
  }, [transactionState.channel])

  useEffect(() => {
    setEventId(params.id as string)
  }, [])

  return (
    <TransactionStepContext.Provider
      value={{
        ...transactionState,
        setTransactionChannel,
        setTransactionSuccess,
        setPassedStep,
        purchaseTicket,
        setEventId,
        setAmount,
      }}
    >
      {props.children}
    </TransactionStepContext.Provider>
  )
}

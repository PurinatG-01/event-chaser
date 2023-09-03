import React, { createContext, useContext, useEffect, useState } from "react"

export enum TRANSACTION_CHANNEL {
  PROMPTPAY = "promptpay",
  CREDIT_CARD = "credit-card",
}

interface TransactionStateActions {
  setTransactionChannel: (channel: TRANSACTION_CHANNEL) => void
  setTransactionSuccess: (isPurchaseSuccess: boolean) => void
  setPassedStep: (passedStep: number) => void
}

interface TransactionState {
  channel: TRANSACTION_CHANNEL | ""
  isPurchaseSuccess: boolean
  //   starting from 0
  passedStep: number
}

interface ProviderProps extends React.PropsWithChildren<{}> {}

const defaultTransactionState: TransactionState = {
  channel: "",
  isPurchaseSuccess: false,
  passedStep: 0,
}

const TransactionStepContext = createContext<
  TransactionState & TransactionStateActions
>({
  ...defaultTransactionState,
  setTransactionChannel: (channel: TRANSACTION_CHANNEL) => {},
  setTransactionSuccess: (isPurchaseSuccess: boolean) => {},
  setPassedStep: (passedStep: number) => {},
})

export const useTransactionStep = (): TransactionState &
  TransactionStateActions => useContext(TransactionStepContext)

export default function TransactionStepProvider(props: ProviderProps) {
  const [transactionState, setTransactionState] = useState<TransactionState>(
    defaultTransactionState
  )

  const setTransactionChannel = (channel: TRANSACTION_CHANNEL) => {
    setTransactionState((prev) => ({ ...prev, channel }))
  }

  const setTransactionSuccess = (isPurchaseSuccess: boolean) => {
    setTransactionState((prev) => ({ ...prev, isPurchaseSuccess }))
  }

  const setPassedStep = (passedStep: number) => {
    setTransactionState((prev) => ({ ...prev, passedStep }))
  }

  useEffect(() => {
    if (!!transactionState.channel) setPassedStep(1)
  }, [transactionState.channel])

  return (
    <TransactionStepContext.Provider
      value={{
        ...transactionState,
        setTransactionChannel,
        setTransactionSuccess,
        setPassedStep,
      }}
    >
      {props.children}
    </TransactionStepContext.Provider>
  )
}

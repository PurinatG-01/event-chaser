import React, { createContext, useContext, useState } from "react"

export enum TRANSACTION_CHANNEL {
  PROMPTPAY = "promptpay",
  CREDIT_CARD = "credit-card",
}

interface TransactionStateActions {
  setTransactionChannel: (channel: TRANSACTION_CHANNEL) => void
  setTransactionSuccess: (isPurchaseSuccess: boolean) => void
}

interface TransactionState {
  channel: TRANSACTION_CHANNEL | ""
  isPurchaseSuccess: boolean
}

interface ProviderProps extends React.PropsWithChildren<{}> {}

const defaultTransactionState: TransactionState = {
  channel: "",
  isPurchaseSuccess: false,
}

const TransactionStepContext = createContext<
  TransactionState & TransactionStateActions
>({
  ...defaultTransactionState,
  setTransactionChannel: (channel: TRANSACTION_CHANNEL) => {},
  setTransactionSuccess: (isPurchaseSuccess: boolean) => {},
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

  return (
    <TransactionStepContext.Provider
      value={{
        ...transactionState,
        setTransactionChannel,
        setTransactionSuccess,
      }}
    >
      {props.children}
    </TransactionStepContext.Provider>
  )
}

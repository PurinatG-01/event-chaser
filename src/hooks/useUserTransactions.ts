import React, { useState } from "react"
import useQuery from "./useQuery"
import { ORDER_BY, Paginator } from "~/models/General"
import { OMISE_CHARGE_STATUS, Transaction } from "~/models/Transaction"

export default function useUserTransactions() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const query = useQuery()
  const getUserTransactions = async (
    page: number,
    limit = 20,
    status: OMISE_CHARGE_STATUS = OMISE_CHARGE_STATUS.ALL,
    orderBy: ORDER_BY = ORDER_BY.ASC
  ) => {
    try {
      setIsLoading(true)
      const { data } = await query<Paginator<Transaction>>(
        "/user/transactions",
        {
          method: "GET",
          params: {
            page,
            limit,
            status,
            orderBy,
          },
        }
      )
      if (data.data) {
        setError("")
        setTransactionList(data.data.list)
        return Promise.resolve(data.data)
      } else {
        throw new Error(
          `Get transaction list failed at page:${page}, limit:${limit}`
        )
      }
    } catch (error) {
      setError((error as Error).message)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    getUserTransactions,
    isLoading,
    error,
    transactionList,
  }
}

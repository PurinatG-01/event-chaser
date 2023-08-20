import React, { useState } from "react"
import useQuery from "./useQuery"
import { Paginator } from "~/models/General"
import { Transaction } from "~/models/Transaction"

export default function useUserTransactions() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const query = useQuery()
  const getUserTransactions = async (page: number, limit = 20) => {
    try {
      setIsLoading(true)
      const { data } = await query<Paginator<Transaction>>("/user/transactions", {
        method: "GET",
        params: {
          page,
          limit,
        },
      })
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

"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Card } from "~/components/Card"
import useInfiniteScroll from "~/hooks/useInfiniteScroll"
import useUserTransactions from "~/hooks/useUserTransactions"
import { ORDER_BY } from "~/models/General"
import { OMISE_CHARGE_STATUS, Transaction } from "~/models/Transaction"

const statusList = [
  {
    value: OMISE_CHARGE_STATUS.ALL,
    title: "All",
    color: "bg-primary",
    checked: true,
  },
  {
    value: OMISE_CHARGE_STATUS.SUCCESSFUL,
    title: "Success",
    color: "bg-success",
  },
  {
    value: OMISE_CHARGE_STATUS.FAILED,
    title: "Failed",
    color: "bg-error",
  },
  {
    value: OMISE_CHARGE_STATUS.PENDING,
    title: "Pending",
    color: "bg-warning",
  },
]

const orderByList = [
  {
    value: ORDER_BY.ASC,
    title: "Oldest",
  },
  {
    value: ORDER_BY.DESC,
    title: "Latest",
    checked: true,
  },
]

export default function AccountTransactionsPage() {
  const { getUserTransactions } = useUserTransactions()
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const targetRef = useRef<HTMLLIElement>(null)
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<OMISE_CHARGE_STATUS>(
    OMISE_CHARGE_STATUS.ALL
  )
  const [orderBy, setOrderBy] = useState<ORDER_BY>(ORDER_BY.DESC)
  const infiniteHandler = async () => {
    setPage(page + 1)
    setTimeout(() => {
      getTransactions("handler")
    }, 300)
  }
  const { isLoading, setIsComplete, setIsLoading } = useInfiniteScroll(
    targetRef,
    infiniteHandler
  )

  const resolverStatusActive = useCallback(
    (_status: OMISE_CHARGE_STATUS) => {
      return status == _status
    },
    [status]
  )

  const resolverOrderByActive = useCallback(
    (_orderBy: ORDER_BY) => {
      return orderBy == _orderBy
    },
    [orderBy]
  )

  const getTransactions = useCallback(
    async (str: string) => {
      if (isLoading) return
      try {
        setIsLoading(true)
        const data = await getUserTransactions(page, 10, status, orderBy)
        if (data.list) {
          if (data.list.length == 0) {
            setIsLoading(false)
            setIsComplete(true)
          } else {
            if (page == 1) {
              setTransactionList([...data.list])
            } else {
              setTransactionList((prev) => [...prev, ...data.list])
            }
          }
        } else {
          throw new Error("No more data")
        }
      } catch (error) {
        console.error(error)
        setIsComplete(true)
      } finally {
        setIsLoading(false)
      }
    },
    [
      getUserTransactions,
      isLoading,
      orderBy,
      page,
      setIsComplete,
      setIsLoading,
      status,
    ]
  )

  const onChangeStatus = (val: OMISE_CHARGE_STATUS) => {
    if (isLoading) return
    setStatus(val)
    setIsComplete(false)
    setPage(1)
    setTransactionList([])
  }

  const onChangeOrderBy = (val: ORDER_BY) => {
    if (isLoading) return
    setOrderBy(val)
    setIsComplete(false)
    setPage(1)
    setTransactionList([])
  }

  return (
    <div className="flex flex-col items-center p-4 max-w-[1400px] w-full mx-auto">
      <h1 className="text-2xl font-bold mb-8">Transactions</h1>
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <div className="collapse collapse-arrow  p-4 w-full md:w-auto rounded-2xl border bg-base-100 border-base-300 min-w-[280px] self-start sticky top-20 z-10">
          <input type="checkbox" />
          <span className="collapse-title text-2xl font-medium">Filter</span>
          <div className="collapse-content border-t border-base-200">
            <div className="text-xl font-medium pt-4">Status</div>
            <form className="w-full">
              {statusList.map((_status) => (
                <div className="form-control" key={_status.value}>
                  <label className="label cursor-pointer">
                    <span className="label-text">{_status.title}</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className={`radio`}
                      value={_status.value}
                      onClick={() => onChangeStatus(_status.value)}
                      checked={resolverStatusActive(_status.value)}
                    />
                  </label>
                </div>
              ))}
            </form>
            <div className="divider" />

            <div className="text-xl font-medium">Order by</div>
            <form className="w-full">
              {orderByList.map((_order) => (
                <div className="form-control" key={_order.value}>
                  <label className="label cursor-pointer">
                    <span className="label-text">{_order.title}</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className={`radio`}
                      value={_order.value}
                      onClick={() => onChangeOrderBy(_order.value)}
                      checked={resolverOrderByActive(_order.value)}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
        <ol className="flex flex-col gap-4 w-full">
          {transactionList.map((transaction) => (
            <li key={transaction.id}>
              <div className="stack w-full">
                <Card className="p-4 bg-base-100 rounded-2xl border border-base-300 shadow-md flex gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base-content text-lg font-bold line-clamp-2">
                      {transaction.id}
                    </h3>
                    <span className="text-base-content ">
                      {transaction.event.title}
                    </span>
                    <span
                      className={`rounded-3xl px-2 py-1 font-bold uppercase w-min text-sm ${
                        transaction.status == "successful"
                          ? "bg-success"
                          : transaction.status == "pending"
                          ? "bg-yellow-400"
                          : transaction.status == "failed"
                          ? "bg-error"
                          : "hidden"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <span className="ml-auto font-bold text-error py-1 px-2 text-xs self-start rounded-3xl">
                    -{transaction.event.ticketPrice} THB
                  </span>
                </Card>
                <Card className="p-4 bg-base-300 rounded-2xl" />
              </div>
            </li>
          ))}
          <li
            ref={targetRef}
            className="col-start-1 col-end-[-1] p-6 flex items-center justify-center"
          >
            {isLoading ? <div className="loading loading-lg"></div> : <></>}
          </li>
        </ol>
      </section>
    </div>
  )
}

"use client"
import React, { useEffect } from "react"
import { Card } from "~/components/Card"
import useUserTransactions from "~/hooks/useUserTransactions"

export default function AccountTransactionsPage() {
  const { transactionList, getUserTransactions } = useUserTransactions()

  useEffect(() => {
    getUserTransactions(1, 100)
  }, [])

  return (
    <div className="flex flex-col items-center p-4 max-w-[1400px] w-full mx-auto">
      <h1 className="text-2xl font-bold mb-8">Transactions</h1>
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <div className="collapse collapse-arrow  p-4 w-full md:w-auto rounded-2xl border bg-base-100 border-base-300 min-w-[280px] self-start sticky top-20 z-10">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Filter by Status
          </div>
          <div className="collapse-content">
            <form className="w-full">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">All</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-primary"
                    checked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Pending</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-yellow-400"
                    checked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Success</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-success"
                    checked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Failed</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-error"
                    checked
                  />
                </label>
              </div>
            </form>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-4 w-full">
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
          <li className=" col-start-1 col-end-[-1] p-6 flex items-center justify-center">
            <div className="loading loading-lg"></div>
          </li>
        </ol>
      </section>
    </div>
  )
}

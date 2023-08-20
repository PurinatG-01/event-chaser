"use client"
import { get } from "http"
import React, { useEffect, useRef, useState } from "react"
import { Card } from "~/components/Card"
import useInfiniteScroll, {
  IUseInfiniteScroll,
} from "~/hooks/useInfiniteScroll"
import useUserTickets from "~/hooks/useUserTickets"
import { Ticket } from "~/models/Ticket"

export default function AccountTicketsPage() {
  const { getUserTickets } = useUserTickets()
  const [ticketList, setTicketList] = useState<Ticket[]>([])
  const [page, setPage] = useState<number>(1)
  const targetRef = useRef<HTMLLIElement>(null)
  const infiniteHandler = async ({
    isLoading,
    setIsLoading,
    setIsComplete,
  }: IUseInfiniteScroll) => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const data = await getUserTickets(page, 10)
      if (data.list) {
        if (data.list.length == 0) {
          setIsLoading(false)
          setIsComplete(true)
        } else {
          if (page == 1) {
            setTicketList([...data.list])
          } else {
            setTicketList((prev) => [...prev, ...data.list])
          }
        }
      } else {
        throw new Error("No more data")
      }
    } catch (error) {
      console.log(error)
      setIsComplete(true)
    } finally {
      setIsLoading(false)
      setPage(page + 1)
    }
  }
  const { isLoading } = useInfiniteScroll(targetRef, infiniteHandler)

  return (
    <div className="flex flex-col items-center p-4 max-w-[1400px] w-full mx-auto">
      <h1 className="text-2xl font-bold mb-8">My tickets</h1>
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ticketList.map((ticket) => (
          <li key={ticket.id}>
            <div className="stack">
              <Card className="p-4 bg-base-100 rounded-2xl border border-base-300 shadow-md flex gap-4 w-full">
                <figure className="rounded-xl h-[100px] w-[100px] overflow-hidden ">
                  <img src={ticket.event.thumbnail} alt={ticket.event.title} />
                  <figcaption className="hidden">
                    {ticket.event.title}
                  </figcaption>
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base-content text-lg font-bold line-clamp-2">
                    {ticket.ticketId}
                  </h3>
                  <span className="text-base-content ">
                    {ticket.event.title}
                  </span>
                  <span className="font-bold text-white bg-yellow-400 py-1 px-2 text-xs self-start rounded-3xl">
                    {ticket.event.ticketPrice} THB
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-base-300 rounded-2xl" />
            </div>
          </li>
        ))}
        <li
          ref={targetRef}
          className=" col-start-1 col-end-[-1] p-6 flex items-center justify-center"
        >
          {isLoading ? <div className="loading loading-lg"></div> : <></>}
        </li>
      </ol>
    </div>
  )
}

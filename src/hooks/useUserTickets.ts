import React, { useState } from "react"
import useQuery from "./useQuery"
import { Ticket } from "~/models/Ticket"
import { Paginator } from "~/models/General"

export default function useUserTickets() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [ticketList, setTicketList] = useState<Ticket[]>([])
  const query = useQuery()
  const getUserTickets = async (page: number, limit = 20) => {
    try {
      setIsLoading(true)
      const { data } = await query<Paginator<Ticket>>("/user/tickets", {
        method: "GET",
        params: {
          page,
          limit,
        },
      })
      if (data.data) {
        setError("")
        setTicketList(data.data.list)
        return Promise.resolve(data.data)
      } else {
        throw new Error(
          `Get ticket list failed at page:${page}, limit:${limit}`
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
    getUserTickets,
    isLoading,
    error,
    ticketList,
  }
}

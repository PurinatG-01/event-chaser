import React, { useEffect, useState } from "react"
import useQuery from "./useQuery"
import { EventList, Event } from "~/models/Event"

export default function useEventList() {
  const query = useQuery()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [eventList, setEventList] = useState<Event[]>([])
  const [totalPage, setTotalPage] = useState<number>(1)

  const queryEventList = async (page: number) => {
    setIsLoading(true)
    try {
      const { data } = await query<EventList>("/event/list", {
        params: {
          page,
        },
      })
      if (data.data) {
        const _eventList = data.data.list ?? []
        setTotalPage(Math.ceil(data.data.total_rows / data.data.limit) ?? 1)
        setEventList([..._eventList])
      } else if (data.error) {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error(error)
      setError((error as Error)?.message || "[GET] /event/list failed")
    } finally {
      setIsLoading(false)
    }
  }
  return { error, isLoading, eventList, queryEventList, totalPage }
}

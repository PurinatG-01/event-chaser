import React, { useEffect, useState } from "react"
import useQuery from "./useQuery"
import { EventList, Event } from "~/models/Event"

export default function useEventList() {
  const query = useQuery()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [eventList, setEventList] = useState<Event[]>([])

  const queryEventList = async (page: number) => {
    setIsLoading(true)
    try {
      const { data } = await query<EventList>("/event/list")
      if (data.data) {
        const _eventList = data.data.list ?? []
        if (page > 1) {
          setEventList([...eventList, ..._eventList])
        } else {
          setEventList([..._eventList])
        }
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
  return { error, isLoading, eventList, queryEventList }
}

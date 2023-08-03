import React, { useState } from "react"
import { Event } from "~/models/Event"
import useQuery from "./useQuery"

export default function useEvent() {
  const query = useQuery()
  const [event, setEvent] = useState<Event>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const queryEventById = async (id: number) => {
    setIsLoading(true)
    try {
      const { data } = await query<Event>(`/event/${id}`)
      if(data.data) {
        setEvent(data.data)
      }
    } catch (error) {
      setError((error as Error)?.message || `[GET] /event/${id} failed`)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    event,
    error,
    isLoading,
    queryEventById,
  }
}

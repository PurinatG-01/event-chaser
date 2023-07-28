"use client"
import { useEffect } from "react"
import EventGridList from "~/components/EventGridList"
import useEventList from "~/hooks/useEventList"

export default function Home() {
  const { eventList, queryEventList } = useEventList()
  useEffect(() => {
    queryEventList(1)
  }, [])
  return (
    <div className="flex flex-col">
      <EventGridList list={eventList} />
    </div>
  )
}

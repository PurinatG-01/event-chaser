import React from "react"
import EventCard from "./EventCard"
import { Event } from "~/models/Event"

export default function EventGridList(props: Props) {
  const { list } = props
  return (
    <ol className="grid gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] m-0">
      {list.map((event, index) => {
        return (
          <li key={index}>
            <EventCard event={event} />
          </li>
        )
      })}
    </ol>
  )
}

type Props = {
  list: Event[]
}

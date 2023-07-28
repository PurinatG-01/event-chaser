import React from "react"
import EventCard from "./EventCard"
import { Event } from "~/models/Event"

export default function EventGridList(props: Props) {
  const { list } = props
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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

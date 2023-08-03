import React from "react"
import EventDetail from "~/components/EventDetail"
import { Event } from "~/models/Event"
import query from "~/utils/query"

const getEventById = async (id: number) => {
  try {
    const { data } = await query()<Event>(`/event/${id}`)
    if (data.data) {
      return Promise.resolve(data.data)
    } else {
      throw new Error("Get event by id: No data")
    }
  } catch (error) {
    return Promise.reject(
      (error as Error)?.message || `[GET] /event/${id} failed`
    )
  }
}

export default async function EventByIdPage({
  params,
}: {
  params: { id: string }
}) {
  const { id: eventIdStr } = params
  const eventId = isNaN(+eventIdStr) ? 0 : +eventIdStr
  const pageId = `event-${eventId}-page`
  const [event] = await Promise.all([getEventById(eventId)])
  return (
    <>
      {event ? (
        <div className="event-detail-page" id={pageId}>
          <EventDetail event={event} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

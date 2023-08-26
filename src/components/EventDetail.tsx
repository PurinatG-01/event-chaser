import React from "react"
import type { Event } from "~/models/Event"
import dayjs from "dayjs"

import Image from "next/image"
import Link from "next/link"
export default function EventDetail({ event }: { event: Event }) {
  const articleId = `event-${event.id}-detail-article`
  return (
    <article
      className="py-[100px] rounded-2xl event-detail-article flex flex-col p-4 max-w-[600px] mx-auto gap-3 pt-8 mt-8"
      id={articleId}
    >
      <img
        src={event.thumbnail}
        alt={event.title}
        className="max-h-[500px] event-detail-article__image mx-auto rounded-lg overflow-hidden mb-4"
      />
      <h1 className="text-4xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <div className="stats stats-vertical border border-base-200 rounded-lg lg:stats-horizontal shadow-lg">
        <div className="stat">
          <div className="stat-title">Started</div>
          <div className="stat-value text-base">
            {dayjs(event.startedAt).format("D MMM YYYY HH:mm")}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Ended</div>
          <div className="stat-value text-base">
            {" "}
            {dayjs(event.endedAt).format("D MMM YYYY HH:mm")}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Ticket price</div>
          <div className="stat-value text-lg text-yellow-500">
            {event.ticketPrice} THB
          </div>
          <div className="stat-desc">Total tickets: {event.totalTickets}</div>
        </div>
      </div>
      <div className="mx-auto w-full mt-4 justify-center items-center flex shadow-xl">
        <button
          className={`max-w-[600px] w-full rounded-lg active:scale-[0.95] transition-all flex items-center justify-center active:opacity-70 hover:opacity-70
        font-semibold bg-green-400 text-bold text-white mt-auto px-4 py-2 relative ${
          event.ticketPrice <= 0 ? "opacity-50 !bg-slate-400" : ""
        }`}
          disabled={event.ticketPrice <= 0}
        >
          <Link
            href={`/event/${event.id}/purchase`}
            className={`${event.ticketPrice <= 0 ? "pointer-events-none" : ""}`}
          ></Link>
          {event.ticketPrice <= 0 ? "Unable to purchase" : "Purchase"}
        </button>
      </div>
    </article>
  )
}

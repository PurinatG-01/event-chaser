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
      <Image
        src={event.thumbnail}
        width={500}
        height={500}
        alt={event.title}
        className="event-detail-article__image mx-auto rounded-lg overflow-hidden mb-4"
      />
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <h3>Tickets</h3>
      <div className="flex gap-2 flex-wrap">
        <span className="px-2 py-1 rounded-[24px] text-[#232323] flex items-center justify-center bg-[#e4e4e4]">
          Total tickets : &nbsp;<strong>{event.totalTickets} ea</strong>
        </span>
        <span className="px-2 py-1 rounded-[24px] text-[#ffffff] flex items-center justify-center bg-[#ffb236]">
          Ticket price : &nbsp;<strong>{event.ticketPrice} THB</strong>
        </span>
      </div>
      <h3>Date</h3>
      <div className="flex gap-2 flex-wrap">
        <span className="px-2 py-1 rounded-[24px] text-[#ffffff] flex items-center justify-center bg-[#30e36f]">
          Started at : &nbsp;
          <strong>
            {dayjs(event.startedAt).format("DD MMM YYYY / HH:mm")}
          </strong>
        </span>
        <span className="px-2 py-1 rounded-[24px] text-[#ffffff] flex items-center justify-center bg-[#ff7474]">
          Ended at : &nbsp;
          <strong>{dayjs(event.endedAt).format("DD MMM YYYY / HH:mm")}</strong>
        </span>
        <span className="px-2 py-1 rounded-[24px] text-[#ffffff] flex items-center justify-center bg-[#ffb236]">
          Released at : &nbsp;
          <strong>
            {dayjs(event.releasedAt).format("DD MMM YYYY / HH:mm")}
          </strong>
        </span>
      </div>
      <div className="mx-auto p-2 justify-center items-center flex z-10 left-0 bottom-0 fixed shadow-xl w-screen bg-base-100">
        <button
          className={`max-w-[600px] w-full rounded-lg active:scale-[0.95] transition-all flex items-center justify-center active:opacity-70 hover:opacity-70
        font-semibold bg-[#30e36f] text-bold text-white mt-auto px-4 py-2 relative ${
          event.ticketPrice <= 0 ? "opacity-50 !bg-slate-400" : ""
        }`}
          disabled={event.ticketPrice <= 0}
        >
          <Link
            href={`/event/${event.id}/purchase`}
            className={`z-10 top-0 left-0 absolute w-full h-full ${
              event.ticketPrice <= 0 ? "pointer-events-none" : ""
            }`}
          ></Link>
          {event.ticketPrice <= 0 ? "Unable to purchase" : "Purchase"}
        </button>
      </div>
    </article>
  )
}

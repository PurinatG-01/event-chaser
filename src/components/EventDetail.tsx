// "use client"
import React from "react"
import type { Event } from "~/models/Event"
// import { Image } from "@nextui-org/react"
import Image from "next/image"
export default function EventDetail({ event }: { event: Event }) {
  const articleId = `event-${event.id}-detail-article`
  return (
    <article
      className="border rounded-2xl event-detail-article flex flex-col p-4 max-w-[600px] mx-auto gap-3 pt-8 mt-8"
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
      <div className="flex gap-2 flex-wrap">
        <span className="px-2 py-1 rounded-[24px] text-[#232323] flex items-center justify-center bg-[#e4e4e4]">
          Total tickets : &nbsp;<strong>{event.totalTickets} ea</strong>
        </span>
        <span className="px-2 py-1 rounded-[24px] text-[#232323] flex items-center justify-center bg-[#e4e4e4]">
          Ticket price : &nbsp;<strong>{event.ticketPrice} THB</strong>
        </span>
      </div>
      <button
        className="w-full rounded-lg active:scale-[0.95] transition-all flex items-center justify-center active:opacity-70 hover:opacity-70
      font-semibold bg-[#30e36f] text-bold text-white mt-auto px-4 py-2"
      >
        Purchase
      </button>
    </article>
  )
}

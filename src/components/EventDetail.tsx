// "use client"
import React from "react"
import type { Event } from "~/models/Event"
// import { Image } from "@nextui-org/react"
import Image from "next/image"
export default function EventDetail({ event }: { event: Event }) {
  const articleId = `event-${event.id}-detail-article`
  return (
    <article className="event-detail-article flex flex-col p-4" id={articleId}>
      <Image
        src={event.thumbnail}
        width={500}
        height={500}
        alt={event.title}
        className="event-detail-article__image mx-auto rounded-lg overflow-hidden mb-4"
      />
      <h2>{event.title}</h2>
      <p>{event.description}</p>
    </article>
  )
}

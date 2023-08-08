import { Event } from "~/models/Event"
import { motion } from "framer-motion"
import Link from "next/link"

const CardContainer = motion.div
export default function EventCard(props: Props) {
  const { event, isTopCard } = props
  return (
    <CardContainer
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl overflow-hidden shadow-lg card w-full h-full cursor-pointer !hadow-none !border-none !relative ${
        isTopCard ? "!border-8 !border-[#ffba3b]" : ""
      }`}
    >
      <Link
        href={`/event/${event.id}`}
        className="z-10 absolute top-0 left-0 w-full h-full"
      />
      {isTopCard && (
        <div className="absolute z-[1] top-3 left-3 font-bold">
          <div className="badge badge-warning gap-2 text-base-100">Top Event</div>
        </div>
      )}
      <figure className="w-full">
        <img className="w-full" src={event.thumbnail} alt="asdasd" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p className="line-clamp-2">{event.description}</p>
      </div>
    </CardContainer>
  )
}

type Props = {
  event: Event
  isTopCard?: boolean
}

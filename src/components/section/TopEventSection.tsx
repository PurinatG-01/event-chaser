import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Event } from "~/models/Event"
import Link from "next/link"
import "./section.css"
export default function TopEventSection(props: Props) {
  const { eventList } = props
  const resolvedEventList = useMemo(() => eventList.splice(0, 3), [eventList])
  return (
    <section id="top-section" className="flex flex-col gap-4 px-4 pb-[100px]">
      <h2 className="text-3xl font-bold">Top Events</h2>
      <motion.ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resolvedEventList.map((event, index) => (
          <li className={`h-[20vh] md:h-[50vh]`} key={event.id}>
            <motion.div
                      animate={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
              className="stack h-full w-full"
              data-index={index + 1}
            >
              <div
                className={`top-card rounded-2xl shadow-md relative w-full  h-full overflow-hidden`}
              >
                <Link
                  href={`/event/${event.id}`}
                  className="w-full h-full absolute z-10"
                />
                <img
                  src={event.thumbnail}
                  className="h-full w-full object-cover"
                  alt={event.title}
                />
                <h3 className="cursor-pointer absolute p-2 first-letter:text-[5rem] first-letter:capitalize bottom-0 left-0 text-4xl font-bold text-primary-content">
                  {event.title}
                </h3>
              </div>
              <div
                className={`rounded-2xl bg-primary shadow-md relative w-full h-full bg-red`}
              ></div>
              <div
                className={`rounded-2xl bg-secondary shadow-md relative w-full h-full bg-red`}
              ></div>
            </motion.div>
          </li>
        ))}
      </motion.ol>
    </section>
  )
}

type Props = {
  eventList: Event[]
}

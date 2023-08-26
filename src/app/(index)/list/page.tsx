"use client"
import React, { useEffect, useState } from "react"
import EventGridList from "~/components/EventGridList"
import PageWrapper from "~/components/PageWrapper"
import useEventList from "~/hooks/useEventList"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination as SwiperPagination } from "swiper/modules"
import EventCard from "~/components/EventCard"
import { motion } from "framer-motion"

import "./list.css"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/pagination"
import TopEventSection from "~/components/section/TopEventSection"

export default function ListPage() {
  const { eventList: topEventList, queryEventList: queryTopEventList } =
    useEventList()
  const { eventList, queryEventList, totalPage, isLoading } = useEventList()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    queryTopEventList(1)
    queryEventList(1)
  }, [])

  const onChangePagination = (action: "prev" | "next") => {
    if (action == "next" && currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
      queryEventList(currentPage)
    } else if (action == "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1)
      queryEventList(currentPage)
    }
  }
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold flex mb-4 justify-between flex-wrap items-center p-4">
        Event list
      </h1>
      <div className="flex flex-col py-4 !max-w-[1400px] mx-auto w-full">
        <TopEventSection eventList={topEventList} />
      </div>
      <div className="flex flex-col">
        <div className="px-4 py-8 !max-w-[1400px] mx-auto !w-full">
          <motion.h2 className="text-2xl font-bold flex mb-4 justify-between flex-wrap items-center">
            All Events
            <div className="join ml-auto">
              <button
                className="join-item btn"
                onClick={() => onChangePagination("prev")}
              >
                «
              </button>
              <button className="join-item btn">Page {currentPage}</button>
              <button
                className="join-item btn"
                onClick={() => onChangePagination("next")}
              >
                »
              </button>
            </div>
          </motion.h2>
          {isLoading ? (
            <div className="h-[50vh] flex items-center justify-center">
              {/* <Loading type="points" size="xl" /> */}
            </div>
          ) : (
            <EventGridList list={eventList} />
          )}
          <div className="flex w-full justify-center md:justify-end">
            <div className="join mt-4 ml-auto">
              <button
                className="join-item btn"
                onClick={() => onChangePagination("prev")}
              >
                «
              </button>
              <button className="join-item btn">Page {currentPage}</button>
              <button
                className="join-item btn"
                onClick={() => onChangePagination("next")}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

"use client"
import { Container, Loading, Pagination } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import EventGridList from "~/components/EventGridList"
import PageWrapper from "~/components/PageWrapper"
import useEventList from "~/hooks/useEventList"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination as SwiperPagination } from "swiper/modules"
import EventCard from "~/components/EventCard"
import { motion } from "framer-motion"
import { Text } from "@nextui-org/react"

const SectionTitle = motion(Text)

import "./list.css"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/pagination"

export default function ListPage() {
  const { eventList: topEventList, queryEventList: queryTopEventList } =
    useEventList()
  const { eventList, queryEventList, totalPage, isLoading } = useEventList()
  const [allEventPage, setAllEventPage] = useState(1)

  useEffect(() => {
    queryTopEventList(1)
    queryEventList(1)
  }, [])

  const onChangePagination = (page: number) => {
    queryEventList(page)
    setAllEventPage(page)
  }
  return (
    <PageWrapper>
      <div className="flex flex-col py-4 !max-w-[1400px] mx-auto">
        <div className="px-4 py-4 !w-full">
          <SectionTitle h2>Top Events</SectionTitle>
          <Swiper
            modules={[Autoplay, SwiperPagination]}
            slidesPerView={1}
            centeredSlides
            loop
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              400: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 2000,
            }}
          >
            {topEventList.map((event, index) => (
              <SwiperSlide className="top-slide" key={index}>
                <EventCard isTopCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4 py-8 !max-w-[1400px] mx-auto !w-full">
          <SectionTitle
            h2
            className="flex justify-between flex-wrap items-center"
          >
            All Events
            <Pagination
              className="ml-auto"
              total={totalPage}
              initialPage={1}
              page={allEventPage}
              onChange={onChangePagination}
            />
          </SectionTitle>
          {isLoading ? (
            <div className="h-[50vh] flex items-center justify-center">
              <Loading type="points" size="xl" />
            </div>
          ) : (
            <EventGridList list={eventList} />
          )}
          <div className="flex w-full justify-center md:justify-end">
            <Pagination
              className="!mt-4 ml-auto"
              total={totalPage}
              initialPage={1}
              page={allEventPage}
              onChange={onChangePagination}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

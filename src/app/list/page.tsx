"use client"
import { Container } from "@nextui-org/react"
import React, { useEffect } from "react"
import EventGridList from "~/components/EventGridList"
import useEventList from "~/hooks/useEventList"
import MainLayout from "~/layouts/MainLayout"

export default function ListPage() {
  const { eventList, queryEventList } = useEventList()
  useEffect(() => {
    queryEventList(1)
  }, [])
  return (
    <MainLayout>
      <div className="flex flex-col">
        <Container className="container py-4 !max-w-[1400px]">
          <EventGridList list={eventList} />
        </Container>
      </div>
    </MainLayout>
  )
}

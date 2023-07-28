import { Paginator } from "./General"

export interface Event {
  createdAt: string
  description: string
  endedAt: string
  id: number
  releasedAt: string
  startedAt: string
  ticketPrice: number
  title: string
  totalTickets: number
  updatedAt: string
}

export type EventList = Paginator<Event>

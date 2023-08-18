import { Event } from "./Event"
export interface Ticket {
  createdAt: string
  event: Event
  eventId: number
  id: number
  ticketId: string
  updatedAt: string
  userId: number
}

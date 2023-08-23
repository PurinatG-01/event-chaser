import { Event } from "./Event"
export interface Transaction {
  createdAt: string
  event: Event
  eventId: number
  id: string
  purchaserId: number
  status: string
  ticketId: any
  transactionId: string
  updatedAt: string
}

export enum OMISE_CHARGE_STATUS {
  ALL = "all",
  SUCCESSFUL = "successful",
  FAILED = "failed",
  PENDING = "pending",
}
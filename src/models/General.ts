export interface Paginator<T> {
  limit: number
  list: T[]
  page: number
  sort: string
  total_pages: number
  total_rows: number
}

export interface ApiResponse<T> {
  status: number
  data: T
  error: string
}

export enum ORDER_BY {
  ASC = "asc",
  DESC = "desc",
}

export const COOKIES_JWT_NAME = "__event-jwt"

export interface Paginator<T> {
    limit: number
    list: T[]
    page: number
    sort: string
    total_pages: number
    total_rows: number
  }
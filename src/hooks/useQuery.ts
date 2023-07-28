import React, { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"

interface ApiResponse<T> {
  status: number
  data: T
  error: string
}

export default function useQuery() {
  const headers = {
    Authorization: "Bearer aaa",
  }
  const baseURL =
    process.env.NEXT_PUBLIC_APP_ENV == "production"
      ? process.env.NEXT_PUBLIC_API_PROD_HOST
      : process.env.NEXT_PUBLIC_API_DEV_HOST

  const instance = axios.create({
    baseURL,
    headers,
  })

  return async <T>(url: string, options?: AxiosRequestConfig<any>) => {
    return await instance.request<ApiResponse<T>>({
      url,
      ...options,
      method: !options?.method ? "GET" : options.method,
    })
  }
}

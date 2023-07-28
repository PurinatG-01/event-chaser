import React, { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { COOKIES_JWT_NAME } from "~/provider/useAuth"
import Cookies from "js-cookie"

interface ApiResponse<T> {
  status: number
  data: T
  error: string
}

export default function useQuery() {
  const baseURL =
    process.env.NEXT_PUBLIC_APP_ENV == "production"
      ? process.env.NEXT_PUBLIC_API_PROD_HOST
      : process.env.NEXT_PUBLIC_API_DEV_HOST

  const createInstance = (token?: string) => {
    let headers = {}

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return axios.create({
      baseURL,
      headers,
    })
  }

  return async <T>(
    url: string,
    options?: AxiosRequestConfig<any>,
    token?: string
  ) => {
    const instance = createInstance(token || Cookies.get(COOKIES_JWT_NAME))

    return await instance.request<ApiResponse<T>>({
      url,
      ...options,
      method: !options?.method ? "GET" : options.method,
    })
  }
}

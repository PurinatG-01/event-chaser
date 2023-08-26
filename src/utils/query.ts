import axios, { AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { ApiResponse, COOKIES_JWT_NAME } from "~/models/General"

export default function query() {
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
      withCredentials: true,
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

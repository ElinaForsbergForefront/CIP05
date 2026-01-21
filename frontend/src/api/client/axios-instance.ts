import Axios, { AxiosError, type AxiosRequestConfig } from "axios"

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5021"

export const axios = Axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
})

// Response interceptor for error handling
axios.interceptors.response.use(
  response => {
    if (import.meta.env.VITE_LOG_LEVEL === "debug") {
      console.log("API Response:", response.status, response.config.url)
    }
    return response
  },
  (error: AxiosError) => {
    // Global error handling
    if (error.response?.status === 401) {
      console.error("Unauthorized access")
      // Handle unauthorized - redirect to login, etc.
    } else if (error.response?.status === 404) {
      console.error("Resource not found")
    } else if (error.response?.status === 500) {
      console.error("Server error")
    }

    if (import.meta.env.VITE_LOG_LEVEL === "debug") {
      console.error("API Error:", error.message, error.response?.data)
    }

    return Promise.reject(error)
  }
)

export const customAxiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()

  const promise = axios({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error - Adding cancel method for react-query
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>

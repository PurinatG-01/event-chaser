"use client"

import { useEffect } from "react"
import PageWrapper from "~/components/PageWrapper"

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <PageWrapper>
      <div className="w-full h-full my-auto px-4">
        <h1 className="font-bold text-3xl text-center mb-4">Page 404</h1>
        <p className="text-sm text-center">{error.message}</p>
      </div>
    </PageWrapper>
  )
}

import React from "react"

export default function EmptyState({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="p-4 py-8 mx-auto">
      <h2 className="text-3xl font-bold text-center">
        {!title ? "Empty" : title}
      </h2>
      <p className="text-sm font-light text-center">
        {!description ? "" : description}
      </p>
    </div>
  )
}

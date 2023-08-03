"use client"
import React from "react"
import { isPartiallyEmittedExpression } from "typescript"
import EmptyState from "~/components/state/EmptyState"

export default function EventByIdErrorPage({
  params,
}: {
  params: { id: string }
}) {
    
  return (
    <div className="flex items-center justify-center">
      <EmptyState
        title="Event not found"
        description={`Cannot found event id on the system.`}
      />
    </div>
  )
}

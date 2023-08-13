"use client"
import React, { useEffect, useState } from "react"
import UpdateForm from "~/components/account/UpdateForm"
import useUser from "~/hooks/useUser"

export default function AccountIndexPage() {
  const { avatarUrl, displayName } = useUser()
  const [displayForm, setDisplayForm] = useState({
    displayName: displayName,
    displayImgUrl: avatarUrl,
    email: "",
  })
  useEffect(() => {
    setDisplayForm({
      displayName: displayName,
      displayImgUrl: avatarUrl,
      email: "",
    })
  }, [avatarUrl, displayName])
  return (
    <div className="flex flex-col items-center p-4 max-w-[400px] w-full mx-auto">
      <UpdateForm displayForm={displayForm} />
    </div>
  )
}

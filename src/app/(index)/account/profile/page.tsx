"use client"
import React, { useEffect, useState } from "react"
import UpdateForm from "~/components/account/UpdateForm"
import useUser from "~/hooks/useUser"

export default function AccountIndexPage() {
  const { avatarUrl, displayName, email } = useUser()
  const [displayForm, setDisplayForm] = useState({
    displayName: displayName,
    displayImgUrl: avatarUrl,
    email: email,
  })
  useEffect(() => {
    setDisplayForm({
      displayName: displayName,
      displayImgUrl: avatarUrl,
      email: email,
    })
  }, [avatarUrl, displayName, email])
  return (
    <div className="flex flex-col items-center p-4 max-w-[400px] w-full mx-auto">
      <UpdateForm displayForm={displayForm} />
    </div>
  )
}

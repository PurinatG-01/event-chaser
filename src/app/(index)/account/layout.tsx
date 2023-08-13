import React, { PropsWithChildren } from "react"
import PageWrapper from "~/components/PageWrapper"
import AccountNavbar from "~/components/account/NavBar"
export default function AccountLayout(props: Props) {
  const { children } = props
  return (
    <PageWrapper>
      <div className="max-w-[1400px] pt-2 w-full mx-auto flex flex-col">
        <AccountNavbar />
        <div className="mx-auto w-full p-8">{children}</div>
      </div>
    </PageWrapper>
  )
}

type Props = PropsWithChildren<{}>

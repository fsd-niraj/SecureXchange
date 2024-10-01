"use client"
import { signOut, useSession } from "next-auth/react"
import Button from "./Button"

export const Appbar = () => {
  const session = useSession();
  const signIn = () => {
    console.log("signed out")
  }
  return (
    <div className="border-b px-2 py-2 flex justify-between">
      <div>
        CRYP-EXCHANGE
      </div>
      <div>
        {session.data?.user ? <Button onClick={() => signOut({ callbackUrl: "http://localhost:3000", redirect: true })}>Sign out</Button> : <Button onClick={() => signIn}>Log In</Button>}
      </div>
    </div>
  )
}
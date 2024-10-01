"use client";
import { signIn, useSession } from "next-auth/react"
import Button from "./Button"
import { useRouter } from "next/navigation";

export const Hero = () => {
  const session = useSession()
  const router = useRouter()
  return (
    <>
      <div>Welcome to Cryp-Exchange</div>
      <div>
        {session.data?.user ?
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button> :
          <Button onClick={() => signIn("google")}>Login with Google</Button>
        }
      </div>
    </>
  )
}
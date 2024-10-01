import Profile from "../components/Profile";
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "../lib/auth";

async function getUserWallet() {
  const session = await getServerSession(authConfig);
  const userWallet = await db.solanaWallet.findFirst({
    where: {
      //@ts-ignore
      userId: session?.user?.uid
    },
    select: {
      publicKey: true
    }
  })
  if (!userWallet) {
    return {
      error: "No solana wallet found"
    }
  }
  return { error: null, userWallet }
}

export default async function Dashboard() {

  const userWallet = await getUserWallet();
  if (userWallet.error || !userWallet.userWallet?.publicKey) {
    return <h1>No solana wallet found</h1>
  }

  return (
    <>
      <Profile publicKey={userWallet.userWallet.publicKey} />
    </>
  )
}
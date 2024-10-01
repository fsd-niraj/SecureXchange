"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const Profile = ({ publicKey }: { publicKey: string }) => {

  const session = useSession();
  const [copied, setCopied] = useState(false);

  const copyWalletAddr = () => {
    setCopied(true);
    let copyTimeout = setTimeout(() => {
      setCopied(false);
    }, 5000);
    navigator.clipboard.writeText(publicKey);

    return () => {
      clearTimeout(copyTimeout)
    }
  }

  return (
    <div className="text-center container m-auto">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl py-4">
        Welcome back, {session.data?.user?.name}
      </h1>
      <div className="flex justify-between">
        <div>USD</div>
        <div>
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" onClick={() => copyWalletAddr()}>
            {copied ? "Copied" : "Copy Your Wallet Address"}
          </span>
        </div>
      </div>
    </div>
  )
}
export default Profile
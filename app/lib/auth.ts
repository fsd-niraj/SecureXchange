import GoogleProvider from "next-auth/providers/google";
import db from "@/app/db";
import { Keypair } from "@solana/web3.js";

import { NextAuthOptions, Session } from "next-auth";

export interface session extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    uid: string;
  };
}

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: ({ session, token }: any): session => {
      const newSes: session = session as session;
      if (newSes.user && token.uid) {
        newSes.user.uid = token.uid ?? "";
      }
      return newSes;
    },
    async jwt({ token, account }: any) {
      const user = await db.user.findFirst({
        where: {
          sub: account?.providerAccountId ?? "",
        },
      });
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        const userDb = await db.user.findFirst({
          where: {
            username: email,
          },
        });

        if (userDb) {
          return true;
        }

        const keypair = Keypair.generate();

        await db.user.create({
          data: {
            username: email,
            name: profile?.name,
            profilePicture: profile?.picture,
            provider: "Google",
            sub: account?.providerAccountId,
            solanaWallet: {
              create: {
                publicKey: keypair.publicKey.toBase58(),
                privateKey: keypair.secretKey.toString(),
              },
            },
            cadWallet: {
              create: {
                balance: 0,
              },
            },
          },
        });
        return true;
      }
      return false;
    },
  },
};

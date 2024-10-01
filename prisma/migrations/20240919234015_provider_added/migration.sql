/*
  Warnings:

  - You are about to drop the column `pubicKey` on the `SolanaWallet` table. All the data in the column will be lost.
  - Added the required column `publicKey` to the `SolanaWallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google');

-- AlterTable
ALTER TABLE "SolanaWallet" DROP COLUMN "pubicKey",
ADD COLUMN     "publicKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider" NOT NULL;

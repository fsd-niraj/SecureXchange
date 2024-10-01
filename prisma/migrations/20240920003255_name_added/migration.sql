-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "sub" TEXT NOT NULL DEFAULT '';

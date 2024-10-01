-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "solanaWalletId" TEXT,
    "cadWalletId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadWallet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cadWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaWallet" (
    "id" TEXT NOT NULL,
    "pubicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SolanaWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cadWallet_userId_key" ON "cadWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SolanaWallet_userId_key" ON "SolanaWallet"("userId");

-- AddForeignKey
ALTER TABLE "cadWallet" ADD CONSTRAINT "cadWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolanaWallet" ADD CONSTRAINT "SolanaWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

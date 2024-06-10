/*
  Warnings:

  - You are about to drop the `Vacations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vacations" DROP CONSTRAINT "Vacations_userId_fkey";

-- DropTable
DROP TABLE "Vacations";

-- CreateTable
CREATE TABLE "vacations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productValue" INTEGER NOT NULL,
    "totalValue" INTEGER NOT NULL,

    CONSTRAINT "vacations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vacations" ADD CONSTRAINT "vacations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "firefighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

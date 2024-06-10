/*
  Warnings:

  - You are about to drop the `Overhours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vacations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Overhours" DROP CONSTRAINT "Overhours_userId_fkey";

-- DropForeignKey
ALTER TABLE "vacations" DROP CONSTRAINT "vacations_userId_fkey";

-- DropTable
DROP TABLE "Overhours";

-- DropTable
DROP TABLE "vacations";

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productValue" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "warehouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "firefighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

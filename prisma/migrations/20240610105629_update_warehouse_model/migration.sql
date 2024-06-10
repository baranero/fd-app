/*
  Warnings:

  - Added the required column `totalValue` to the `warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warehouse" ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalValue" INTEGER NOT NULL;

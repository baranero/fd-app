/*
  Warnings:

  - You are about to drop the column `amount` on the `vacations` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `vacations` table. All the data in the column will be lost.
  - Added the required column `manufacturer` to the `vacations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacations" DROP COLUMN "amount",
DROP COLUMN "type",
ADD COLUMN     "manufacturer" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT;

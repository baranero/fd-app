/*
  Warnings:

  - You are about to drop the column `firefighterId` on the `Firefighters` table. All the data in the column will be lost.
  - You are about to drop the column `nameFire` on the `Firefighters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Firefighters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Firefighters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Firefighters" DROP CONSTRAINT "Firefighters_firefighterId_nameFire_fkey";

-- DropIndex
DROP INDEX "users_id_name_key";

-- AlterTable
ALTER TABLE "Firefighters" DROP COLUMN "firefighterId",
DROP COLUMN "nameFire",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Firefighters_name_key" ON "Firefighters"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_name_fkey" FOREIGN KEY ("name") REFERENCES "Firefighters"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

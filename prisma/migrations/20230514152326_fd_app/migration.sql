/*
  Warnings:

  - You are about to drop the `Overhours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vacations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Overhours" DROP CONSTRAINT "Overhours_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vacations" DROP CONSTRAINT "Vacations_userId_fkey";

-- DropTable
DROP TABLE "Overhours";

-- DropTable
DROP TABLE "Vacations";

-- CreateTable
CREATE TABLE "Firefighters" (
    "id" TEXT NOT NULL,
    "firefighterId" TEXT NOT NULL,
    "nameFire" TEXT NOT NULL,
    "vacations" INTEGER NOT NULL,
    "overhours" INTEGER NOT NULL,

    CONSTRAINT "Firefighters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_name_key" ON "users"("id", "name");

-- AddForeignKey
ALTER TABLE "Firefighters" ADD CONSTRAINT "Firefighters_firefighterId_nameFire_fkey" FOREIGN KEY ("firefighterId", "nameFire") REFERENCES "users"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Firefighters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_name_fkey";

-- DropTable
DROP TABLE "Firefighters";

-- CreateTable
CREATE TABLE "firefighters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vacations" INTEGER NOT NULL,
    "overhours" INTEGER NOT NULL,

    CONSTRAINT "firefighters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "firefighters_name_key" ON "firefighters"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_name_fkey" FOREIGN KEY ("name") REFERENCES "firefighters"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

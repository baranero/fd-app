-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_name_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "firefighterId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_firefighterId_fkey" FOREIGN KEY ("firefighterId") REFERENCES "firefighters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

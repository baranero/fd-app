-- DropForeignKey
ALTER TABLE "warehouse" DROP CONSTRAINT "warehouse_userId_fkey";

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

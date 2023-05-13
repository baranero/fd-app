-- CreateTable
CREATE TABLE "Vacations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vacations" INTEGER NOT NULL,

    CONSTRAINT "Vacations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overhours" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vacations" INTEGER NOT NULL,

    CONSTRAINT "Overhours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vacations" ADD CONSTRAINT "Vacations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overhours" ADD CONSTRAINT "Overhours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

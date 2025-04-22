/*
  Warnings:

  - Added the required column `gymId` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

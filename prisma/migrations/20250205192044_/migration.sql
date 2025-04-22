-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_gymId_fkey";

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "gymId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE SET NULL ON UPDATE CASCADE;

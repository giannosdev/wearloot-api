/*
  Warnings:

  - You are about to drop the column `primaryMuscleId` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `SetDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SetDetails" DROP CONSTRAINT "SetDetails_exerciseInstanceId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "primaryMuscleId";

-- AlterTable
ALTER TABLE "SetDetails" ADD COLUMN     "exerciseId" TEXT NOT NULL,
ALTER COLUMN "exerciseInstanceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SetDetails" ADD CONSTRAINT "SetDetails_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetDetails" ADD CONSTRAINT "SetDetails_exerciseInstanceId_fkey" FOREIGN KEY ("exerciseInstanceId") REFERENCES "ExerciseInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

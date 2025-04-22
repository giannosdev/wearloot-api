/*
  Warnings:

  - You are about to drop the column `actualReps` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `actualSets` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `actualWeight` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `breakTime` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseTemplateId` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `plannedReps` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `plannedSets` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `plannedWeight` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseTemplateId` on the `WorkoutExercise` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `ExerciseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseInstance" DROP CONSTRAINT "ExerciseInstance_exerciseTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseTemplateId_fkey";

-- AlterTable
ALTER TABLE "ExerciseInstance" DROP COLUMN "actualReps",
DROP COLUMN "actualSets",
DROP COLUMN "actualWeight",
DROP COLUMN "breakTime",
DROP COLUMN "duration",
DROP COLUMN "exerciseTemplateId",
DROP COLUMN "plannedReps",
DROP COLUMN "plannedSets",
DROP COLUMN "plannedWeight",
ADD COLUMN     "exerciseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "exerciseTemplateId",
ADD COLUMN     "exerciseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SetDetails" (
    "id" TEXT NOT NULL,
    "exerciseInstanceId" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "breakTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SetDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SetDetails" ADD CONSTRAINT "SetDetails_exerciseInstanceId_fkey" FOREIGN KEY ("exerciseInstanceId") REFERENCES "ExerciseInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInstance" ADD CONSTRAINT "ExerciseInstance_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

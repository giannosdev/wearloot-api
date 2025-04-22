/*
  Warnings:

  - You are about to drop the column `parentId` on the `AllocatedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `parentType` on the `AllocatedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `WorkoutInstance` table. All the data in the column will be lost.
  - You are about to drop the `_ProgramToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_WorkoutExercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutInstance" DROP CONSTRAINT "WorkoutInstance_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToWorkout" DROP CONSTRAINT "_ProgramToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToWorkout" DROP CONSTRAINT "_ProgramToWorkout_B_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutExercises" DROP CONSTRAINT "_WorkoutExercises_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutExercises" DROP CONSTRAINT "_WorkoutExercises_B_fkey";

-- AlterTable
ALTER TABLE "AllocatedWorkout" DROP COLUMN "parentId",
DROP COLUMN "parentType";

-- AlterTable
ALTER TABLE "WorkoutInstance" DROP COLUMN "workoutId",
ADD COLUMN     "allocatedWorkoutId" TEXT;

-- DropTable
DROP TABLE "_ProgramToWorkout";

-- DropTable
DROP TABLE "_WorkoutExercises";

-- AddForeignKey
ALTER TABLE "AllocatedWorkout" ADD CONSTRAINT "AllocatedWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutInstance" ADD CONSTRAINT "WorkoutInstance_allocatedWorkoutId_fkey" FOREIGN KEY ("allocatedWorkoutId") REFERENCES "AllocatedWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `programId` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `ExerciseInstance` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `coachId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `WorkoutExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutProgramTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workoutInstanceId` to the `ExerciseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseInstance" DROP CONSTRAINT "ExerciseInstance_programId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseInstance" DROP CONSTRAINT "ExerciseInstance_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_coachId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutProgram" DROP CONSTRAINT "WorkoutProgram_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutProgram" DROP CONSTRAINT "WorkoutProgram_programId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutProgram" DROP CONSTRAINT "WorkoutProgram_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutProgramTemplate" DROP CONSTRAINT "WorkoutProgramTemplate_gymId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_programInstanceId_fkey";

-- AlterTable
ALTER TABLE "ExerciseInstance" DROP COLUMN "programId",
DROP COLUMN "workoutSessionId",
ADD COLUMN     "workoutInstanceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "clientId",
DROP COLUMN "coachId",
DROP COLUMN "completed",
DROP COLUMN "date",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "WorkoutExercise";

-- DropTable
DROP TABLE "WorkoutProgram";

-- DropTable
DROP TABLE "WorkoutProgramTemplate";

-- DropTable
DROP TABLE "WorkoutSession";

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "gymId" TEXT NOT NULL,
    "durationDays" INTEGER,
    "rotationDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramInstance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "assignedById" TEXT,
    "chosenDays" INTEGER[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutInstance" (
    "id" TEXT NOT NULL,
    "programInstanceId" TEXT,
    "workoutId" TEXT,
    "userId" TEXT,
    "coachId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramInstance" ADD CONSTRAINT "ProgramInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramInstance" ADD CONSTRAINT "ProgramInstance_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramInstance" ADD CONSTRAINT "ProgramInstance_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInstance" ADD CONSTRAINT "ExerciseInstance_workoutInstanceId_fkey" FOREIGN KEY ("workoutInstanceId") REFERENCES "WorkoutInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutInstance" ADD CONSTRAINT "WorkoutInstance_programInstanceId_fkey" FOREIGN KEY ("programInstanceId") REFERENCES "ProgramInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutInstance" ADD CONSTRAINT "WorkoutInstance_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutInstance" ADD CONSTRAINT "WorkoutInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutInstance" ADD CONSTRAINT "WorkoutInstance_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

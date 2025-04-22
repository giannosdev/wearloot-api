/*
  Warnings:

  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProgramWorkouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramWorkouts" DROP CONSTRAINT "_ProgramWorkouts_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramWorkouts" DROP CONSTRAINT "_ProgramWorkouts_B_fkey";

-- DropTable
DROP TABLE "_ExerciseToWorkout";

-- DropTable
DROP TABLE "_ProgramWorkouts";

-- CreateTable
CREATE TABLE "AllocatedExercise" (
    "id" TEXT NOT NULL,
    "allocatedWorkoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sets" JSONB NOT NULL,
    "order" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AllocatedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllocatedWorkout" (
    "id" TEXT NOT NULL,
    "parentType" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "order" INTEGER,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programId" TEXT,

    CONSTRAINT "AllocatedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProgramToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProgramToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_WorkoutExercises" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WorkoutExercises_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProgramToWorkout_B_index" ON "_ProgramToWorkout"("B");

-- CreateIndex
CREATE INDEX "_WorkoutExercises_B_index" ON "_WorkoutExercises"("B");

-- AddForeignKey
ALTER TABLE "AllocatedExercise" ADD CONSTRAINT "AllocatedExercise_allocatedWorkoutId_fkey" FOREIGN KEY ("allocatedWorkoutId") REFERENCES "AllocatedWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllocatedExercise" ADD CONSTRAINT "AllocatedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllocatedWorkout" ADD CONSTRAINT "AllocatedWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToWorkout" ADD CONSTRAINT "_ProgramToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToWorkout" ADD CONSTRAINT "_ProgramToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutExercises" ADD CONSTRAINT "_WorkoutExercises_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutExercises" ADD CONSTRAINT "_WorkoutExercises_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

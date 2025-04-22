/*
  Warnings:

  - You are about to drop the `ExerciseTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseInstance" DROP CONSTRAINT "ExerciseInstance_exerciseTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTemplate" DROP CONSTRAINT "ExerciseTemplate_primaryMuscleId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseEquipment" DROP CONSTRAINT "_ExerciseEquipment_B_fkey";

-- DropForeignKey
ALTER TABLE "_SecondaryMuscles" DROP CONSTRAINT "_SecondaryMuscles_A_fkey";

-- DropTable
DROP TABLE "ExerciseTemplate";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "primaryMuscleId" TEXT,
    "videoUrl" TEXT,
    "type" TEXT,
    "defaultSets" INTEGER NOT NULL DEFAULT 3,
    "defaultReps" INTEGER,
    "defaultWeight" DOUBLE PRECISION,
    "defaultDuration" INTEGER,
    "defaultBreakTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_primaryMuscleId_fkey" FOREIGN KEY ("primaryMuscleId") REFERENCES "MuscleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInstance" ADD CONSTRAINT "ExerciseInstance_exerciseTemplateId_fkey" FOREIGN KEY ("exerciseTemplateId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseTemplateId_fkey" FOREIGN KEY ("exerciseTemplateId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SecondaryMuscles" ADD CONSTRAINT "_SecondaryMuscles_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseEquipment" ADD CONSTRAINT "_ExerciseEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "AllocatedExercise" DROP CONSTRAINT "AllocatedExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- AlterTable
ALTER TABLE "AllocatedExercise" ALTER COLUMN "exerciseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ALTER COLUMN "exerciseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllocatedExercise" ADD CONSTRAINT "AllocatedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

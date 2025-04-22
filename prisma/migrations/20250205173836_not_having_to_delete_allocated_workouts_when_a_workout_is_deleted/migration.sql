-- DropForeignKey
ALTER TABLE "AllocatedWorkout" DROP CONSTRAINT "AllocatedWorkout_workoutId_fkey";

-- AlterTable
ALTER TABLE "AllocatedWorkout" ALTER COLUMN "workoutId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AllocatedWorkout" ADD CONSTRAINT "AllocatedWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

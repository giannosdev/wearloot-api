-- CreateTable
CREATE TABLE "_AllocatedExerciseToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AllocatedExerciseToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AllocatedExerciseToWorkout_B_index" ON "_AllocatedExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_AllocatedExerciseToWorkout" ADD CONSTRAINT "_AllocatedExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "AllocatedExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllocatedExerciseToWorkout" ADD CONSTRAINT "_AllocatedExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

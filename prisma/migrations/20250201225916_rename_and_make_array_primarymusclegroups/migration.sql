-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_primaryMuscleId_fkey";

-- CreateTable
CREATE TABLE "_PrimaryMuscles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PrimaryMuscles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PrimaryMuscles_B_index" ON "_PrimaryMuscles"("B");

-- AddForeignKey
ALTER TABLE "_PrimaryMuscles" ADD CONSTRAINT "_PrimaryMuscles_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrimaryMuscles" ADD CONSTRAINT "_PrimaryMuscles_B_fkey" FOREIGN KEY ("B") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

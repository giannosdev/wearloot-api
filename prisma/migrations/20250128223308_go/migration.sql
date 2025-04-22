-- CreateTable
CREATE TABLE "_ProgramWorkouts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProgramWorkouts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProgramWorkouts_B_index" ON "_ProgramWorkouts"("B");

-- AddForeignKey
ALTER TABLE "_ProgramWorkouts" ADD CONSTRAINT "_ProgramWorkouts_A_fkey" FOREIGN KEY ("A") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramWorkouts" ADD CONSTRAINT "_ProgramWorkouts_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

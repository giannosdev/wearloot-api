-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseType_name_key" ON "ExerciseType"("name");

-- CreateIndex
CREATE INDEX "_ExerciseType_B_index" ON "_ExerciseType"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseType" ADD CONSTRAINT "_ExerciseType_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseType" ADD CONSTRAINT "_ExerciseType_B_fkey" FOREIGN KEY ("B") REFERENCES "ExerciseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

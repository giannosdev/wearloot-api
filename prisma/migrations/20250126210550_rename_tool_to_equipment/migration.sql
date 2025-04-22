/*
  Warnings:

  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseTemplateToTool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseTemplateToTool" DROP CONSTRAINT "_ExerciseTemplateToTool_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseTemplateToTool" DROP CONSTRAINT "_ExerciseTemplateToTool_B_fkey";

-- DropTable
DROP TABLE "Tool";

-- DropTable
DROP TABLE "_ExerciseTemplateToTool";

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseEquipment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseEquipment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- CreateIndex
CREATE INDEX "_ExerciseEquipment_B_index" ON "_ExerciseEquipment"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseEquipment" ADD CONSTRAINT "_ExerciseEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseEquipment" ADD CONSTRAINT "_ExerciseEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "ExerciseTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

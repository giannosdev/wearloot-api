/*
  Warnings:

  - You are about to drop the column `gymId` on the `Program` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_gymId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "gymId";

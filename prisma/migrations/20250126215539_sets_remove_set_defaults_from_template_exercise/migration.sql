/*
  Warnings:

  - You are about to drop the column `defaultBreakTime` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `defaultDuration` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `defaultReps` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `defaultSets` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `defaultWeight` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "defaultBreakTime",
DROP COLUMN "defaultDuration",
DROP COLUMN "defaultReps",
DROP COLUMN "defaultSets",
DROP COLUMN "defaultWeight";

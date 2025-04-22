/*
  Warnings:

  - You are about to drop the column `duration` on the `SetDetails` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `SetDetails` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "setTypes" AS ENUM ('REPS', 'DURATION');

-- AlterTable
ALTER TABLE "SetDetails" DROP COLUMN "duration",
DROP COLUMN "reps",
ADD COLUMN     "type" "setTypes",
ADD COLUMN     "value" INTEGER;

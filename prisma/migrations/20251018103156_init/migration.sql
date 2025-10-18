/*
  Warnings:

  - The primary key for the `challenges` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "challenges_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "challenges_id_seq";

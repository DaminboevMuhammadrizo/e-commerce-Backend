/*
  Warnings:

  - You are about to drop the column `introeVideo` on the `Accomodation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Accomodation" DROP COLUMN "introeVideo",
ADD COLUMN     "introVideo" TEXT;
